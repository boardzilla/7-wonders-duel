/**
 * decide who starts next age
 */
import {
  createGame,
  Board,
  createBoardClasses,
  Player,
  playerActions,
  eachPlayer,
  forEach,
  Do,
  forLoop,
} from '@boardzilla/core';

export class SevenWondersDuelPlayer extends Player<SevenWondersDuelPlayer, SevenWondersDuelBoard> {
  coins: number = 7;
  science: number = 0;
  vpPer: Partial<Record<Card['type'] | 'wonder' | 'progress', number>> = {};

  score() {
    let score = this.all(Card, {built: true}).sum('vp') +
      this.all(Wonder, {built: true}).sum('vp') +
      this.all(ProgressToken).sum('vp') +
      (this.position === (this.board.militaryVp() < 0 ? 1 : 2) ? this.board.militaryVp() : 0) +
      Math.floor(this.coins / 3);

    if (this.has(Card, {special: 'vp-per-coins'})) {
      score += Math.floor(Math.max(this.coins, this.other().coins) / 3);
    }

    for (const [type, vp] of Object.entries(this.vpPer) as [Card['type'] | 'wonder' | 'progress', number][]) {
      if (type === 'wonder') {
        score += Math.max(this.all(Wonder, {built: true}).length, this.other().all(Wonder, {built: true}).length) * vp;
      } else if (type === 'progress') {
        score += this.all(ProgressToken).length * vp;
      } else {
        if (type === 'raw') {
          score += Math.max(
            this.all(Card, c => ['raw', 'manufactured'].includes(c.type) && c.built).length,
            this.other().all(Card, c => ['raw', 'manufactured'].includes(c.type) && c.built).length
          ) * vp;
        } else {
          score += Math.max(this.all(Card, {type, built: true}).length, this.other().all(Card, {type, built: true}).length) * vp;
        }
      }
    }

    return score;
  }

  costPer(resource: ResourceType) {
    // count all resources produced by other player
    if (this.has(Card, c => c.trades?.includes(resource))) return 1;
    return 2 + this.other().all(Card, c => c.built && (c.type === 'raw' || c.type === 'manufactured'))
      .sum(c => c.produces[resource] || 0)
  }

  discardValue() {
    return 2 + this.all(Card, {type: 'commercial', built: true}).length
  }

  awardShields(shields: number) {
    if (this.has(ProgressToken, {special: 'shield-bonus'})) shields += 1;
    this.game.message('{{player}} advances military by {{shields}}', {player: this, shields});
    const rewards = this.board.adjustMilitary(shields * (this.position === 1 ? -1 : 1));
    for (const reward of rewards) {
      this.game.message(`{{player}} forces {{other}} to lose {{reward}} coins`, {player: this, other: this.other(), reward});
      this.other().coins = Math.max(0, this.other().coins - reward);
    }
    if (this.board.militaryTrack >= 9 || this.board.militaryTrack <= -9) {
      this.game.message(`{{player}} wins by military supremacy!`, {player: this});
      this.game.finish(this);
    }
  }

  checkScience() {
    const numberOfScience = new Set(this.all(Piece).filter(p => 'science' in p).map(p => 'science' in p ? p.science : undefined)).size;
    this.science = numberOfScience;
    if (numberOfScience >= 6) {
      this.game.message(`{{player}} wins by scientific supremacy!`, {player: this});
      this.game.finish(this);
    }
  }

  addVpBonus(vpPer: Partial<Record<Card['type'] | 'wonder' | 'progress', number>>) {
    Object.assign(this.vpPer, vpPer);
  }
};

//const Board = createBoardClass(SevenWondersDuelPlayer);

class SevenWondersDuelBoard extends Board<SevenWondersDuelPlayer, SevenWondersDuelBoard> {
  militaryTrack: number = 0; // negative numbers good for player 1, positive for player 2
  militaryRewards = [
    {track: -6, coins: 5},
    {track: -3, coins: 2},
    {track: 3, coins: 2},
    {track: 6, coins: 5},
  ];
  firstMoveOfAge = false;

  adjustMilitary(amount: number) {
    this.militaryTrack += amount;
    const rewards: number[] = [];
    for (const {track, coins} of this.militaryRewards) {
      if (Math.sign(track) * this.militaryTrack >= Math.abs(track)) {
        this.militaryRewards = this.militaryRewards.filter(r => r.track !== track);
        rewards.push(coins);
      }
    }
    return rewards;
  }

  militaryVp() {
    if (this.militaryTrack <= -6 || this.militaryTrack >= 6) return 10;
    if (this.militaryTrack <= -3 || this.militaryTrack >= 3) return 5;
    return this.militaryTrack === 0 ? 0 : 2;
  }

  revealUncovered() {
    for (const card of this.first('field')!.all(Card, c => !c.isVisible() && c.isUncovered())) {
      this.game.message('{{card}} was revealed', {card});
      card.showToAll();
    }
  }
}

const { Space, Piece } = createBoardClasses<SevenWondersDuelPlayer, SevenWondersDuelBoard>();

export { Space };

type ResourceType = 'clay' | 'wood' | 'stone' | 'glass' | 'papyrus';

export class CardSlot extends Space {
  row: number;
  column: number;
}

export class Building extends Piece {
  type: 'raw' | 'manufactured' | 'civilian' | 'scientific' | 'commercial' | 'military' | 'guild' | 'wonder'
  produces: Partial<Record<ResourceType, number>> = {};
  producesOneOf: ResourceType[] = [];
  built: boolean;
  cost: Partial<Record<ResourceType, number>> = {};
  coinCost?: number = 0;
  coinsPer: Partial<Record<Building['type'], number>> = {};
  link?: string;
  freeLink?: string;
  shields?: number = 0;
  coins?: number;
  vp?: number = 0;

  giveRewardsTo(player: SevenWondersDuelPlayer) {
    player.coins -= this.costFor(player);

    // trade costs to holder of progress token
    if (player.other().has(ProgressToken, {special: 'gain-trade-costs'})) {
      player.other().coins += this.tradeCostsFor(player);
    }

    if (this.shields) {
      player.awardShields(this.shields);
    }

    if (this.coins) {
      player.coins += this.coins;
      this.game.message('{{player}} gains {{coins}} coins', {player, coins: this.coins});
    }

    for (const [type, amount] of Object.entries(this['coinsPer']) as [Building['type'], number][]) {
      let most: number;
      if (type === 'raw') {
        most = Math.max(
          player.all(Card, c => ['raw', 'manufactured'].includes(c.type) && c.built).length,
          this.type === 'guild' ? player.other().all(Card, c => ['raw', 'manufactured'].includes(c.type) && c.built).length : 0,
        );
      } else {
        most = Math.max(
          player.all(Building, {type, built: true}).length,
          this.type === 'guild' ? player.other().all(Building, {type, built: true}).length : 0
        );
      }
      if (most) {
        this.game.message('{{player}} gains {{amount}} coins per {{most}} {{type}} buildings', {player, most, amount, type});
        player.coins += amount * most;
      }
    }

    if (this.freeLink && player.has(Card, {link: this.freeLink}) && player.has(ProgressToken, {special: 'free-link-bonus'})) {
      this.game.message('{{player}} gains 4 coins from linking', {player});
      player.coins += 4;
    }
  }

  costFor(player: SevenWondersDuelPlayer) {
    if (this.freeLink && player.has(Card, {link: this.freeLink, built: true})) return 0;
    return (this.coinCost ?? 0) + this.tradeCostsFor(player);
  }

  tradeCostsFor(player: SevenWondersDuelPlayer) {
    const resourcesNeeded = { ...this.cost };
    const costs: Partial<Record<ResourceType, number>> = {};
    let neededTypes = Object.keys(resourcesNeeded) as ResourceType[];

    // reduce base costs by all resources produced by this player
    for (const producer of player.all(Building, {built: true})) {
      for (const resource of neededTypes) {
        resourcesNeeded[resource]! -= producer.produces[resource] || 0;
      }
    }

    // find all costs for needed resources to help decide which optional resources will be better
    for (const resource of neededTypes) {
      costs[resource] = player.costPer(resource);
    }

    // filter out any that have been reduced to zero
    neededTypes = neededTypes.filter(r => resourcesNeeded[r]! > 0);
    // and sort by expense
    neededTypes.sort((a, b) => costs[a]! < costs[b]! ? 1 : -1)

    // then reduce base costs by any optional resources produced by this player, whichever is more expensive
    for (const producer of player.all(Building, c => c.built && c.producesOneOf.length > 1)) {
      for (const resource of neededTypes) {
        if (resourcesNeeded[resource]! > 0 && producer.producesOneOf.includes(resource)) {
          resourcesNeeded[resource]! -= 1;
          break;
        }
      }
    }

    // finally reduce for any progress tokens
    if (player.has(ProgressToken, {discount: this.type})) {
      let discount = 2;
      for (const resource of neededTypes) {
        if (resourcesNeeded[resource]! > 0) {
          resourcesNeeded[resource]! -= 1;
          discount -= 1;
          if (discount === 0) break;
        }
      }
    }

    // now count all remaining resources needed and multiply by costs
    let remainingCosts = 0;
    for (const resource of neededTypes) {
      if (resourcesNeeded[resource]! > 0) remainingCosts += costs[resource]! * resourcesNeeded[resource]!;
    }
    return remainingCosts;
  }
}

export class Card extends Building {
  type: 'raw' | 'manufactured' | 'civilian' | 'scientific' | 'commercial' | 'military' | 'guild'
  built: boolean = true;
  age: number;
  guild: boolean = false;
  trades: ResourceType[];
  science: 'astronomy' | 'wheel' | 'sundial' | 'chemistry' | 'math' | 'writing';
  vpPer: Partial<Record<Card['type'] | 'wonder' | 'progress', number>> = {};
  special?: 'vp-per-coins';

  isUncovered() {
    const slot = this.container(CardSlot);
    if (!slot) return false;
    // if both slots below are empty, this is now uncovered
    const left = this.board.first(CardSlot, { row: slot.row + 1, column: slot.column + 1 });
    const right = this.board.first(CardSlot, { row: slot.row + 1, column: slot.column - 1 });
    return (!left || left.isEmpty()) && (!right || right.isEmpty());
  }
}

Card.hideAllExcept('age', 'guild');

export class Wonder extends Building {
  type: 'wonder' = 'wonder';
  description: string;
  built: boolean = false;
  special?: 'extra-turn' | 'take-discards' | 'take-progress-discard';
  destroy?: Card['type'];
  destroyCoins?: number;
}

export class ProgressToken extends Piece {
  description: string;
  vp?: number = 0;
  coins?: number;
  science?: 'law';
  discount?: Building['type']
  vpPer: Partial<Record<Card['type'] | 'wonder' | 'progress', number>> = {};
  special?: 'gain-trade-costs' | 'extra-turn' | 'shield-bonus' | 'free-link-bonus';
}

const cardPosition = [
  [
    { row: 2, column: 5 },
    { row: 2, column: 7 },
    { row: 3, column: 4 },
    { row: 3, column: 6 },
    { row: 3, column: 8 },
    { row: 4, column: 3 },
    { row: 4, column: 5 },
    { row: 4, column: 7 },
    { row: 4, column: 9 },
    { row: 5, column: 2 },
    { row: 5, column: 4 },
    { row: 5, column: 6 },
    { row: 5, column: 8 },
    { row: 5, column: 10 },
    { row: 6, column: 1 },
    { row: 6, column: 3 },
    { row: 6, column: 5 },
    { row: 6, column: 7 },
    { row: 6, column: 9 },
    { row: 6, column: 11 },
  ],

  [
    { row: 2, column: 1 },
    { row: 2, column: 3 },
    { row: 2, column: 5 },
    { row: 2, column: 7 },
    { row: 2, column: 9 },
    { row: 2, column: 11 },
    { row: 3, column: 2 },
    { row: 3, column: 4 },
    { row: 3, column: 6 },
    { row: 3, column: 8 },
    { row: 3, column: 10 },
    { row: 4, column: 3 },
    { row: 4, column: 5 },
    { row: 4, column: 7 },
    { row: 4, column: 9 },
    { row: 5, column: 4 },
    { row: 5, column: 6 },
    { row: 5, column: 8 },
    { row: 6, column: 5 },
    { row: 6, column: 7 },
  ],

  [
    { row: 1, column: 5 },
    { row: 1, column: 7 },
    { row: 2, column: 4 },
    { row: 2, column: 6 },
    { row: 2, column: 8 },
    { row: 3, column: 3 },
    { row: 3, column: 5 },
    { row: 3, column: 7 },
    { row: 3, column: 9 },
    { row: 4, column: 4 },
    { row: 4, column: 8 },
    { row: 5, column: 3 },
    { row: 5, column: 5 },
    { row: 5, column: 7 },
    { row: 5, column: 9 },
    { row: 6, column: 4 },
    { row: 6, column: 6 },
    { row: 6, column: 8 },
    { row: 7, column: 5 },
    { row: 7, column: 7 },
  ],
];

const visibleRows = [
  [2, 4, 6],
  [2, 4, 6],
  [1, 3, 5, 7]
];


import { cards, progressTokens, wonders } from './cards.js';

export default createGame(SevenWondersDuelPlayer, SevenWondersDuelBoard, game => {

  const { board, action } = game;

  board.registerClasses(Building, Card, Wonder, CardSlot, ProgressToken);

  for (const player of board.players) {
    board.create(Space, 'mat', { player });
  }

  const deck = board.create(Space, 'deck');
  const discard = board.create(Space, 'discard');
  const field = board.create(Space, 'field');
  field.createGrid({ rows: 7, columns: 11}, CardSlot, 'card-slot', (row, column) => ({ row, column }));
  for (const card of cards) deck.create(Card, card.name!, card);
  for (const wonder of wonders) board.pile.create(Wonder, wonder.name!, wonder);
  for (const progress of progressTokens) board.pile.create(ProgressToken, progress.name!, progress);
  deck.all(Card).hideFromAll();

  game.defineActions({
    pickWonder: () => action({
      prompt: 'Choose a Wonder',
    }).move(
      'wonder', field.all(Wonder),
      'mat', board.first('mat', {mine: true})
    ).message(
      '{{player}} chose {{wonder}}'
    ),

    buy: player => action({
      prompt: 'Buy',
    }).move(
      'card', field.all(Card, c => c.isUncovered() && c.costFor(player) <= player.coins),
      'mat', board.first('mat', {mine: true}),
      {
        confirm: [
          'Buy {{card}} for {{cost}}',
          ({ card }) => ({cost: card.costFor(player) })
        ]
      }
    ).do(({ card }) => {
      card.giveRewardsTo(player);
      player.addVpBonus(card.vpPer);
      if (card.science) {
        player.checkScience();
        if (player.all(Card, {science: card.science, built: true}).length === 2) {
          return {name: 'takeProgress'};
        }
      }
    }).message(
      '{{player}} bought {{card}} and paid {{cost}}', ({ card }) => ({ cost: card.costFor(player) })
    ),

    discard: player => action({
      prompt: 'Discard for coins'
    }).chooseOnBoard(
      'card', field.all(Card, c => c.isUncovered()),
      {
        confirm: [
          'Discard {{card}} for {{value}}',
          { value: player.discardValue() }
        ]
      }
    ).do(({ card }) => {
      player.coins += player.discardValue();
      card.putInto(discard);
    }).message(
      '{{player}} discarded {{card}} for {{value}} coins',
      { value: player.discardValue() }
    ),

    buildWonder: player => action({
      prompt: 'Build Wonder',
      condition: board.all(Wonder, {built: true}).length < 7
    }).move(
      'card', field.all(Card, c => c.isUncovered()),
      'wonder', board.first('mat', {mine: true})!.all(Wonder, {built: false}, wonder => wonder.costFor(player) <= player.coins),
      {
        confirm: [
          'Build {{wonder}} for {{cost}}',
          ({ wonder }) => ({cost: wonder.costFor(player) })
        ]
      }
    ).do(({ wonder, card }) => {
      wonder.built = true;
      card.built = false;
      wonder.giveRewardsTo(player);
      if (wonder.destroyCoins) {
        player.other().coins = Math.max(0, player.other().coins - wonder.destroyCoins);
        game.message(`{{player}} destroys {{amount}} coins`, {player, amount: wonder.destroyCoins});
      }
      if (wonder.destroy) return { name: 'destroyBuildings', args: { type: wonder.destroy } };
      if (wonder.special === 'take-progress-discard') {
        field.all(ProgressToken).putInto(deck);
        board.pile.firstN(3, ProgressToken).putInto(field);
        return { name: 'takeProgressDiscard' };
      }
      if (wonder.special === 'take-discards') return { name: 'takeDiscards' };
    }).message(
      '{{player}} used {{card}} to build {{wonder}}!'
    ),

    takeProgress: player => action({
      prompt: 'Select a progress token',
    }).move(
      'token', field.all(ProgressToken),
      'mat', board.first('mat', {player})
    ).do(({ token }) => {
      player.checkScience();
      player.addVpBonus(token.vpPer);
    }).message(
      `{{player}} gains the {{token}} Progress Token`
    ),

    takeProgressDiscard: player => action({
      prompt: 'Select a progress token',
    }).move(
      'token', field.all(ProgressToken),
      'mat', board.first('mat', {player})
    ).do(({ token }) => {
      player.checkScience();
      player.addVpBonus(token.vpPer);
      field.all(ProgressToken).putInto(board.pile);
      deck.all(ProgressToken).putInto(field);
    }).message(
      `{{player}} gains the {{token}} Progress Token`
    ),

    takeDiscards: player => action({
      prompt: 'Select a discarded building',
    }).move(
      'card', discard.all(Card),
      'mat', board.first('mat', {player})
    ).do(({ card }) => {
      card.giveRewardsTo(player);
      player.addVpBonus(card.vpPer);
      if (card.science && player.all(Card, {science: card.science, built: true}).length === 2) {
        player.checkScience();
        return {name: 'takeProgress'}
      }
    }).message(
      `{{player}} takes {{card}} from discard`
    ),

    destroyBuildings: player => action<{ type: Card['type'] }>({
      prompt: 'Choose buildings to destroy',
    }).chooseOnBoard(
      'card',
      ({ type }) => player.other().all(Card, {type, built: true}),
    ).do(
      ({ card }) => card.remove()
    ).message(
      `{{player}} destroys {{card}}`
    ),

    pass: () => action({
      prompt: 'Give opponent first move',
      condition: board.firstMoveOfAge
    })
  });

  game.defineFlow([
    () => {
      // set up deck, removing appropriate number of cards
      deck.shuffle();
      deck.firstN(3, Card, {age:1}).remove()
      deck.firstN(3, Card, {age:2}).remove()
      deck.firstN(3, Card, {age:3}, c => c.type !== 'guild').remove()
      deck.firstN(4, Card, {age:3}, c => c.type === 'guild').remove()
      board.pile.shuffle();
      board.pile.firstN(5, ProgressToken).putInto(field);
    },
    eachPlayer({
      name: 'turn',
      do: [
        () => board.pile.firstN(4, Wonder).putInto(field),
        // alternate players 1-2-2-1 for wonder picking
        forEach({
          name: 'player',
          collection: ({ turn }) => [turn, turn.other(), turn.other(), turn],
          do: playerActions({
            player: ({ player }) => player,
            actions: ['pickWonder']
          })
        }),
      ]
    }),

    forLoop({ name: 'age', initial: 1, next: age => age + 1, while: age => age <= 3, do: [
      // set up board
      ({ age }) => {
        const cards = deck.firstN(20, Card, {age});
        for (let i = 0; i !== 20; i++) {
          cards[i].putInto(board.first(CardSlot, cardPosition[age - 1][i])!);
        }
        field.all(CardSlot, slot => visibleRows[age - 1].includes(slot.row)).all(Card).showToAll();
        game.message('Age {{age}} has begun!', {age});
        if (age > 1) board.firstMoveOfAge = true;
      },

      eachPlayer({
        name: 'player',
        continueUntil: () => !field.has(Card),
        startingPlayer: () => board.militaryTrack === 0 ? game.players.current()[0] : game.players[board.militaryTrack > 0 ? 0 : 1],
        do: [
          () => board.revealUncovered(),
          playerActions({
            player: ({ player }) => player,
            name: 'play',
            prompt: 'Choose Card',
            actions: [
              'buy',
              'discard',
              'pass',
              {
                name: 'buildWonder',
                do: ({ player, buildWonder }) => {
                  if (buildWonder.wonder?.special?.includes('extra-turn') || player.has(ProgressToken, {special: 'extra-turn'})) {
                    game.message('{{player}} takes an extra turn', {player});
                    board.firstMoveOfAge = false
                    return Do.repeat
                  }
                }
              }
            ]
          }),
          () => { board.firstMoveOfAge = false }
        ]
      })
    ]}),
    () => {
      game.finish(game.players[0].score() > game.players[1].score() ? game.players[0] : game.players[1]);
      game.message(`{{winner}} wins a civilian victory!`, {winner: game.winner[0]});
    }
  ]);
});
