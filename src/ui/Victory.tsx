import React from 'react';
import { SevenWondersDuelPlayer } from '../game/index.js';

const Victory = ({ showVP, player1, player2 }: {
  showVP: boolean,
  player1: SevenWondersDuelPlayer,
  player2: SevenWondersDuelPlayer,
}) => (
  <table className="victory">
    <tbody>
      {showVP && (
        <tr>
          <th></th>
          {showVP && <th style={{color: player1.color}}>{player1.name}</th>}
          {showVP && <th style={{color: player2.color}}>{player2.name}</th>}
        </tr>
      )}
      <tr>
        <td><b>Buildings</b><div className="help-text">VP on card</div></td>
        {showVP && <td>{player1.cardVP()}</td>}
        {showVP && <td>{player2.cardVP()}</td>}
      </tr>
      <tr>
        <td><b>Wonders</b><div className="help-text">VP on wonder</div></td>
        {showVP && <td>{player1.wonderVP()}</td>}
        {showVP && <td>{player2.wonderVP()}</td>}
      </tr>
      <tr>
        <td><b>Progress Tokens</b><div className="help-text">VP on token</div></td>
        {showVP && <td>{player1.progressTokenVP()}</td>}
        {showVP && <td>{player2.progressTokenVP()}</td>}
      </tr>
      <tr>
        <td><b>Military</b><div className="help-text">Space on track</div></td>
        {showVP && <td>{player1.militaryVP()}</td>}
        {showVP && <td>{player2.militaryVP()}</td>}
      </tr>
      <tr>
        <td><b>Coins</b><div className="help-text">1 VP per 3 coins</div></td>
        {showVP && <td>{player1.coinVP()}</td>}
        {showVP && <td>{player2.coinVP()}</td>}
      </tr>
      <tr>
        <td><b>Bonuses</b><div className="help-text">Building or wonders with VP per bonus</div></td>
        {showVP && <td>{player1.vpPerBonuses()}</td>}
        {showVP && <td>{player2.vpPerBonuses()}</td>}
      </tr>
      {showVP && (
        <tr className="totals">
          <td><b>Totals</b></td>
          <td style={{color: player1.color}}>{player1.score()}</td>
          <td style={{color: player2.color}}>{player2.score()}</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Victory;
