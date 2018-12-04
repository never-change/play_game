import React, { Component } from 'react';
// import { odooCall, odooLogin } from '../Utils/request';
import RPC from '../Utils/rpc';
import { LocaleProvider, DatePicker, message } from 'antd';
import Login from './login';
const options = {
  host: '',
  db: 'TT',
}
const rpc = new RPC(options);

class Test extends Component {
  state = {
    resData: null,
    doing_table_ids: null,
    board_ids: null,
    doing_board_id:null,
  }

  login = async () => {
    const params = {
      login: '101',
      password: '101.101',
    }
    const data = await rpc.login(params);
    if (!data.code) {
      // 把数据临时存入state以便显示
      this.setState({ resData: data.result });
      alert(`${data.result.name} 登录成功！`)
    }
  }

  getUserData = async () => {
    const uid = rpc.uid;
    const fields = ["name",
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
    this.setState({
      resData: data.result,
      doing_table_ids: data.result[0].doing_table_ids[0],
    });
  }

  getTableData = async () => {
    const doing_table_ids = this.state.doing_table_ids;
    const fields = [
      "name",
      "number",
      "room_type",
      "match_id",
      "game_id",
      "round_id",
      "phase_id",
      "schedule_id",
      "schedule_number",
      "state",
      "date_from",
      "date_thru",
      "deal_ids",
      "board_ids",
      "doing_board_id",
      "ns_team_id",
      "ew_team_id",
      "player_ids",
      "east_id",
      "west_id",
      "north_id",
      "south_id"]
    const params = {
      model: 'og.table',
      method: 'read',
      args: [doing_table_ids, fields],
      kwargs: {}
    };
    const data = await rpc.call(params);

    this.setState({
      resData: data.result,
      board_ids: data.result[0].board_ids,
    });
  }


  getBoardData = async () => {
    const board_ids = this.state.board_ids;
    const fields = [
      "name",
      "deal_id",
      "table_id",
      "round_id",
      "phase_id",
      "game_id",
      "match_id",
      "host_id",
      "guest_id",
      "number",
      "vulnerable",
      "dealer",
      "hands",
      "sequence",
      "declarer",
      "contract",
      "openlead",
      "result",
      "ns_point",
      "ew_point",
      "host_imp",
      "guest_imp",
      "auction",
      "tricks",
      "last_trick",
      "current_trick",
      "ns_win",
      "ew_win",
      "claimer",
      "claim_result",
      "player",
      "state",
    ]
    const params = {
      model: 'og.board',
      method: 'read',
      args: [board_ids, fields],
      kwargs: {}
    };
    const data = await rpc.call(params);

    const data0 = data.result;
    // 对数据进行过滤，只取state为bidding的board数据
    const data1 = data0.filter((da) => da.state === 'bidding');
    // 过滤后的数据按number排序
    data1.sort((a, b) => a.number - b.number);
    // 取第一条数据，即为当前正在进行的牌
    const data2 = data1[0]
    // 整理数据为便于理解的格式
    const data3 = {
      'deal': data2.number + ' , ' + data2.vulnerable + ' , ' + data2.dealer,
      'hands': data2.hands,
      'auction': data2.auction,
      'contract': data2.declarer + ' , ' + data2.contract + ' , ' + data2.openlead,
      'win': data2.ns_win + ' , ' + data2.ew_win,
      'tricks': data2.tricks,
      'tricks': data2.last_trick + ' , ' + data2.current_trick,
      'result': data2.result + ' , ' + data2.point + ' , ' + data2.ns_point + ' , ' + data2.ew_point,
      'state,player': data2.state + ' , ' + data2.player,
    }
    this.setState({
      resData: data3,
      doing_board_id:data2.id,
    });
  }

  
  // 叫牌，参数是：方位，叫品（都是字符串）
  bid = async (f,j) => {
    const params = {
      model: 'og.board',
      method: 'bid',
      args: [this.state.doing_board_id,f,j],
      kwargs: {}
    };
    const data = await rpc.call(params);
    console.log('bid...', data)
    this.getBoardData();
  }

  handClick = async () => {
    const domin = [['id', '>=', 0]];
    const fields = ['name'];
    const params = {
      model: 'og.game',
      method: 'search_read',
      args: [domin, fields],
      kwargs: {}
    };
    const data = await rpc.call(params);
    console.log('click,', rpc.sid)
    console.log('click...', data)
  }

  render() {
    return (
      <div>
        <Login />
        
        {/* <hr></hr>
        <div style={{ width: 200, margin: 'auto' }}>
          <button style={{ width: '50%' }}
            onClick={this.login}>
            牌手登录
            </button>
        </div>
        <hr></hr>
        <div style={{ width: 250, margin: 'auto' }}>
          <button style={{ width: '50%' }}
            onClick={this.getUserData} >
            获取用户信息
            </button>
          <button style={{ width: '50%' }}
            onClick={this.getTableData} >
            获取牌桌信息
            </button>
          <button style={{ width: '50%' }}
            onClick={this.getBoardData} >
            获取board信息
            </button>
          <button style={{ width: '50%' }}
            onClick={()=>this.bid('N','3H')} >
            （北）叫牌
            </button>
        </div>
        <hr></hr>
        <div>{JSON.stringify(this.state.resData)}</div> */}

      </div>
    );
  }
}

export default Test;
