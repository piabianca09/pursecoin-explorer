import React, { Component } from "react";
import { Divider, Row, Col, Input, Button, Card } from "antd";
import Wallet from '../../wallet';

class CreateWallet extends Component {
  state = {
    privKey: '',
    pubKey:'',
    pubAddress: ''
  };

  generateWallet() {
   const privKey = Wallet.generateRandomPrivateKey()
   const pubKey = Wallet.generatePublicKeyFromPrivateKey(privKey)
   const pubAddress = Wallet.generateAddressfromPubKey(pubKey)
   
   const walletKeys = {
    privKey,
    pubKey,
    pubAddress
   }

   localStorage.setItem("walletKeys", JSON.stringify(walletKeys))
   console.log(JSON.parse(localStorage.getItem("walletKeys")))

   this.setState(walletKeys)
  }

  render() {
    return ( 
      <div>
      <Divider orientation="left"><h1>CREATE WALLET</h1></Divider>
      <Row>
        <Col xs={{ span: 2, offset: 1 }} lg={{ span: 4, offset: 2 }}></Col>
        <Col xs={{ span: 15, offset: 1 }} lg={{ span: 6, offset: 2 }} style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Row>
            <img src='../fat_stacks.gif' style={{width: '40vh', height:'40vh'}} alt='fat_stacks'/>
            <div style={{textAlign: "center"}}>
              <h2> Welcome! </h2>
              <p> Creat your own wallet</p>
            </div>
            <div style={{paddingTop: '40px'}}>
              {/* <p> Input Password </p>
              <Input type='password' value={this.state.password} onChange={
                  (ev) => {
                      this.setState({password: ev.target.value})
                  }
              } placeholder='********'/> */}
              {/* <Divider>OR</Divider>
              <p> Input these random mnemonic </p> */}
              <Card>
                  {
                      !this.state.privKey ? 'Generate Private Key Now' :
                      <div>
                        <p>Genrated Random Private Key: {this.state.privKey}</p>
                        <p>Extracted Public Key: {this.state.pubKey}</p>
                        <p>Extracted Public Address: {this.state.pubAddress}</p>
                      </div>
                  }
              </Card>
              {/* <div style={{paddingTop: '20px'}}>
                <textarea style={{resize:'none', width:'273px'}}/>
              </div> */}
            </div>
            <div style={{paddingTop: '20px'}}>
              <Button type="primary" block style={{backgroundColor:'#6de7b6'}} onClick={this.generateWallet.bind(this)}>Generate Wallet</Button>
            </div>
          </Row>
        </Col>
        <Col xs={{ span: 1, offset: 1 }} lg={{ span: 2, offset: 2 }}></Col>
      </Row>
    </div>
    );
  }
}

export default CreateWallet;
