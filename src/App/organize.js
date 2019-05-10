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
    let params1 = { login: 's1', password: '123', role: 'player' }
    // let params1 = { login: 'admin', password: '123', role: false }
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
      args: [[['name', '=', '测试100遍']]],
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
      org_type: 'circle',
      team_ids: [1, 2, 3, 4, 5],
      dates: [
        ['2019-03-15 08:00:00', '2019-03-15 12:00:00'],
        ['2019-03-15 14:00:00', '2019-03-15 18:00:00'],
        ['2019-03-16 08:00:00', '2019-03-16 12:00:00'],
        ['2019-03-16 14:00:00', '2019-03-16 18:00:00'],
        ['2019-03-17 08:00:00', '2019-03-17 12:00:00']
      ],
      time: 60,
      deal_num: 2,
      round_num: 5,
      table_num: [1, 3],
      bye_vp:10,
      bye_imp:10

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

  game_swiss = async () => {
    const vals = {
      name: '积分编排赛',
      org_type: 'swiss',
      team_ids: [1, 2, 3, 4, 5],
      dates: [
        ['2019-03-15 08:00:00', '2019-03-15 12:00:00'],
        ['2019-03-15 14:00:00', '2019-03-15 18:00:00'],
        ['2019-03-16 08:00:00', '2019-03-16 12:00:00']
      ],
      time: 60,
      deal_num: 2,
      round_num: 3,
      table_num: [1, 3],
      bye_vp:10,
      bye_imp:10

    }

    let params = {
      model: 'og.game',
      method: 'game_swiss',
      args: [this.state.game_id, vals],
      kwargs: {}
    };
    let res = await rpc.call(params);
    console.log(res);
  }

  arrange = async () => {
    const vals = {
      no_arrange_team_ids: [1],
      // no_arrange_team_ids: [1],
      host_type: 1,
      arrange_team_rank:[1,5],
      round_id: 7,
      table_num: [1, 3],

    }

    let params = {
      model: 'og.game',
      method: 'arrange',
      // method: 'get_arrange_data',
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
      // args: [2, {partner_id:54,team_id:2,pos:'N'}],
      args: [2, {partner_id:52,team_id:1,pos:'W'}],
      kwargs: {}
    };
    let res = await rpc.call(params);
    console.log(res.result);
  }
  test2 = async () => {
    let params = {
      model: 'og.table',
      method: 'leave',
      // args: [2, {partner_id:54,player_id:4}],
      args: [2, {partner_id:52,player_id:20}],
      // args: [27, {partner_id:46,player_id:12}],
      kwargs: {}
    };
    let res = await rpc.call(params);
    console.log(res);
  }
  test4 = async () => {
    let params = {
      model: 'og.table.player',
      method: 'read',
      args: [2, ['partner_id','online','position']],
      // args: [27, {partner_id:46,player_id:12}],
      kwargs: {}
    };
    let res = await rpc.call(params);
    console.log(res.result);
  }
  test123 = async () => {
    let params = {
      model: 'og.match',
      method: 'read2',
      args: [[1], ['id','name',['table_ids',['id','name',['table_player_ids',['online','position']]]]]],
      // args: [27, {partner_id:46,player_id:12}],
      kwargs: {}
    };
    let res = await rpc.call(params);
    console.log(res.result);
  }
  testuser = async () => {
    let params = {
      model: 'res.users',
      method: 'read',
      args: [12, ['name','login','email','partner_id']],
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
        <button onClick={this.test} >循环赛组织</button><hr />
        <button onClick={this.game_swiss} >积分编排赛组织</button><hr />
        <button onClick={this.test3} >进入牌桌</button><hr />
        <button onClick={this.test2} >离开牌桌</button><hr />
        <button onClick={this.test4} >查看在线状态</button><hr />
        <button onClick={this.arrange} >一轮编排</button><hr />
        <button onClick={this.test123} >测试</button><hr />
        <button onClick={this.testuser} >user</button><hr />
      </div>
    );
  }
}

export default Organize;
