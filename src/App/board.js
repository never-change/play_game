import React, { Component } from 'react';
import BidCard from './bidCard';
import PlayCard from './playCard';
import Cliam from './cliam';
import CliamOK from './claim_OK';


class Board extends Component {
  state = {
  }

  render() {
    const hands = this.props.boardData.hands || [];
    var boo = false;
    hands.forEach(v => {
      if (v.length) {
        // console.log(v.length)
        boo = true;
        return
      }
    });
    console.log(boo)
    const state = this.props.boardData.state || null;
    const vacant_trick =
      13 - this.props.boardData.ns_win - this.props.boardData.ew_win;
    return (
      <div>
        <h3>{this.props.boardData.title}</h3>
        <h3>状态/出牌人：{this.props.boardData.state}
          / {this.props.boardData.player}</h3>
        <h5>
          局况：{this.props.boardData.vulnerable}
          发牌人：{this.props.boardData.dealer} <br />
          叫牌过程：{this.props.boardData.auction} <br />
          庄家：{this.props.boardData.declarer}
          定约：{this.props.boardData.contract}
          首攻：{this.props.boardData.openlead}  <br />
          南北赢：{this.props.boardData.ns_win}
          东西赢：{this.props.boardData.ew_win}   <br />
          结果：{this.props.boardData.result}  <br />
          打牌过程：{this.props.boardData.trick}
        </h5>
        {this.props.boardData.state === 'bidding' ?
          <BidCard
            bid={this.props.bid}
            player={this.props.boardData.player} />
          : null
        }

        {boo ?
          <PlayCard
            isBidding={this.props.boardData.state === 'bidding'}
            hands={this.props.boardData.hands}
            declarer={this.props.boardData.declarer}
            play={this.props.play}
          // get_random_play={this.props.get_random_play}
          />
          : <button onClick={this.props.next}>下一局</button>}

        {state === 'playing' && boo ?
          <Cliam
            declarer={this.props.boardData.declarer}
            vacant_trick={vacant_trick}
            claim={this.props.claim} />
          : null}

        {(state === 'claiming' ||
          state === 'claiming.LHO' ||
          state === 'claiming.RHO')
          ? <CliamOK
            claim_ok={this.props.claim_ok}
            declarer={this.props.boardData.declarer}
            state={state} />
          : null
        }
      </div>
    );
  }
}

export default Board;
