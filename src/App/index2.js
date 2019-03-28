import React, { Component } from 'react';
import { message } from 'antd';
import RPC from '../Utils/rpc';
import Login1 from './login';
import Board from './board';
import 'antd/dist/antd.css';
import './index2.css';
const options = {
  host: '',
  db: 'TT',
}
const rpc = new RPC(options);

class Index2 extends Component {
  state = {
    isLogin: false,
  }

  // 登录，获取sid,uid
  login = async (params) => {
    // const params = {
    //   login: '101',
    //   password: '101.101',
    // }
    const params1 = { ...params, role: 'player' }
    const data = await rpc.login(params1);
    if (!data.code && data.result.status === 'ok') {
      this.setState({
        isLogin: true,
      })
      this.getUserData();
    } else {
      message.error('大哥，您的机票飞到了火星！！！')
    }
    console.log('LoginResponse:', data);
  }

  // 获取用户信息，doing_table_id
  getUserData = async () => {
    const uid = rpc.uid;
    const fields = [
      "name",
      "login",
      "todo_table_ids",
      "done_table_ids",
      "doing_table_ids"];
    const params = {
      model: 'res.users',
      method: 'read',
      args: [uid, fields],
      kwargs: {}
    };
    const data = await rpc.call(params);
    console.log('getUserResponse:', data)
    if (!data.code) {
      const res = data.result[0];
      this.setState({
        doing_table_id: res.doing_table_ids[0],
      });
      this.getTableData();
    }

  }

  // 获取牌桌信息，board_ids(所有牌桌)
  getTableData = async () => {
    const doing_table_id = this.state.doing_table_id;
    const fields = [
      "name", "number", "room_type", "match_id",
      "game_id", "round_id", "phase_id", "schedule_id",
      "schedule_number", "state", "date_from", "date_thru",
      "deal_ids", "board_ids", "doing_board_id", "ns_team_id",
      "ew_team_id", "player_ids", "east_id", "west_id",
      "north_id", "south_id"]
    const params = {
      model: 'og.table',
      method: 'read',
      args: [doing_table_id, fields],
      kwargs: {}
    };
    const data = await rpc.call(params);
    console.log('getTableResponse:', data);

    if (!data.code) {
      const res = data.result[0];
      this.setState({
        board_ids: res.board_ids,
        room_type: res.room_type,
      });
      this.getBoardData();
    }
  }


  // 获取牌的信息，牌局最新状态
  getBoardData = async () => {
    const board_ids = this.state.board_ids;
    const fields = [
      "name", "deal_id", "table_id", "round_id",
      "phase_id", "game_id", "match_id", "host_id",
      "guest_id", "number", "vulnerable", "dealer",
      "hands", "sequence", "declarer", "contract",
      "openlead", "result", "ns_point", "ew_point",
      "host_imp", "guest_imp", "auction", "tricks",
      "last_trick", "current_trick", "ns_win", "ew_win",
      "claimer", "claim_result", "player", "state",
    ]
    const params = {
      model: 'og.board',
      method: 'read',
      args: [board_ids, fields],
      kwargs: {}
    };
    const data = await rpc.call(params);
    console.log('getBoardResponse:', data);

    const data0 = data.result;
    // 对数据进行过滤，只取state为bidding的board数据
    const data1 = data0.filter((da) => da.state !== 'draft' && da.state !== 'done' && da.state !== 'cancel');
    // 过滤后的数据按number排序
    data1.sort((a, b) => a.number - b.number);
    // 取第一条数据，即为当前正在进行的牌
    const data2 = data1[0]
    // 整理数据为便于理解的格式
    const data3 = {
      'hands': JSON.parse(data2.hands),
      'state': data2.state,
      'player': data2.player,
      'vulnerable': data2.vulnerable,   //局况
      'dealer': data2.dealer,    //发牌人
      'auction': data2.auction,   //叫牌过程
      'declarer': data2.declarer,   //庄家
      'contract': data2.contract,   //定约
      'openlead': data2.openlead,  //首功
      'trick': data2.tricks,  //打牌过程
      'ns_win': data2.ns_win,  //南北赢
      'ew_win': data2.ew_win,  //东西赢
      'result': data2.result + ' , ' + data2.point
        + ' , ' + data2.ns_point + ' , ' + data2.ew_point,
    }
    console.log(data3)
    this.setState({
      resData: data3,
      doing_board_id: data2.id,
      title:
        `${data2.game_id[1]} 
      ${data2.round_id[1]} 
      第${data2.number}副牌 
      ${data2.host_id[1]}VS${data2.guest_id[1]} 
      ${this.state.room_type}`,
      ...data3
    });
  }


  // 叫牌，参数是：方位，叫品（都是字符串）
  bid = async (player, card) => {
    const arg = card.substr(1, 1) === "D" ?
      [this.state.doing_board_id, player, card, 'True', '这是一个约定叫'] :
      [this.state.doing_board_id, player, card, 'False', '这不是约定叫']
    const params = {
      model: 'og.board',
      method: 'bid',
      // args: [this.state.doing_board_id, player, card],
      args: arg,
      // args: [this.state.doing_board_id, player, card,'False','这不是约定叫'],
      kwargs: {}
    };
    const data = await rpc.call(params);
    if (data.result === 0) {
      this.getBoardData();
    } else {
      message.error('老兄，你的叫牌方法不是地球的吧？')
    }
    // console.log('bid...', data)
  }
  // 叫牌，参数是：方位，叫品（都是字符串）
  play = async (player, card) => {
    const params = {
      model: 'og.board',
      method: 'play',
      args: [this.state.doing_board_id, player, card],
      kwargs: {}
    };
    const data = await rpc.call(params);
    if (data.result === 0) {
      this.getBoardData();
    } else {
      message.error('兄弟，牌不是这样出的，回家再学学？')
    }
    // this.getBoardData();
  }

  // 摊牌 claimer只能是庄家
  claim = async (claimer, number) => {
    const params = {
      model: 'og.board',
      method: 'claim',
      args: [this.state.doing_board_id, claimer, number],
      kwargs: {}
    };
    const data = await rpc.call(params);
    if (data.result === 0) {
      this.getBoardData();
    } else {
      message.error('月球的摊牌是这样的？')
    }
  }

  // 同意/不同意 摊牌 (number=1表示同意)
  claim_ok = async (claimer, number) => {
    const params = {
      model: 'og.board',
      method: 'claim_ack',
      args: [this.state.doing_board_id, claimer, number],
      kwargs: {}
    };
    const data = await rpc.call(params);
    if (data.result === 0) {
      this.getBoardData();
    } else {
      message.error('这操作有点看不懂？')
    }
  }

  // 下一局
  next = async () => {
    const params = {
      model: 'og.board',
      method: 'write',
      args: [this.state.doing_board_id, { state: 'done' }],
      kwargs: {}
    };
    const data = await rpc.call(params);
    console.log(data)
    if (data.result === true) {
      this.getBoardData();
    } else {
      message.error('????????')
    }
  }

  // 随机获取当前可打的牌，测试用
  get_random_play = async () => {
    const params = {
      model: 'og.board',
      method: 'get_random_play',
      args: [this.state.doing_board_id],
      kwargs: {}
    };
    const data = await rpc.call(params);
    console.log('get_random_play...', data)
  }


  render() {
    return (
      <div>
        {this.state.isLogin ?
          <Board
            out={() => { this.setState({ isLogin: false }) }}
            boardData={this.state}
            bid={this.bid}
            play={this.play}
            // get_random_play={this.get_random_play}
            claim={this.claim}
            claim_ok={this.claim_ok}
            next={this.next}
          />
          :
          <Login1 login={this.login} />
        }

      </div>
    );
  }
}

export default Index2;
