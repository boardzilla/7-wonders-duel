import React from 'react';
import { render } from '@boardzilla/core';
import { default as setup, Card, CardSlot, Wonder, ProgressToken } from '../game/index.js';

import './style.scss';

const icons: Record<string, string> = {
  wood: '🪵',
  clay: '🧱',
  stone: '🪨',
  glass: '🧪',
  papyrus: '📜',
};

const coins = '①②③④⑤⑥⑦⑧⑨⑩';

render(setup, {
  layout: board => {
    board.appearance({
      render: () => null
    });

    board.layout('deck', {
    });

    board.layout('mat', {
      area: {
        top: 50, left: 0, width: 100, height: 50
      }
    });

    board.layout('field', {
      area: {
        top: 0, left: 20, width: 80, height: 50
      }
    });

    board.layout('discard', {
      area: {
        top: 0, left: 0, width: 20, height: 50
      }
    });

    board.first('deck')?.appearance({
      render: false
    });

    board.all('mat').layout(board.all(Card, c => c.type === 'raw' || c.type === 'manufactured'), {
      area: { left: 0, top: 12, height: 40, width: 15 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    board.all('mat').layout(board.all(Card, {type: 'scientific'}), {
      area: { left: 16, top: 12, height: 40, width: 15 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    board.all('mat').layout(board.all(Card, {type: 'civilian'}), {
      area: { left: 32, top: 12, height: 40, width: 15 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    board.all('mat').layout(board.all(Card, {type: 'military'}), {
      area: { left: 48, top: 12, height: 40, width: 15 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    board.all('mat').layout(board.all(Card, {type: 'commercial'}), {
      area: { left: 64, top: 12, height: 40, width: 15 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    board.all('mat').layout(board.all(Card, {type: 'guild'}), {
      area: { left: 80, top: 12, height: 40, width: 15 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    board.all('mat').layout(Wonder, {
      area: { left: 0, top: 60, height: 40, width: 100 },
      gap: 2
    });

    board.all('mat').layout(ProgressToken, {
      area: { left: 0, top: 60, height: 40, width: 10 },
      gap: 2,
      columns: 1,
      alignment: 'top'
    });

    board.first('deck')!.layout(Card, {
    });

    board.all('discard').appearance({
      render: () => null,
    });

    board.all('mat').appearance({
      render: mat => (
        <div>VP: {mat.player.score()} Coins: {mat.player!.coins}</div>
      )
    });

    board.first('field')!.appearance({
      render: () => (
        <div className="military-track">
          {board.militaryRewards.find(r => r.track === -6) ? <span style={{color: 'red'}}>⑤</span> : <span style={{color: 'green'}}>⑩</span>}
          {board.militaryRewards.find(r => r.track === -3) ? <span style={{color: 'red'}}>②</span> : <span style={{color: 'green'}}>⑤</span>}
          <span style={{color: 'green'}}>②</span> {board.militaryTrack} <span style={{color: 'green'}}>②</span>
          {board.militaryRewards.find(r => r.track === 3) ? <span style={{color: 'red'}}>②</span> : <span style={{color: 'green'}}>⑤</span>}
          {board.militaryRewards.find(r => r.track === 6) ? <span style={{color: 'red'}}>⑤</span> : <span style={{color: 'green'}}>⑩</span>}
        </div>
      )
    });

    board.all(CardSlot).appearance({
      render: () => null
    });

    board.first('field')!.layout(CardSlot, {
      area: { left: 5, width: 65, top: 0, height: 100 },
      rows: 7,
      columns: 11,
      gap: -3.6,
    });

    board.first('field')!.layout(Wonder, {
      area: { left: 0, width: 75, top: 0, height: 100 },
      gap: 2
    });

    board.first('field')!.layout(ProgressToken, {
      area: { left: 75, width: 25, top: 0, height: 100 },
      gap: 2,
      columns: 1,
    });

    board.all(ProgressToken).appearance({
      aspectRatio: 1,
      zoomable: true,
      render: token => (
        <div>
          <div>{token.name}</div>
          <div className="description">{token.description.split('\n').map((l, i) => <p key={i}>{l}</p>)}</div>
        </div>
      )
    });

    board.all(Wonder).appearance({
      aspectRatio: 2,
      zoomable: true,
      render: wonder => (
        <div>
          <div>{wonder.name}</div>
          <div className="cost">
            {wonder.coinCost ? coins[wonder.coinCost - 1] : null}
            {Object.entries(wonder.cost).map(([resource, amount]) => icons[resource].repeat(amount))}
          </div>
          <div className="description">{wonder.description.split('\n').map((l, i) => <p key={i}>{l}</p>)}</div>
        </div>
      )
    });

    board.all(Card).appearance({
      aspectRatio: .75,
      zoomable: true,
      render: card => (
        <div>
          <div className={`header ${card.type}`}>
            {card.coins && coins[card.coins - 1]}
            {Object.entries(card.produces).map(([resource, amount]) => icons[resource].repeat(amount))}
            {card.producesOneOf.map(resource => icons[resource]).join('/')}
            {card.shields !== undefined && '⛨'.repeat(card.shields)}
            {card.vp ? <b>{card.vp}VP</b> : null}{' '}
            {card.science && (card.science === 'writing' ? 'R' : card.science[0].toUpperCase())}
          </div>
          <div className="cost">
            {card.coinCost ? coins[card.coinCost - 1] : null}
            {Object.entries(card.cost).map(([resource, amount]) => icons[resource].repeat(amount))}
            {card.freeLink && <div className="link">Free with {card.freeLink}</div>}
          </div>
          <div className='name'>
            {card.name}
          </div>
        </div>
      ),
    });

    board.first('deck')!.all(Card, c => c.container()!.name !== 'discard').appearance({
      render: false
    });
  }
});
