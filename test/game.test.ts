import { expect, test, beforeEach } from 'vitest'
import { TestRunner } from "@boardzilla/core";
import setup, { SevenWondersDuel, Wonder, Card, ProgressToken } from '../src/game/index.js';

let runner: TestRunner<SevenWondersDuel>;

beforeEach(() => {
  runner = new TestRunner(setup, game => {
    game.create(Card, 'card');
  });
})

test('costFor with architecture', () => {
  const [ui1] = runner.start({
    players: 2,
    settings: { realtimeVp: false }
  });

  const game = runner.server.game;
  game.first(Card, 'Stone Pit')!.putInto(game.players[0].my('buildings')!);
  game.first(Card, 'Clay Pit')!.putInto(game.players[0].my('buildings')!);
  game.first(Card, 'Stone Pit')!.showToAll();
  game.first(Card, 'Clay Pit')!.showToAll();
  game.first(Wonder, 'Piraeus')!.putInto(game.first('field')!);
  game.firstMoveOfAge = true;

  runner.updatePlayers();
  expect(ui1.game.first(Wonder, 'Piraeus')!.costFor(ui1.player)).equal(4);

  game.first(ProgressToken, 'Architecture')!.putInto(game.players[0].my('mat')!);
  expect(game.first(Wonder, 'Piraeus')!.costFor(game.players[0])).equal(0);
})
