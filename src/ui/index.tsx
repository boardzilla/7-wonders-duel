import React from 'react';
import { PieceGrid, ProfileBadge, render, times, toggleSetting } from '@boardzilla/core';
import { Flippable } from '@boardzilla/core/components';
import { default as setup, Card, Wonder, ProgressToken } from '../game/index.js';

import './style.scss';

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
import Victory from './Victory.js';

const resourceIcon = (resource: string, amount = 1):React.JSX.Element => (
  <span key={resource}>{times(amount, n => <span key={n} className={`svg-icon ${resource}`}/>)}</span>
);

render(setup, {
  boardSizes: [{
    name: 'mobile',
    mobile: true,
    aspectRatio: { max: 16 / 9, min: 22 / 10 },
    orientation: 'landscape',
  }, {
    name: 'desktop',
    desktop: true,
    aspectRatio: { min: 8 / 5, max: 2 / 1 },
  }],

  settings: {
    realtimeVp: toggleSetting('Show VP in real-time')
  },

  layout: (game, player, boardSize) => {
    const deck = game.first('deck')!;
    const field = game.first('field')!;
    const p1 = game.players[0];
    const p2 = game.players[1];
    const p1mat = p1.my('mat')!
    const p2mat = p2.my('mat')!

    game.disableDefaultAppearance();

    if (boardSize === 'desktop') {
      game.layout('mat', {
        area: { top: 2, height: 96, left: 3, width: 94 },
      });
    } else {
      game.layout(p1mat, {
        area: { top: 2, height: 96, left: 2, width: 35 },
      });
      game.layout(p2mat, {
        area: { top: 2, height: 96, left: 63, width: 35 },
      });
    }

    if (boardSize === 'desktop') {
      game.layout('field', {
        area: {
          top: 2, left: 18, width: 64, height: 78
        },
        alignment: 'center',
      });
    } else {
      game.layout('field', {
        area: {
          top: 2, left: 20, width: 60, height: 98
        },
        alignment: 'center',
      });
    }

    game.layoutAsDrawer('discard', {
      area: {
        top: 60, left: 30, width: 40, height: 40
      },
      openDirection: 'up',
      tab: `Discards (${game.first('discard')!.all(Card).length})`,
      openIf: actions => actions.some(a => a.name === 'takeDiscards'),
      closeIf: actions => actions.every(a => a.name !== 'takeDiscards'),
    });

    deck?.appearance({
      render: false
    });

    if (boardSize === 'desktop') {
      p1mat.layout('buildings', {
        area: { left: 0, top: 75, height: 25, width: 100 },
      });

      p2mat.layout('buildings', {
        area: { left: 0, top: 75, height: 25, width: 100 },
      });

      p1mat.layout('wonders', {
        area: { left: 0, top: 15, height: 60, width: 38 },
      });

      p2mat.layout('wonders', {
        area: { left: 62, top: 15, height: 60, width: 38 },
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

    } else {
      p1mat.layout('buildings', {
        area: { left: 10, top: 18, height: 82, width: 40 },
      });

      p2mat.layout('buildings', {
        area: { left: 50, top: 18, height: 82, width: 40 },
      });

      p1mat.layoutAsDrawer('wonders', {
        area: { left: 0, top: 18, height: 82, width: 50 },
        openDirection: 'right',
        tab: 'Wonders',
        openIf: actions => {
          const names = actions.map(a => a.name);
          return player.position === 1 && (names.includes('pickWonder') || names.includes('buildWonder') && names.length === 1);
        },
      });

      p2mat.layoutAsDrawer('wonders', {
        area: { left: 50, top: 18, height: 82, width: 50 },
        openDirection: 'left',
        tab: 'Wonders',
        openIf: actions => {
          const names = actions.map(a => a.name);
          return player.position === 2 && (names.includes('pickWonder') || names.includes('buildWonder') && names.length === 1);
        },
      });

      p1.my('buildings')!.layout(p1.allMy(Card, c => c.type === 'raw' || c.type === 'manufactured'), {
        area: { left: 0, top: 0, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p1.my('buildings')!.layout(p1.allMy(Card, {type: 'scientific'}), {
        area: { left: 55, top: 0, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p1.my('buildings')!.layout(p1.allMy(Card, {type: 'civilian'}), {
        area: { left: 0, top: 35, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p1.my('buildings')!.layout(p1.allMy(Card, {type: 'military'}), {
        area: { left: 55, top: 35, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p1.my('buildings')!.layout(p1.allMy(Card, {type: 'commercial'}), {
        area: { left: 0, top: 70, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p1.my('buildings')!.layout(p1.allMy(Card, {type: 'guild'}), {
        area: { left: 55, top: 70, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p2.my('buildings')!.layout(p2.allMy(Card, c => c.type === 'raw' || c.type === 'manufactured'), {
        area: { left: 0, top: 0, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p2.my('buildings')!.layout(p2.allMy(Card, {type: 'scientific'}), {
        area: { left: 55, top: 0, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p2.my('buildings')!.layout(p2.allMy(Card, {type: 'civilian'}), {
        area: { left: 0, top: 35, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p2.my('buildings')!.layout(p2.allMy(Card, {type: 'military'}), {
        area: { left: 55, top: 35, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p2.my('buildings')!.layout(p2.allMy(Card, {type: 'commercial'}), {
        area: { left: 0, top: 70, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });

      p2.my('buildings')!.layout(p2.allMy(Card, {type: 'guild'}), {
        area: { left: 55, top: 70, height: 30, width: 45 },
        columns: 1,
        offsetRow: {x: 0, y: 25},
        alignment: 'top',
        scaling: 'fill',
        maxOverlap: 80,
      });
    }

    p1.my('wonders')!.layout(Wonder, {
      area: { left: 2, width: 88, top: 5, height: 90 },
      gap: 1,
      columns: 1,
      alignment: 'left',
    });

    p2.my('wonders')!.layout(Wonder, {
      area: { left: 2, width: 88, top: 5, height: 90 },
      gap: 1,
      columns: 1,
      alignment: 'right',
    });

    if (boardSize === 'desktop') {
      p1mat.layout(ProgressToken, {
        area: { left: 1, top: 10, height: 6.5, width: 50 },
        gap: .5,
        rows: 1,
        alignment: 'top left',
      });

      p2mat.layout(ProgressToken, {
        area: { left: 45.5, top: 10, height: 6.5, width: 50 },
        gap: .5,
        rows: 1,
        alignment: 'right',
      });

    } else {
      p1mat.layout(ProgressToken, {
        area: { left: 50, top: 10, height: 6.5, width: 40 },
        gap: .5,
        rows: 1,
        alignment: 'top left',
      });

      p2mat.layout(ProgressToken, {
        area: { left: 10, top: 10, height: 6.5, width: 40 },
        gap: .5,
        rows: 1,
        alignment: 'right',
      });
    }

    game.first('discard')!.layout(Card, {
      rows: 1,
      margin: 1,
      columns: {min: 4},
      scaling: 'fill',
      maxOverlap: 80,
    });

    game.all('mat').appearance({
      render: mat => (
        <div>
          <ProfileBadge player={mat.player!}/>
          <div className="score">
            {game.setting('realtimeVp') && <span className="svg-icon vp"><span className={mat.player!.score() > 9 ? 'two-digit' : ''}>{mat.player!.score()}</span></span>}
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
          {game.militaryRewards.find(r => r.track === 6) && <img src={militaryReward5Svg} className="reward-left5"/>}
          {game.militaryRewards.find(r => r.track === 3) && <img src={militaryReward2Svg} className="reward-left2"/>}
          {game.militaryRewards.find(r => r.track === -3) && <img src={militaryReward2Svg} className="reward-right2"/>}
          {game.militaryRewards.find(r => r.track === -6) && <img src={militaryReward5Svg} className="reward-right5"/>}
          <span className="svg-icon shield" style={{left: 46.01 + (-5.10125 * game.militaryTrack) + '%'}}/>
        </div>
      )
    });

    if (boardSize === 'desktop') {
      field.first(PieceGrid)!.configureLayout({
        area: { left: 10, width: 80, top: 24, height: 70 },
        rows: 7,
        columns: 11,
        offsetColumn: {x: 45, y: 0},
        offsetRow: {x: 0, y: 45},
      });

    } else {

      field.first(PieceGrid)!.configureLayout({
        area: { left: 0, width: 100, top: 18, height: 80 },
        rows: 7,
        columns: 11,
        offsetColumn: {x: 45, y: 0},
        offsetRow: {x: 0, y: 30},
      });
    }

    field.layout(Wonder, {
      area: { left: 10, width: 80, top: 10, height: 100 },
      gap: 2,
      rows: 2,
      columns: 2,
      sticky: true,
    });

    field.layout(ProgressToken, {
      area: { left: 35, width: 30, top: 0, height: 10 },
      gap: .5,
      rows: 1,
      alignment: 'top',
    });

    game.all(ProgressToken).appearance({
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
      info: token => <>{token.description.split('\n').map((p, i) => <p key={i}>{p}</p>)}</>
    });

    game.all(Wonder).appearance({
      aspectRatio: 2,
      render: wonder => (
        <div className="wonder-features">
          <div className="name">{wonder.name}</div>
          <div className="cost">
            {wonder.coinCost ? <span className="svg-icon coins">{wonder.coinCost}</span> : null}
            {wonder.cost && Object.entries(wonder.cost).map(([resource, amount]) => resourceIcon(resource, amount))}
          </div>
          <div className="rewards">
            {wonder.destroyCoins && <><span className="svg-icon coins destroy"/><span className="destroy-amount">{wonder.destroyCoins}</span></>}
            {wonder.coins && <span className="svg-icon coins">{wonder.coins}</span>}
            {wonder.special === 'extra-turn' && <span className="svg-icon extra-turn"/>}
            {wonder.special === 'take-progress-discard' && <span className="svg-icon take-progress-discard"/>}
            {wonder.special === 'take-discards' && <span className="svg-icon take-discard"/>}
            {wonder.destroyCard && <span className={`card-type destroy ${wonder.destroyCard}`}></span>}
            {wonder.produces && Object.entries(wonder.produces).map(([resource, amount]) => resourceIcon(resource, amount))}
            {wonder.producesOneOf?.map((resource, i) => <div key={i}>{i > 0 ? <div className="slash">/</div> : ''}{resourceIcon(resource)}</div>)}
            {wonder.shields !== undefined && times(wonder.shields, n => <span key={n} className="svg-icon shield"/>)}
            {wonder.vp ? <span className="svg-icon vp">{wonder.vp}</span> : null}{' '}
          </div>
        </div>
      ),
      effects: [{
        trigger: (wonder, previously) => !!wonder.built && !previously.built,
        name: 'newly-built'
      }],
      info: wonder => <>{wonder.description.split('\n').map((p, i) => <p key={i}>{p}</p>)}</>
    });

    game.all(Card).appearance({
      aspectRatio: 3 / 4,
      render: card => (
        <Flippable>
          <Flippable.Front>
            <div className={`header ${card.type}`}>
              {card.coins && <span className="svg-icon coins">{card.coins}</span>}
              {card.produces && Object.entries(card.produces).map(([resource, amount]) => resourceIcon(resource, amount))}
              {card.producesOneOf?.map((resource, i) => <span key={i}>{i > 0 ? '/' : ''}{resourceIcon(resource)}</span>)}
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
            {(!!card.coinCost || (card.cost && !!Object.values(card.cost).length)) &&
              <div>
                <span className="cost">
                  {!!card.coinCost && <span className="svg-icon coins">{card.coinCost}</span>}
                  {card.cost && Object.entries(card.cost).map(([resource, amount]) => resourceIcon(resource, amount))}
                </span>
              </div>
            }
            {card.freeLink && <span className="free-link"><span className={`svg-icon link-${card.freeLink}`}/></span>}
            <div className='name'>
              {card.name}
            </div>
          </Flippable.Front>
        </Flippable>
      ),
      info: card => card.description ? <>{card.description.split('\n').map((p, i) => <p key={i}>{p}</p>)}</> : null
    });

    if (boardSize === 'mobile') {
      game.layoutAction('buy', {
        element: field,
        left: 0,
        top: 24
      });

      game.layoutAction('discard', {
        element: field,
        left: 0,
        top: 24
      });

      game.layoutAction('pickWonder', {
        element: field,
        left: 10,
        bottom: 8,
      });

    } else {

      game.layoutAction('pickWonder', {
        element: field,
        left: 10,
        bottom: 0
      });
    }

    game.layoutStep('play', {
      element: field,
      left: 5,
      top: 24
    });

    if (player.position === 1) {
      game.layoutAction('buildWonder', {
        element: field,
        left: 13,
        top: 50,
      });
    } else {
      game.layoutAction('buildWonder', {
        element: field,
        right: 15,
        top: 50,
      });
    }
  },

  announcements: {
    civilianVictory: game => {
      const winner = game.getWinners()?.[0];
      return (
        <>
          <h1>
            {winner && <span>{winner.name} wins a civilian victory!</span>}
            {!winner && <span>Tie game!</span>}
          </h1>
          <Victory
            player1={game.players[0]}
            player2={game.players[1]}
            showVP={true}
          />
        </>
      );
    }
  },

  infoModals: [
    {
      title: 'Victory Points',
      modal: game => {
        const showVP = game.getWinners() || game.setting('realtimeVp');
        return (
          <>
            <h1>Victory Points</h1>
            <Victory
              player1={game.players[0]}
              player2={game.players[1]}
              showVP={showVP}
            />
          </>
        )
      }
    }
  ]
});
