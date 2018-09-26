import React, { Component } from "react";
import { Divider, Row, Col, Input, Button } from "antd";

class Account extends Component {
  state = {};
  render() {
    return ( 
    <div>
      <Divider orientation="left"><h1>Account Info</h1></Divider>
      <Row>
        <Col xs={{ span: 2, offset: 1 }} lg={{ span: 4, offset: 2 }}></Col>
        <Col xs={{ span: 15, offset: 1 }} lg={{ span: 6, offset: 2 }} style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Row>
            <div style={{paddingTop: '40px'}}>
              <Input type='text' placeholder=''/>
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

export default Account;
