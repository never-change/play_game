import React, { Component } from 'react';
import { message } from 'antd';
import RPC from '../Utils/rpc';
import 'antd/dist/antd.css';
import './index2.css';
let options = {
  host: '',
  db: 'TT',
}
let rpc = new RPC(options);

let arr = ['a', 'b', 'c', 'd'];
// let arr = ['a', 'b', 'c', 'd', 'e', 'f',];
let arr1 = [1, 2, 3, 4];
// let arr1 = [1, 2, 3, 4, 'x', 'y'];

class Index extends Component {

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

  createData = async () => {
    arr.forEach(async (item1, index1, array1) => {
      setTimeout(() => this.createTeam(item1, index1 + 1)
        .then(team_id => {

          arr1.forEach(async (item2, index2, array2) => {
            setTimeout(() => this.register(item1, item2)
              .then(user_id => {
                return this.getUser_partner_id(user_id)
              }).then(partner_id => {
                return this.createTeamPlayer(team_id, partner_id, index2)
              }), 1000)
          })

        }), 0)

    })
  }


  register = async (item1, item2) => {
    const params = {
      login: item1 + item2,
      password: '123',
      role: 'player',
      phone: 13550508080,
      email: '123@123.cn'
    }
    const res = await rpc.register(params);
    console.log(res)
    let user_id = res.result;
    user_id = user_id.slice(10, -2);

    return Number(user_id)
  }

  getUser_partner_id = async (user_id) => {
    const params = {
      model: 'res.users',
      method: 'read',
      args: [user_id, ['partner_id']],
      kwargs: {}
    };
    const res = await rpc.call(params);
    console.log(res)
    const partner_id = res.result[0].partner_id[0];
    console.log('getUser_partner_id:::', partner_id);
    return partner_id;
  }

  createTeamPlayer = (team_id, partner_id, index) => {
    let role = 'player';
    if (index === 4) { role = 'leader'; };
    if (index === 5) { role = 'coach'; };
    const vals = {
      team_id: team_id,
      partner_id: partner_id,
      role: role
    }
    const params = {
      model: 'og.team.player',
      method: 'create',
      args: [vals],
      kwargs: {}
    }
    const res = rpc.call(params);
    console.log('createTeamPlayer::::', res);
    return res;
  }

  createGame = async () => {
    let values = {
      'name': '桥牌比赛',
      'notes': '{"host":"宏鸿集团","unit":"石家庄桥牌协会","sunit":"欧德慧通科技有限公司","referee":"张江川","arbitration":"孙玉斌","concet":"张晓春","phone":"13112345678","endtime":"2019.4.27"}',
      'remarks': '这是一条备注信息！！！！'
    }
    let params = {
      model: 'og.game',
      method: 'create',
      args: [values],
      kwargs: {}
    };
    let data = await rpc.call(params);
    let game_id = data.result;
    this.setState({ game_id: game_id });
    console.log('createGame:', this.state.game_id);
  }

  // 审核通过，并修改缴费状态
  payment = async () => {
    let values = {
      'state': 'conformed',
      'paymentStatus': true
    }
    let params = {
      model: 'og.game',
      method: 'write',
      args: [this.state.gama_id, values],
      kwargs: {}
    };
    let data = await rpc.call(params);
    console.log('审核比赛：', data);
  }


  createTeam = async (name, number) => {
    const params = {
      model: 'og.team',
      method: 'create',
      args: [{
        name: name.toUpperCase() + '队',
        number: number,
        game_id: this.state.game_id
      }],
      kwargs: {}
    }
    const res = await rpc.call(params);
    const team_id = res.result;
    console.log('createTeam::::', team_id);
    return team_id;
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

    let params = {
      model: 'res.users',
      method: 'read',
      args: [127, ['partner_id']],
      kwargs: {}
    };
    let res = await rpc.call(params);
    console.log(res.result[0].partner_id[0]);
  }



  render() {
    return (
      <div style={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
        <hr />
        <button onClick={this.createGame} >创建比赛</button><hr />
        <button onClick={this.getGame} >读取gameID</button><hr />
        <button onClick={this.payment} >缴费和审核通过</button><hr />
        <button onClick={this.createData} >创建队伍和报名</button><hr />
        <button onClick={this.test} >TEST</button><hr />
      </div>
    );
  }
}

export default Index;
