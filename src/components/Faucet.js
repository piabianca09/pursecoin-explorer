import React, { Component } from "react";
import { Divider, Input, Icon, Button, Row, Col, message } from "antd";
import FaucetConfig from '../FaucetConfig'
import axios from 'axios'
import Wallet from '../wallet'

class Faucet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }

  emitEmpty = () => {
    this.addressInput.focus();
    this.setState({ address: '' });
  }

  onChangeEthAdd = (e) => {
    this.setState({ address: e.target.value });
  }

  render() {
    const { address } = this.state;
    const suffix = address ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    const success = () => {
        const node = localStorage.getItem('node')
        const sendTransactionUrl = `${node}/transaction`

        let transaction = {
            from: FaucetConfig.faucetAddress,
            to: this.state.address,
            value: FaucetConfig.defaultValue,
            fee: FaucetConfig.faucetFee,
            dateCreated: new Date().toISOString(),
            data: FaucetConfig.faucetData,
            senderPubKey: FaucetConfig.faucetPublicKey,
        }

        transaction.senderSignature = Wallet.signTransaction(transaction, FaucetConfig.faucetPrivateKey)
        console.log(transaction)
        axios.post(sendTransactionUrl, transaction)
            .then(res => {
                console.log(res.data)
                message.success('Check your wallet!');
            })
            .catch(err => console.log(err))
    };
    return ( 
    <div>
      <Divider orientation="left"><h1>FAUCET</h1></Divider> 
      <Input
        placeholder="Enter your ethereum address"
        prefix={<Icon type="money-collect" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={suffix}
        value={address}
        onChange={this.onChangeEthAdd}
        ref={node => this.addressInput = node}
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
