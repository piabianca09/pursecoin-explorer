import React, { Component } from "react";
import { Divider, Row, Col, Input, Button } from "antd";
import axios from 'axios'

class Balance extends Component {
    constructor() {
        super()
        this.state = {
            address: '',
            balance: 0,
            error: null,
            isLoading: false,
            isClicked: false
        };

        const pubAddress = JSON.parse(localStorage.getItem('walletKeys')).pubAddress
        console.log(pubAddress)
        if(pubAddress) {
            this.state.address = pubAddress
        }
    }


    checkBalance() {
        this.setState({isLoading: true, isClicked:true})
        const node = localStorage.getItem('node')
        
        const balanceUrl = `${node}/balance/confirmed/${this.state.address}`
        axios.get(balanceUrl).then(res => {
            this.setState({balance: res.data.confirmedBalance, isLoading: false, error: null})

        }).catch(err => {
            this.setState({error: err.response.data.error, isLoading: false})
        })
    }

    printBalance() {
        if(this.state.error) {
            return `Your current balance is: 0`
        } 

        return `Your current balance is: ${this.state.balance}`
    }
 
  render() {
    return ( 
    <div>
      <Divider orientation="left"><h1>Balance</h1></Divider>
      <Row>
        <Col xs={{ span: 2, offset: 1 }} lg={{ span: 4, offset: 2 }}></Col>
        <Col xs={{ span: 15, offset: 1 }} lg={{ span: 6, offset: 2 }} style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Row>
            <div style={{paddingTop: '40px'}}>
              {this.state.isClicked ? this.state.isLoading ? <p>....Loading</p> : <p>{this.printBalance()}</p>
              : ''}
              <Input type='text' value={this.state.address} placeholder='balance' onChange={(val) => {
                  this.setState({address: val.target.value})
              }}/>
            </div>
            <div style={{paddingTop: '20px'}}>
              <Button type="primary" block style={{backgroundColor:'#6de7b6'}} onClick={this.checkBalance.bind(this)}>Check Balance</Button>
            </div>
          </Row>
        </Col>
        <Col xs={{ span: 1, offset: 1 }} lg={{ span: 2, offset: 2 }}></Col>
      </Row>
    </div>
    );
  }
}

export default Balance;
