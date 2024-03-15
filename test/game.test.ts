import { expect, test, beforeEach } from 'vitest'
import { TestRunner } from "@boardzilla/core";
import setup, { SevenWondersDuel, SevenWondersDuelPlayer, Wonder, Card, ProgressToken } from '../src/game/index.js';

let runner: TestRunner<SevenWondersDuelPlayer, SevenWondersDuel>;

beforeEach(() => {
  runner = new TestRunner(setup);
})

test('costFor with architecture', () => {
  const [ui1] = runner.start({
    players: 2,
    settings: { realtimeVp: false }
  });

  const game = runner.server.game;
  game.first(Card, 'Stone Pit')!.putInto(ui1.player.my('buildings')!);
  game.first(Card, 'Clay Pit')!.putInto(ui1.player.my('buildings')!);

  expect(game.first(Wonder, 'Piraeus')!.costFor(ui1.player)).equal(4);

  game.first(ProgressToken, 'Architecture')!.putInto(ui1.player.my('mat')!);
  expect(game.first(Wonder, 'Piraeus')!.costFor(ui1.player)).equal(0);
})
