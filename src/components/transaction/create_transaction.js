import React, { Component } from "react";
import { Divider, Row, Col, Input, Button, Card } from "antd";
import Wallet from '../../wallet';

class CreateTransaction extends Component {
  state = {
    to:'',
    value: 0,
    fee:0,
    data: '',
    senderSignature: [undefined, undefined]
  };

  sendTransaction() {
    
  }

  signTransaction() {
    const dateCreated = new Date().toISOString()
    const {
        privKey,
        pubAddress,
        pubKey
    } = JSON.parse(localStorage.getItem('walletKeys'))
    const transaction = {
        from: this.state.from,
        to: this.state.to,
        value: this.state.value,
        fee: this.state.fee,
        dateCreated,
        data: this.state.data,
        senderPubKey: pubKey
    }

    const senderSignature = Wallet.signTransaction(transaction, privKey)
    
    this.setState({
        senderSignature
    })
  }

  render() {
    return ( 
      <div>
      <Divider orientation="left"><h1>CREATE TRANSACTION</h1></Divider>
      <Row>
        <Col xs={{ span: 2, offset: 1 }} lg={{ span: 4, offset: 2 }}></Col>
        <Col xs={{ span: 15, offset: 1 }} lg={{ span: 6, offset: 2 }} style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Row>
            <div style={{textAlign: "center"}}>
            </div>
            <div style={{paddingTop: '40px'}}>
              <p>Recipient</p>
              <Input type='text' value={this.state.to} onChange={
                  (ev) => {
                      this.setState({to: ev.target.value})
                  }
              } placeholder='Recipient'/>
            </div>
            <div style={{paddingTop: '40px'}}>
              <p>Value</p>
              <Input type='number' value={this.state.value} onChange={
                  (ev) => {
                      this.setState({value: ev.target.value})
                  }
              } placeholder='10000'/>
            </div>
            <div style={{paddingTop: '40px'}}>
              <p>Fee</p>
              <Input type='number' value={this.state.fee} onChange={
                  (ev) => {
                      this.setState({fee: ev.target.value})
                  }
              } placeholder='300'/>
            </div>
            <div style={{paddingTop: '40px'}}>
              <p>Data</p>
              <Input type='text' value={this.state.data} onChange={
                  (ev) => {
                      this.setState({data: ev.target.value})
                  }
              } placeholder='Data'/>
            </div>
            <div style={{paddingTop: '20px'}}>
              <Button type="primary" block style={{backgroundColor:'#6de7b6'}} onClick={this.signTransaction.bind(this)}>SignTransaction</Button>
            </div>
            {!this.state.senderSignature[0] ? '' : 
                <div>
                    <p>Generated Signature</p>
                    {this.state.senderSignature[0]}, {this.state.senderSignature[1]}
                </div>
             }
            <div style={{paddingTop: '20px'}}>
              <Button type="primary" block style={{backgroundColor:'#6de7b6'}} onClick={this.sendTransaction.bind(this)}>Send Transaction</Button>
            </div>
          </Row>
        </Col>
        <Col xs={{ span: 1, offset: 1 }} lg={{ span: 2, offset: 2 }}></Col>
      </Row>
    </div>
    );
  }
}

export default CreateTransaction;
