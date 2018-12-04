import React, { Component } from 'react';
import { Radio, Button } from 'antd';


class BidCard extends Component {
  state = {
  }
  onChange = (e) => {
    this.setState({
      val: e.target.value,
    })
    console.log(e.target.value)
  }
  bidding = () => {
    this.props.bid(this.props.player, this.state.val)
  }

  render() {
    return (
      <div>
        <Radio.Group onChange={this.onChange}>
          <table>
            <tbody>
              <tr>
                <td><Radio.Button value="1NT">1NT</Radio.Button></td>
                <td><Radio.Button value="1S">1S</Radio.Button></td>
                <td><Radio.Button value="1H">1H</Radio.Button></td>
                <td><Radio.Button value="1D">1D</Radio.Button></td>
                <td><Radio.Button value="1C">1C</Radio.Button></td>
              </tr>
              <tr>
                <td><Radio.Button value="2NT">2NT</Radio.Button></td>
                <td><Radio.Button value="2S">2S</Radio.Button></td>
                <td><Radio.Button value="2H">2H</Radio.Button></td>
                <td><Radio.Button value="2D">2D</Radio.Button></td>
                <td><Radio.Button value="2C">2C</Radio.Button></td>
              </tr>
              <tr>
                <td><Radio.Button value="3NT">3NT</Radio.Button></td>
                <td><Radio.Button value="3S">3S</Radio.Button></td>
                <td><Radio.Button value="3H">3H</Radio.Button></td>
                <td><Radio.Button value="3D">3D</Radio.Button></td>
                <td><Radio.Button value="3C">3C</Radio.Button></td>
              </tr>
              <tr>
                <td><Radio.Button value="4NT">4NT</Radio.Button></td>
                <td><Radio.Button value="4S">4S</Radio.Button></td>
                <td><Radio.Button value="4H">4H</Radio.Button></td>
                <td><Radio.Button value="4D">4D</Radio.Button></td>
                <td><Radio.Button value="4C">4C</Radio.Button></td>
              </tr>
              <tr>
                <td><Radio.Button value="5NT">5NT</Radio.Button></td>
                <td><Radio.Button value="5S">5S</Radio.Button></td>
                <td><Radio.Button value="5H">5H</Radio.Button></td>
                <td><Radio.Button value="5D">5D</Radio.Button></td>
                <td><Radio.Button value="5C">5C</Radio.Button></td>
              </tr>
              <tr>
                <td><Radio.Button value="6NT">6NT</Radio.Button></td>
                <td><Radio.Button value="6S">6S</Radio.Button></td>
                <td><Radio.Button value="6H">6H</Radio.Button></td>
                <td><Radio.Button value="6D">6D</Radio.Button></td>
                <td><Radio.Button value="6C">6C</Radio.Button></td>
              </tr>
              <tr>
                <td><Radio.Button value="7NT">7NT</Radio.Button></td>
                <td><Radio.Button value="7S">7S</Radio.Button></td>
                <td><Radio.Button value="7H">7H</Radio.Button></td>
                <td><Radio.Button value="7D">7D</Radio.Button></td>
                <td><Radio.Button value="7C">7C</Radio.Button></td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Radio.Button value="x" className='paved'>X
                </Radio.Button>
                </td>
                <td colSpan={3}>
                  <Radio.Button value="xx" className='paved'>XX
                </Radio.Button>
                </td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <Radio.Button value="Pass" className='paved'>PASS
                </Radio.Button>
                </td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <Button type="primary" block
                    onClick={this.bidding}>确认</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Radio.Group>

      </div>
    );
  }
}
export default BidCard;
