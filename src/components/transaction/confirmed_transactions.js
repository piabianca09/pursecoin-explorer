import React, { Component } from "react";
import { Table, Divider, Tag } from "antd";

const columns = [
  {
    title: "Hash",
    dataIndex: "hash",
    key: "hash",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp"
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value"
  }
];

const data = [
  {
    key: "1",
    hash: '8a684cb8491ee419e7d46a0fd2438cad82d1278c340b5d01974e7beb6b72ecc2',
    timestamp: "Sep 10, 2018 5:12:53 PM",
    value: 700000
  },
  {
    key: "2",
    hash: "163b49c50ceb21f076fbb65774824b77effdff82af0c48da1df43123a30b8621",
    timestamp: "Sep 10, 2018 5:12:51 PM",
    value: 5000020,
  },
  {
    key: "3",
    hash: "ca7f9476b4b388cb7bdf74b56883cd280c7eb0670f0afbe48f9b01d4ee111483",
    timestamp: "Sep 10, 2018 5:12:51 PM",
    value: 500000
  }
];

class ConfirmedTransactions extends Component {
  state = {};
  render() {
    return (
      <div>
        <Divider orientation="left"><h1>CONFIRMED TRANSACTIONS</h1></Divider>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default ConfirmedTransactions;
