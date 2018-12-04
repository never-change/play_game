import React, { Component } from 'react';
import { Button } from 'antd';
const ButtonGroup = Button.Group;
class ClaimOK extends Component {

  render() {
    const declarer = this.props.declarer || '';
    const arr = ['E', 'S', 'W', 'N'];
    const index = arr.findIndex(itm => itm === declarer);
    const i1 = ((index + 1) % 4);
    const i2 = ((index + 3) % 4);
    const lho = arr[i1];
    const rho = arr[i2];

    return (
      <div>
        <hr />
        {this.props.state === 'claiming.LHO' ? null
          :
          <ButtonGroup>
            <Button
              onClick={() => {
                this.props.claim_ok(lho, 1);
              }}
            >左手同意</Button>
            <Button type="danger"
              onClick={() => {
                this.props.claim_ok(lho, 0);
              }}
            >左手不同意</Button>
          </ButtonGroup>
        }
        <hr />
        {this.props.state === 'claiming.RHO' ? null
          :
          <ButtonGroup>
            <Button
              onClick={() => {
                this.props.claim_ok(rho, 1);
              }}
            >右手同意</Button>
            <Button type="danger"
              onClick={() => {
                this.props.claim_ok(rho, 0);
              }}
            >右手不同意</Button>
          </ButtonGroup>
        }
      </div>
    );
  }
}
export default ClaimOK;