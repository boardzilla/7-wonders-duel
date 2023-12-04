import { Card, ProgressToken, Wonder } from  './index.js';

export const cards: Partial<Card>[] = [
  {
    name: 'Lumber Yard',
    type: 'raw',
    age: 1,
    produces: {wood: 1},
  }, {
    name: 'Sawmill',
    type: 'raw',
    age: 2,
    coinCost: 2,
    produces: {wood: 2},
  }, {
    name: 'Stone Pit',
    type: 'raw',
    age: 1,
    coinCost: 1,
    produces: {stone: 1},
  }, {
    name: 'Clay Pool',
    type: 'raw',
    age: 1,
    produces: {clay: 1},
  }, {
    name: 'Shelf Quarry',
    type: 'raw',
    age: 2,
    coinCost: 2,
    produces: {stone: 2},
  }, {
    name: 'Logging Camp',
    type: 'raw',
    age: 1,
    coinCost: 1,
    produces: {wood: 1},
  }, {
    name: 'Brickyard',
    type: 'raw',
    age: 2,
    coinCost: 2,
    produces: {clay: 2},
  }, {
    name: 'Quarry',
    type: 'raw',
    age: 1,
    produces: {stone: 1},
  }, {
    name: 'Clay Pit',
    type: 'raw',
    age: 1,
    coinCost: 1,
    produces: {clay: 1},
  }, {
    name: 'Glassworks',
    type: 'manufactured',
    age: 1,
    coinCost: 1,
    produces: {glass: 1},
  }, {
    name: 'Press',
    type: 'manufactured',
    age: 1,
    coinCost: 1,
    produces: {papyrus: 1},
  }, {
    name: 'Guard Tower',
    type: 'military',
    age: 1,
    shields: 1,
  }, {
    name: 'Workshop',
    type: 'scientific',
    age: 1,
    science: 'math',
    cost: {papyrus: 1},
    vp: 1
  }, {
    name: 'Apothecary',
    type: 'scientific',
    age: 1,
    science: 'wheel',
    cost: {glass: 1},
    vp: 1,
  }, {
    name: 'Stone Reserve',
    type: 'commercial',
    age: 1,
    coinCost: 3,
    trades: ['stone'],
  }, {
    name: 'Chamber Of Commerce',
    type: 'commercial',
    age: 3,
    cost: {papyrus: 2},
    vp: 3,
    coinsPer: {'manufactured': 3},
  }, {
    name: 'Forum',
    type: 'commercial',
    age: 2,
    producesOneOf: ['glass', 'papyrus'],
    coinCost: 1,
    cost: {clay: 1},
  }, {
    name: 'Clay Reserve',
    type: 'commercial',
    age: 1,
    coinCost: 3,
    trades: ['clay'],
  }, {
    name: 'Port',
    type: 'commercial',
    age: 3,
    cost: {wood: 1, glass: 1, papyrus: 1},
    vp: 3,
    coinsPer: {raw: 2},
  }, {
    name: 'Caravansery',
    type: 'commercial',
    age: 2,
    coinCost: 2,
    cost: {glass: 1, papyrus: 1},
    producesOneOf: ['wood', 'clay', 'stone'],
  }, {
    name: 'Customs House',
    type: 'commercial',
    age: 2,
    coinCost: 4,
    trades: ['papyrus', 'glass'],
  }, {
    name: 'Tribunal',
    type: 'civilian',
    age: 2,
    cost: {wood: 2, glass: 1},
    vp: 5,
  }, {
    name: 'Wood Reserve',
    type: 'commercial',
    age: 1,
    coinCost: 3,
    trades: ['wood'],
  }, {
    name: 'Armory',
    type: 'commercial',
    age: 3,
    cost: {stone: 2, glass: 1},
    vp: 3,
    coinsPer: {military: 1},
  }, {
    name: 'Glass-Blower',
    type: 'manufactured',
    age: 2,
    produces: {glass: 1},
  }, {
    name: 'Drying Room',
    type: 'manufactured',
    age: 2,
    produces: {papyrus: 1},
  }, {
    name: 'Arsenal',
    type: 'military',
    age: 3,
    cost: {clay: 3, wood: 2},
    shields: 3,
  }, {
    name: 'Merchants Guild',
    type: 'guild',
    age: 3,
    cost: {wood: 1, clay: 1, glass: 1, papyrus: 1},
    coinsPer: {commercial: 1},
    vpPer: {commercial: 1},
  }, {
    name: 'Shipowners Guild',
    type: 'guild',
    guild: true,
    age: 3,
    cost: {stone: 1, clay: 1, glass: 1, papyrus: 1},
    coinsPer: {raw: 1},
    vpPer: {raw: 1},
  }, {
    name: 'Builders Guild',
    type: 'guild',
    guild: true,
    age: 3,
    cost: {stone: 2, wood: 1, clay: 1, glass: 1},
    vpPer: {wonder: 2},
  }, {
    name: 'Magistrates Guild',
    type: 'guild',
    guild: true,
    age: 3,
    cost: {wood: 2, clay: 1, papyrus: 1},
    coinsPer: {civilian: 1},
    vpPer: {civilian: 1},
  }, {
    name: 'Scientists Guild',
    type: 'guild',
    guild: true,
    age: 3,
    cost: {clay: 2, wood: 2},
    coinsPer: {scientific: 1},
    vpPer: {scientific: 1},
  }, {
    name: 'Moneylenders Guild',
    type: 'guild',
    guild: true,
    age: 3,
    cost: {stone: 2, wood: 2},
    special: 'vp-per-coins',
  }, {
    name: 'Tacticians Guild',
    type: 'guild',
    guild: true,
    age: 3,
    cost: {stone: 2, clay: 1, papyrus: 1},
    coinsPer: {military: 1},
    vpPer: {military: 1},
  }, {
    name: 'Courthouse',
    type: 'military',
    age: 3,
    coinCost: 8,
    shields: 3,
  }, {
    name: 'Academy',
    type: 'scientific',
    age: 3,
    cost: {stone: 1, wood: 1, glass: 2},
    science: 'sundial',
    vp: 3,
  }, {
    name: 'Study',
    type: 'scientific',
    age: 3,
    cost: {wood: 2, glass: 1, papyrus: 1},
    science: 'sundial',
    vp: 3,
  }, {
    name: 'Palace',
    type: 'civilian',
    age: 3,
    cost: {stone: 1, wood: 1, clay: 1, glass: 2},
    vp: 7,
  }, {
    name: 'Town Hall',
    type: 'civilian',
    age: 3,
    cost: {stone: 3, wood: 2},
    vp: 7,
  }, {
    name: 'Obelisk',
    type: 'civilian',
    age: 3,
    cost: {stone: 2, glass: 1},
    vp: 5,
  }, {
    name: 'Walls',
    type: 'military',
    age: 2,
    cost: {wood: 2},
    shields: 2,
  }, {
    name: 'Stable',
    link: 'stable',
    type: 'military',
    age: 1,
    shields: 1,
    cost: {wood: 1},
  }, {
    name: 'Lighthouse',
    freeLink: 'tavern',
    type: 'commercial',
    age: 3,
    cost: {clay: 2, glass: 1},
    coinsPer: {commercial: 1},
  }, {
    name: 'Scriptorium',
    link: 'scriptorium',
    type: 'scientific',
    age: 1,
    coinCost: 2,
    science: 'writing',
  }, {
    name: 'Theater',
    link: 'theater',
    type: 'civilian',
    age: 1,
    vp: 3,
  }, {
    name: 'Tavern',
    link: 'tavern',
    type: 'commercial',
    age: 1,
    coins: 4,
  }, {
    name: 'Brewery',
    link: 'brewery',
    type: 'commercial',
    age: 2,
    coins: 6,
  }, {
    name: 'Altar',
    link: 'altar',
    type: 'civilian',
    age: 1,
    vp: 3,
  }, {
    name: 'Baths',
    link: 'baths',
    type: 'civilian',
    age: 1,
    cost: {stone: 1},
    vp: 3,
  }, {
    name: 'Archery Range',
    link: 'archery-range',
    type: 'military',
    age: 2,
    cost: {stone: 1, wood: 1, papyrus: 1},
    shields: 2,
  }, {
    name: 'Garrison',
    link: 'garrison',
    type: 'military',
    age: 1,
    cost: {clay: 1},
    shields: 1,
  }, {
    name: 'Pharmacist',
    link: 'pharmacist',
    type: 'scientific',
    age: 1,
    coinCost: 2,
    science: 'chemistry',
  }, {
    name: 'Parade Ground',
    link: 'parade-ground',
    type: 'military',
    age: 2,
    cost: {clay: 2, papyrus: 1},
    shields: 2,
  }, {
    name: 'Palisade',
    link: 'palisade',
    type: 'military',
    age: 1,
    coinCost: 1,
    shields: 1,
  }, {
    name: 'Horse Breeders',
    freeLink: 'stable',
    type: 'military',
    age: 2,
    cost: {clay: 1, wood: 1},
    shields: 1
  }, {
    name: 'Library',
    freeLink: 'scriptorium',
    type: 'scientific',
    age: 2,
    cost: {stone: 1, wood: 1, glass: 1},
    science: 'writing',
    vp: 2,
  }, {
    name: 'Statue',
    link: 'statue',
    freeLink: 'theater',
    type: 'commercial',
    age: 2,
    cost: {clay: 2},
    vp: 4,
  }, {
    name: 'Gardens',
    freeLink: 'statue',
    type: 'commercial',
    age: 3,
    cost: {wood: 2, clay: 2},
    vp: 6
  }, {
    name: 'Arena',
    freeLink: 'brewery',
    type: 'commercial',
    age: 3,
    cost: {clay: 1, stone: 1, wood: 1},
    vp: 3,
    coinsPer: {wonder: 2},
  }, {
    name: 'Temple',
    link: 'temple',
    freeLink: 'altar',
    type: 'civilian',
    age: 2,
    cost: {wood: 1, papyrus: 1},
    vp: 4
  }, {
    name: 'Rostrum',
    link: 'rostrum',
    type: 'civilian',
    age: 2,
    cost: {stone: 1, wood: 1},
    vp: 4,
  }, {
    name: 'Pantheon',
    freeLink: 'temple',
    type: 'civilian',
    age: 3,
    cost: {clay: 1, wood: 1, papyrus: 2},
    vp: 6,
  }, {
    name: 'Senate',
    freeLink: 'rostrum',
    type: 'civilian',
    age: 3,
    cost: {clay: 1, stone: 1, papyrus: 2},
    vp: 6,
  }, {
    name: 'Aqueduct',
    freeLink: 'baths',
    type: 'civilian',
    age: 2,
    cost: {stone: 3},
    vp: 5,
  }, {
    name: 'School',
    link: 'school',
    type: 'scientific',
    age: 2,
    science: 'wheel',
    cost: {wood: 1, papyrus: 2},
    vp: 1,
  }, {
    name: 'University',
    freeLink: 'school',
    type: 'scientific',
    age: 3,
    cost: {clay: 1, glass: 1, papyrus: 1},
    science: 'astronomy',
    vp: 2,
  }, {
    name: 'Siege Workshop',
    freeLink: 'archery-range',
    type: 'military',
    age: 3,
    cost: { wood: 3, glass: 1},
    shields: 2,
  }, {
    name: 'Barracks',
    freeLink: 'garrison',
    type: 'military',
    age: 2,
    coinCost: 3,
    shields: 1,
  }, {
    name: 'Dispensary',
    freeLink: 'pharmacist',
    type: 'scientific',
    age: 2,
    cost: {clay: 2, stone: 1},
    science: 'chemistry',
    vp: 2,
  }, {
    name: 'Laboratory',
    link: 'laboratory',
    type: 'scientific',
    age: 2,
    cost: {wood: 1, glass: 2},
    science: 'math',
    vp: 1,
  }, {
    name: 'Observatory',
    freeLink: 'laboratory',
    type: 'scientific',
    age: 3,
    cost: {stone: 1, papyrus: 2},
    science: 'astronomy',
    vp: 2,
  }, {
    name: 'Circus',
    freeLink: 'parade-ground',
    type: 'military',
    age: 3,
    cost: {clay: 2, stone: 2},
    shields: 2
  }, {
    name: 'Fortifications',
    freeLink: 'palisade',
    type: 'military',
    age: 3,
    cost: {stone: 2, clay: 1, papyrus: 1},
    shields: 2
  }
];

export const wonders: Partial<Wonder>[] = [
  {
    name: 'The Appian Way',
    description: 'You take 3 coins from the bank.\n\n' +
      'Your opponent loses 3 coins, which are returned to the bank.\n\n' +
      'Immediately play a second turn.\n\n' +
      'This Wonder is worth 3 victory points.',
    cost: {stone: 2, clay: 2, papyrus: 1},
    coins: 3,
    destroyCoins: 3,
    vp: 3,
    special: 'extra-turn',
  }, {
    name: 'Circus Maximus',
    description: 'Place in the discard pile a grey card (manufactured goods) of your choice constructed by your opponent.\n\n' +
      'This Wonder is worth 1 Shield.\n\n' +
      'This Wonder is worth 3 victory points.',
    cost: {stone: 2, wood: 1, glass: 1},
    shields: 1,
    vp: 3,
    destroy: 'manufactured',
  }, {
    name: 'The Colossus',
    description: 'This Wonder is worth 2 Shields.\n\n' +
      'This Wonder is worth 3 victory points.',
    cost: {clay: 3, glass: 1},
    shields: 2,
    vp: 3,
  }, {
    name: 'The Great Library',
    description: 'Randomly draw 3 Progress tokens from among those discarded at the beginning of the game. Choose one, play it, and return the other 2 to the box.\n\n' +
      'This Wonder is worth 4 victory points.',
    cost: {wood: 3, papyrus: 1, glass: 1},
    vp: 4,
    special: 'take-progress-discard',
  }, {
    name: 'The Great Lighthouse',
    description: 'This Wonder produces one unit of the resources shown (Stone, Clay, or Wood) for you each turn.\n\n' +
      'Clarification: This production has no impact on the cost of trading.\n\n' +
      'This Wonder is worth 4 victory points.',
    cost: {wood: 1, stone: 1, papyrus: 2},
    producesOneOf: ['wood', 'stone', 'clay'],
    vp: 4,
  }, {
    name: 'The Hanging Gardens',
    description: 'You take 6 coins from the bank.\n\n' +
      'Immediately play a second turn.\n\n' +
      'This Wonder is worth 3 victory points.',
    cost: {wood: 2, papyrus: 1, glass: 1},
    coins: 6,
    vp: 3,
    special: 'extra-turn',
  }, {
    name: 'The Mausoleum',
    description: 'Take all of the cards which have been discarded since the beginning of the game and immediately construct one of your choice for free.\n\n' +
      'Clarification: The cards discarded during setup are not part of the discard.\n\n' +
      'This Wonder is worth 2 victory points.',
    cost: {clay: 2, glass: 2, papyrus: 1},
    vp: 2,
    special: 'take-discards',
  }, {
    name: 'Piraeus',
    description: 'This Wonder produces one unit of one of the resources shown (Glass or Papyrus) for you each turn.\n\n' +
      'Clarification: This production has no impact on the cost of trading.\n\n' +
      'Immediately play a second turn.\n\n' +
      'This Wonder is worth 2 victory points.',
    cost: {wood: 2, stone: 1, clay: 1},
    producesOneOf: ['glass', 'papyrus'],
    vp: 2,
    special: 'extra-turn',
  }, {
    name: 'The Pyramids',
    description: 'This Wonder is worth 9 victory points.',
    cost: {stone: 3, papyrus: 1},
    vp: 9,
  }, {
    name: 'The Sphinx',
    description: 'Immediately play a second turn.\n\n' +
      'This Wonder is worth 6 victory points.',
    cost: {stone: 1, clay: 1, glass: 2},
    vp: 6,
    special: 'extra-turn',
  }, {
    name: 'The Statue of Zeus',
    description: 'Put in the discard pile one brown card (Raw goods) of your choice constructed by their opponent.\n\n' +
      'This Wonder is worth 1 Shield.\n\n' +
      'This Wonder is worth 3 victory points.',
    cost: {wood: 1, stone: 1, clay: 1, papyrus: 2},
    shields: 1,
    vp: 3,
    destroy: 'raw',
  }, {
    name: 'The Temple of Artemis',
    description: 'Immediately take 12 coins from the Bank.\n\n' +
      'Immediately play a second turn.',
    cost: {wood: 1, stone: 1, glass: 1, papyrus: 1},
    coins: 12,
    special: 'extra-turn',
  }
];

export const progressTokens: Partial<ProgressToken>[] = [
  {
    name: 'Agriculture',
    description: 'Immediately take 6 coins from the Bank.\n\n' +
      'The token is worth 4 victory points.',
    vp: 4,
    coins: 6,
  }, {
    name: 'Architecture',
    description: 'Any future Wonders built by you will cost 2 fewer resources. At each construction, you are free to choose which resources this rebate affects.',
    discount: 'wonder',
  }, {
    name: 'Economy',
    description: 'You gain the money spent by your opponent when they trade for resources.\n\n' +
      'Be careful, this is only for the money spent obtaining resources, not for the coins which are part of Building costs.\n\n' +
      'Clarification: the trade discounts of your opponent (Stone Reserve, Wood Reserve, Clay Reserve, and Customs House cards) change the purchase price, but the Economy Progress token allows you to gain the actual money spent by your opponent.',
    special: 'gain-trade-costs',
  }, {
    name: 'Law',
    description: 'This token is worth a scientific symbol.',
    science: 'law',
  }, {
    name: 'Masonry',
    description: 'Any future civilian Buildings (blue cards) constructed by you will cost 2 fewer resources. At each construction, you are free to choose which resources this rebate affects.',
    discount: 'civilian',
  }, {
    name: 'Mathematics',
    description: 'At the end of the game, score 3 victory points for each Progress token in your possession (including itself).',
    vpPer: {progress: 3},
  }, {
    name: 'Philosophy',
    description: 'The token is worth 7 victory points.',
    vp: 7,
  }, {
    name: 'Strategy',
    description: 'Once this token enters play, your new military Buildings (red cards) will benefit from 1 extra Shield.\n\n' +
      'Example: a military Building with 2 shields will therefore allow the player to move the Conflict pawn 3 spaces towards the enemy capital.\n\n' +
      'Clarification: \n\n' +
      '• This Progress does not apply to Wonders which have the Shield symbol.\n\n' +
      '• This Progress has no effect on military cards built before it came into play.',
    special: 'shield-bonus',
  }, {
    name: 'Theology',
    description: 'All future Wonders constructed by you are all treated as though they have the “Play Again” effect.\n\n' +
      'Be careful, Wonders which already have this effect are not affected (a given Wonder cannot have the “Play Again” effect twice).',
    special: 'extra-turn',
  }, {
    name: 'Urbanism',
    description: 'Immediately take 6 coins from the Bank.\n\n' +
      'Each time you construct a Building for free through linking (free construction condition, chain), you gain 4 coins.',
    coins: 6,
    special: 'free-link-bonus',
  }
];
