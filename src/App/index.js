import React, { Component } from 'react';
import { odooCall, odooLogin } from '../Utils/request';

class Index extends Component {
  state = {
    game_id: 1
  }
  handClick = () => {
    odooCall();
    console.log(456465)
  }
  login = () => {
    const params = {
      login: 'admin',
      password: '123',
      type: 'account'
    }
    odooLogin(params);
  }
  render() {
    return (
      <div>
        <hr></hr>
        <div style={{ width: 200, margin: 'auto' }}>
          <button style={{ width: '50%' }}
            onClick={this.login}>
            登录
            </button>
        </div>
        <hr></hr>
        <div style={{ width: 200, margin: 'auto' }}>
          <button style={{ width: '50%' }}
            onClick={this.handClick} >
            创建比赛
            </button>
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default Index;
