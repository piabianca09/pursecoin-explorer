import React, { Component } from "react";
import { Divider, Input, Icon, Button, Row, Col, message } from "antd";

class Faucet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ethAddress: '',
    };
  }

  emitEmpty = () => {
    this.ethAddressInput.focus();
    this.setState({ ethAddress: '' });
  }

  onChangeEthAdd = (e) => {
    this.setState({ ethAddress: e.target.value });
  }
  state = {};
  render() {
    const { ethAddress } = this.state;
    const suffix = ethAddress ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    const success = () => {
      message.success('Check your wallet!');
    };
    return ( 
    <div>
      <Divider orientation="left"><h1>FAUCET</h1></Divider> 
      <Input
        placeholder="Enter your ethereum address"
        prefix={<Icon type="money-collect" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={suffix}
        value={ethAddress}
        onChange={this.onChangeEthAdd}
        ref={node => this.ethAddressInput = node}
      />
      <div style={{paddingTop: '10px'}}>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>        
            <Button type="primary" block onClick={success}>CLAIM</Button>
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
    </div>
    );
  }
}

export default Faucet;
