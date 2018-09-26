import React, { Component } from "react";
import { Table, Divider } from "antd";
import axios from 'axios'

const columns = [
  {
    title: "Transaction Data Hash",
    dataIndex: "transactionDataHash",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Date Created",
    dataIndex: "dateCreated",
  },
  {
    title: "Value",
    dataIndex: "value",
  }
];

class ConfirmedTransactions extends Component {
  state = {
      transactions:[],
      error:null
  };

  componentWillMount() {
    const node = localStorage.getItem('node')
    const confirmedTransactionUrl = `${node}/transaction/confirmed`
    axios.get(confirmedTransactionUrl)
        .then(response => {
            const transactions = Object.keys(response.data.confirmedTransactions)
                .map(data => response.data.confirmedTransactions[data])
            this.setState({transactions})
        })
        .catch(error => this.setState({error: error.data}))
  }

  render() {
    return (
      <div>
        <Divider orientation="left"><h1>CONFIRMED TRANSACTIONS</h1></Divider>
        <Table columns={columns} rowKey="transactionDataHash" dataSource={this.state.transactions} />
      </div>
    );
  }
}

export default ConfirmedTransactions;
