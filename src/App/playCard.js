import React, { Component } from 'react';
import { Radio, Button } from 'antd';


class PlayCard extends Component {
  state = {
  }
  onChange_N = (e) => {
    this.setState({
      player: 'N',
      val: e.target.value,
    })
  }
  onChange_E = (e) => {
    this.setState({
      player: 'E',
      val: e.target.value,
    })
    console.log(this.state)
  }
  onChange_S = (e) => {
    this.setState({
      player: 'S',
      val: e.target.value,
    })
    console.log(this.state)
  }
  onChange_W = (e) => {
    this.setState({
      player: 'W',
      val: e.target.value,
    })
    console.log(this.state)
  }
  play = () => {
    this.props.play(this.state.player, this.state.val)
    // this.props.get_random_play()   //随机获取可以打的牌
    // console.log('playing.................')
    // console.log(this.state.player,this.state.val)
  }

  render() {

    const declarer = this.props.declarer || null;
    const data = this.props.hands || [];
    const dataN = data[1];
    const dataE = data[2];
    const dataS = data[3];
    const dataW = data[0];
    // const dataS = data[0];
    // const dataW = data[1];
    // const dataN = data[2];
    // const dataE = data[3];

    var N = '';
    var E = '';
    var S = '';
    var W = '';

    if (dataN) {
      N = (<Radio.Group
        onChange={declarer === 'S' ? this.onChange_S : this.onChange_N}>
        {dataN.map((item, index) => {
          return (
            <Radio.Button value={item} key={index}>{item}</Radio.Button>
          );
        })}
      </Radio.Group>);
      E = (<Radio.Group
        onChange={declarer === 'W' ? this.onChange_W : this.onChange_E}>
        {dataE.map((item, index) => {
          return (
            <Radio.Button value={item} key={index}>{item}</Radio.Button>
          );
        })}
      </Radio.Group>);
      S = (<Radio.Group
        onChange={declarer === 'N' ? this.onChange_N : this.onChange_S}>
        {dataS.map((item, index) => {
          return (
            <Radio.Button value={item} key={index}>{item}</Radio.Button>
          );
        })}
      </Radio.Group>);
      W = (<Radio.Group
        onChange={declarer === 'E' ? this.onChange_E : this.onChange_W}>
        {dataW.map((item, index) => {
          return (
            <Radio.Button value={item} key={index}>{item}</Radio.Button>
          );
        })}
      </Radio.Group>);
    }

    return (
      <div>
        <table>
          <tbody>
            <tr><td>N:</td><td>{N}</td></tr>
            <tr><td>E:</td><td>{E}</td></tr>
            <tr><td>S:</td><td>{S}</td></tr>
            <tr><td>W:</td><td>{W}</td></tr>
            <tr>
              <td colSpan={2}><Button type="primary" block
                onClick={this.play}
                disabled={this.props.isBidding}
              >确认</Button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default PlayCard;
