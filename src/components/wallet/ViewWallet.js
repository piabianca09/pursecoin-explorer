import React, { Component } from "react";
import { Divider, Row, Col, Input, Button } from "antd";

class ViewWallet extends Component {
  state = {};
  render() {
    return ( 
    <div>
      <Divider orientation="left"><h1>VIEW WALLET</h1></Divider>
      <Row>
        <Col xs={{ span: 2, offset: 1 }} lg={{ span: 4, offset: 2 }}></Col>
        <Col xs={{ span: 15, offset: 1 }} lg={{ span: 6, offset: 2 }} style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Row>
            <img src='../fat_stacks.gif' style={{width: '40vh', height:'40vh'}} alt='fat_stacks'/>
            <div style={{textAlign: "center"}}>
              <h2> Welcome back! </h2>
              <p> Please login your account </p>
            </div>
            <div style={{paddingTop: '40px'}}>
              <Input type='password' placeholder='********'/>
            </div>
            <div style={{paddingTop: '20px'}}>
              <Button type="primary" block style={{backgroundColor:'#6de7b6'}}>LOG IN</Button>
            </div>
          </Row>
        </Col>
        <Col xs={{ span: 1, offset: 1 }} lg={{ span: 2, offset: 2 }}></Col>
      </Row>
    </div>
    );
  }
}

export default ViewWallet;
