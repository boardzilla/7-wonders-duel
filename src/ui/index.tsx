/**
 * age start options
 */
import React from 'react';
import { render, times, toggleSetting } from '@boardzilla/core';
import { default as setup, Card, CardSlot, Wonder, ProgressToken } from '../game/index.js';

import './style.scss';
import '@boardzilla/core/index.css';

import militaryTrackSvg from './assets/military-track.svg';
import militaryReward2Svg from './assets/military-reward-2.svg';
import militaryReward5Svg from './assets/military-reward-5.svg';
import agricultureToken from './assets/agriculture.svg';
import architectureToken from './assets/architecture.svg';
import lawToken from './assets/law.svg';
import economyToken from './assets/economy.svg';
import masonryToken from './assets/masonry.svg';
import mathematicsToken from './assets/mathematics.svg';
import philosophyToken from './assets/philosophy.svg';
import strategyToken from './assets/strategy.svg';
import theologyToken from './assets/theology.svg';
import urbanismToken from './assets/urbanism.svg';

const resourceIcon = (resource: string, amount = 1):React.JSX.Element => (
  <span key={resource}>{times(amount, n => <span key={n} className={`svg-icon ${resource}`}/>)}</span>
);

render(setup, {
  settings: {
    realtimeVp: toggleSetting('Show VP in real-time')
  },
  layout: (board, player) => {
    const deck = board.first('deck')!;
    const field = board.first('field')!;
    const p1 = board.game.players[0];
    const p2 = board.game.players[1];
    const p1mat = p1.my('mat')!
    const p2mat = p2.my('mat')!

    board.disableDefaultAppearance();

    board.appearance({
      aspectRatio: 8 / 5,
    });

    board.layout('deck', { });

    board.layout('mat', {
      area: { top: 2, height: 96, left: 2, width: 96 },
    });

    board.layout('field', {
      area: {
        top: 2, left: 18, width: 64, height: 78
      },
      alignment: 'center',
    });

    board.layout('discard', {
      area: {
        top: 75, left: 42, width: 16, height: 23
      },
    });

    deck?.appearance({
      render: false
    });

    p1mat.layout('buildings', {
      area: { left: 0, top: 75, height: 25, width: 100 },
    });

    p2mat.layout('buildings', {
      area: { left: 0, top: 75, height: 25, width: 100 },
    });

    p1mat.layout('wonders', {
      area: { left: 2, top: 18, height: 55, width: 34 },
    });

    p2mat.layout('wonders', {
      area: { left: 64, top: 18, height: 55, width: 34 },
    });

    p1.my('buildings')!.layout(p1.allMy(Card, c => c.type === 'raw' || c.type === 'manufactured'), {
      area: { left: 0, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p1.my('buildings')!.layout(p1.allMy(Card, {type: 'scientific'}), {
      area: { left: 13.5, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p1.my('buildings')!.layout(p1.allMy(Card, {type: 'civilian'}), {
      area: { left: 27, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p1.my('buildings')!.layout(p1.allMy(Card, {type: 'military'}), {
      area: { left: 40.5, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p1.my('buildings')!.layout(p1.allMy(Card, {type: 'commercial'}), {
      area: { left: 54, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p1.my('buildings')!.layout(p1.allMy(Card, {type: 'guild'}), {
      area: { left: 67.5, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p2.my('buildings')!.layout(p2.allMy(Card, c => c.type === 'raw' || c.type === 'manufactured'), {
      area: { left: 20.5, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p2.my('buildings')!.layout(p2.allMy(Card, {type: 'scientific'}), {
      area: { left: 34, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p2.my('buildings')!.layout(p2.allMy(Card, {type: 'civilian'}), {
      area: { left: 47.5, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p2.my('buildings')!.layout(p2.allMy(Card, {type: 'military'}), {
      area: { left: 61, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p2.my('buildings')!.layout(p2.allMy(Card, {type: 'commercial'}), {
      area: { left: 74.5, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p2.my('buildings')!.layout(p2.allMy(Card, {type: 'guild'}), {
      area: { left: 88, top: 0, height: 100, width: 12 },
      columns: 1,
      offsetRow: {x: 0, y: 25},
      alignment: 'top',
      scaling: 'fill',
    });

    p1.my('wonders')!.layout(Wonder, {
      gap: .5,
      columns: 1,
      alignment: 'top left',
    });

    p2.my('wonders')!.layout(Wonder, {
      gap: .5,
      columns: 1,
      alignment: 'top right',
    });

    p1mat.layout(ProgressToken, {
      area: { left: 22, top: 7, height: 8, width: 43 },
      gap: .5,
      rows: 1,
      alignment: 'top left',
    });

    p2mat.layout(ProgressToken, {
      area: { left: 35, top: 7, height: 8, width: 43 },
      gap: .5,
      rows: 1,
      alignment: 'right',
    });

    board.first('discard')!.layout(Card, {
      rows: 1,
      columns: {min: 4},
      scaling: 'fill',
    });

    board.all('mat').appearance({
      render: mat => (
        <div>
          <div className="player-name" style={{background: mat.player!.color}}>
            {mat.player!.name}<br/>
          </div>
          <img className="avatar" style={{borderColor: mat.player!.color}} src={mat.player!.avatar}/>
          <div className="score">
            {board.gameSetting('realtimeVp') && <span className="svg-icon vp"><span className={mat.player!.score() > 9 ? 'two-digit' : ''}>{mat.player!.score()}</span></span>}
            <span style={{marginLeft: '.2em'}} className="svg-icon coins">{mat.player!.coins}</span>
          </div>
        </div>
      )
    });

    field.appearance({
      render: () => (
        <div id="military-track">
          <div className="band l4"/>
          <div className="band l3"/>
          <div className="band l2"/>
          <div className="band l1"/>
          <div className="band c"/>
          <div className="band r1"/>
          <div className="band r2"/>
          <div className="band r3"/>
          <div className="band r4"/>
          <img src={militaryTrackSvg} className="icons"/>
          {board.militaryRewards.find(r => r.track === 6) && <img src={militaryReward5Svg} className="reward-left5"/>}
          {board.militaryRewards.find(r => r.track === 3) && <img src={militaryReward2Svg} className="reward-left2"/>}
          {board.militaryRewards.find(r => r.track === -3) && <img src={militaryReward2Svg} className="reward-right2"/>}
          {board.militaryRewards.find(r => r.track === -6) && <img src={militaryReward5Svg} className="reward-right5"/>}
          <span className="svg-icon shield" style={{left: 46.01 + (-5.10125 * board.militaryTrack) + '%'}}/>
        </div>
      )
    });

    board.all(CardSlot).appearance({
      render: () => null
    });

    field.layout(CardSlot, {
      area: { left: 10, width: 80, top: 24, height: 70 },
      rows: 7,
      columns: 11,
      gap: -4.6,
    });

    field.layout(Wonder, {
      area: { left: 10, width: 80, top: 0, height: 100 },
      gap: 2
    });

    field.layout(ProgressToken, {
      area: { left: 35, width: 30, top: 0, height: 10 },
      gap: .5,
      rows: 1,
      alignment: 'top',
    });

    board.all(ProgressToken).appearance({
      aspectRatio: 1,
      render: token => (
        <div className="progress-token">
          {token.name === 'Urbanism' && <img src={urbanismToken}/>}
          {token.name === 'Theology' && <img src={theologyToken}/>}
          {token.name === 'Philosophy' && <img src={philosophyToken}/>}
          {token.name === 'Mathematics' && <img src={mathematicsToken}/>}
          {token.name === 'Economy' && <img src={economyToken}/>}
          {token.name === 'Masonry' && <img src={masonryToken}/>}
          {token.name === 'Law' && <img src={lawToken}/>}
          {token.name === 'Architecture' && <img src={architectureToken}/>}
          {token.name === 'Agriculture' && <img src={agricultureToken}/>}
          {token.name === 'Strategy' && <img src={strategyToken}/>}
        </div>
      ),
      tooltip: token => <>{token.description.split('\n').map((p, i) => <p key={i}>{p}</p>)}</>
    });

    board.all(Wonder).appearance({
      aspectRatio: 2,
      zoomable: true,
      render: wonder => (
        <div className="wonder-features">
          <div className="name">{wonder.name}</div>
          <div className="cost">
            {wonder.coinCost ? <span className="svg-icon coins">{wonder.coinCost}</span> : null}
            {Object.entries(wonder.cost).map(([resource, amount]) => resourceIcon(resource, amount))}
          </div>
          <div className="rewards">
            {wonder.destroyCoins && <><span className="svg-icon coins destroy"/><span className="destroy-amount">{wonder.destroyCoins}</span></>}
            {wonder.coins && <span className="svg-icon coins">{wonder.coins}</span>}
            {wonder.special === 'extra-turn' && <span className="svg-icon extra-turn"/>}
            {wonder.special === 'take-progress-discard' && <span className="svg-icon take-progress-discard"/>}
            {wonder.special === 'take-discards' && <span className="svg-icon take-discard"/>}
            {wonder.destroy && <span className={`card-type destroy ${wonder.destroy}`}></span>}
            {Object.entries(wonder.produces).map(([resource, amount]) => resourceIcon(resource, amount))}
            {wonder.producesOneOf.map((resource, i) => <div key={i}>{i > 0 ? <div className="slash">/</div> : ''}{resourceIcon(resource)}</div>)}
            {wonder.shields !== undefined && times(wonder.shields, n => <span key={n} className="svg-icon shield"/>)}
            {wonder.vp ? <span className="svg-icon vp">{wonder.vp}</span> : null}{' '}
          </div>
        </div>
      ),
      effects: [{
        attributes: {built: true},
        className: 'newly-built'
      }],
      tooltip: wonder => <>{wonder.description.split('\n').map((p, i) => <p key={i}>{p}</p>)}</>
    });

    board.all(Card).appearance({
      aspectRatio: 3 / 4,
      render: card => (
        <div>
          <div className="front">
            <div className={`header ${card.type}`}>
              {card.coins && <span className="svg-icon coins">{card.coins}</span>}
              {Object.entries(card.produces).map(([resource, amount]) => resourceIcon(resource, amount))}
              {card.producesOneOf.map((resource, i) => <span key={i}>{i > 0 ? '/' : ''}{resourceIcon(resource)}</span>)}
              {card.shields !== undefined && times(card.shields, n => <span key={n} className="svg-icon shield"/>)}
              {card.vp ? <span className="svg-icon vp">{card.vp}</span> : null}{' '}
              {card.science && <span className={`svg-icon science-${card.science}`}/>}
              {card.link && <div className="link"><span className={`svg-icon link-${card.link}`}/></div>}
              {card.trades && card.trades.map(t => <span className="trades" key={t}>{resourceIcon(t)}<span className="svg-icon coins">1</span></span>)}
              {card.coinsPer && card.type !== 'guild' && Object.entries(card.coinsPer).map(
                ([type, amount]) => <span className={`card-type ${type}`} key={type}><span className="svg-icon coins">{amount}</span></span>
              )}
              {card.name === 'Moneylenders Guild' && <span className="svg-icon moneylenders"/>}
              {card.name === 'Merchants Guild' && <span className="svg-icon merchants"/>}
              {card.name === 'Shipowners Guild' && <span className="svg-icon shipowners"/>}
              {card.name === 'Tacticians Guild' && <span className="svg-icon tacticians"/>}
              {card.name === 'Builders Guild' && <span className="svg-icon builders"/>}
              {card.name === 'Magistrates Guild' && <span className="svg-icon magistrates"/>}
              {card.name === 'Scientists Guild' && <span className="svg-icon scientists"/>}
            </div>
            {(!!card.coinCost || !!Object.values(card.cost).length) &&
              <div>
                <span className="cost">
                  {!!card.coinCost && <span className="svg-icon coins">{card.coinCost}</span>}
                  {Object.entries(card.cost).map(([resource, amount]) => resourceIcon(resource, amount))}
                </span>
              </div>
            }
            {card.freeLink && <span className="free-link"><span className={`svg-icon link-${card.freeLink}`}/></span>}
            <div className='name'>
              {card.name}
            </div>
          </div>
          <div className="back"></div>
        </div>
      ),
      tooltip: card => card.description ? <>{card.description.split('\n').map((p, i) => <p key={i}>{p}</p>)}</> : null
    });

    board.all(Card, c => c.name !== undefined).appearance({ zoomable: true });

    board.layoutAction('pickWonder', {
      element: field,
      left: 10,
      bottom: 15
    });

    board.layoutStep('play', {
      element: field,
      left: 10,
      top: 24
    });

    board.layoutStep('out-of-turn', {
      element: field,
      left: 10,
      top: 24
    });

    if (player.position === 1) {
      board.layoutAction('buildWonder', {
        element: board.first('mat', {mine: true})!,
        left: 36,
        top: 18,
      });
    } else {
      board.layoutAction('buildWonder', {
        element: board.first('mat', {mine: true})!,
        right: 36,
        top: 18,
      });
    }
  }
});
