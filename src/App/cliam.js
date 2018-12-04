import React, { Component } from 'react';
import { Modal, Button, Radio, message } from 'antd';
const RadioGroup = Radio.Group;

class Cliam extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    if (this.state.value) {
      this.props.claim(this.props.declarer, this.state.value);
    } else {
      message.error('你倒是说你要cliam几墩啊！')
    }
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const n = this.props.vacant_trick
    let c_trick = Array.from({ length: n }).map((v, k) => {
      return <Radio value={k + 1} key={k}>{k + 1}</Radio>
    });
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          庄家cliam
        </Button>
        <Modal
          title="请选择要cliam的墩数"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={0}>0</Radio>
            {c_trick}
          </RadioGroup>
        </Modal>
      </div>
    );
  }
}

export default Cliam;