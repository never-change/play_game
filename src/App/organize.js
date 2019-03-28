import React, { Component } from 'react';
import { message } from 'antd';
import RPC from '../Utils/rpc';
import 'antd/dist/antd.css';

let options = {
  host: '',
  db: 'TT',
}
let rpc = new RPC(options);

class Organize extends Component {

  componentWillMount() {
    this.login();
  }

  // 登录，获取sid,uid
  login = async () => {
    let params1 = { login: 'admin', password: '123', role: false }
    let data = await rpc.login(params1);
    if (data.code || data.result.status !== 'ok') {
      message.error('大哥，您的机票飞到了火星！！！')
    }
    console.log('LoginResponse:', data);
  }


  getGame = async () => {
    const res = await rpc.call({
      model: 'og.game',
      method: 'search',
      args: [[['name', '=', '桥牌比赛']]],
      kwargs: {}
    });
    const game_id = res.result[0];
    this.setState({ game_id: game_id });
    console.log('getGame:::', res);
    console.log(this.state.game_id)
  }

  test = async () => {
    const vals = {
      name: '小组赛',
      org_type: 'swiss',
      team_ids: [1, 2, 3, 4],
      dates: [
        ['2019-03-15 08:00:00', '2019-03-15 12:00:00'],
        ['2019-03-15 14:00:00', '2019-03-15 18:00:00'],
        ['2019-03-16 08:00:00', '2019-03-16 12:00:00']
      ],
      time: 60,
      deal_num: 12,
      round_num: 3,
      table_num: [1, 3],

    }

    let params = {
      model: 'og.game',
      method: 'game_circle',
      args: [this.state.game_id, vals],
      kwargs: {}
    };
    let res = await rpc.call(params);
    console.log(res);
  }

  test3 = async () => {
    let params = {
      model: 'og.table',
      method: 'sit_down',
      args: [27, {partner_id:49,team_id:2,pos:'S'}],
      kwargs: {}
    };
    let res = await rpc.call(params);
    console.log(res.result);
  }
  test2 = async () => {
    let params = {
      model: 'og.table',
      method: 'leave',
      args: [27, {partner_id:47,player_id:13}],
      // args: [27, {partner_id:46,player_id:12}],
      kwargs: {}
    };
    let res = await rpc.call(params);
    console.log(res.result);
  }
  test4 = async () => {
    let params = {
      model: 'og.table.player',
      method: 'read',
      args: [20, ['partner_id','online','position']],
      // args: [27, {partner_id:46,player_id:12}],
      kwargs: {}
    };
    let res = await rpc.call(params);
    console.log(res.result);
  }



  render() {
    return (
      <div style={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
        <hr />
        <button onClick={this.getGame} >读取gameID</button><hr />
        <button onClick={this.test} >赛事组织测试</button><hr />
        <button onClick={this.test3} >进入牌桌</button><hr />
        <button onClick={this.test2} >离开牌桌</button><hr />
        <button onClick={this.test4} >查看在线状态</button><hr />
      </div>
    );
  }
}

export default Organize;
