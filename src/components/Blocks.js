import React, { Component } from "react";
import { List, Card, Divider } from 'antd';

const data = [
  {
    key: "1",
    number: 547237,
    timestamp: "Sep 10, 2018 5:12:53 PM",
    transactions: 27,
    size: 7302
  },
  {
    key: "2",
    number: 547236,
    timestamp: "Sep 10, 2018 5:12:51 PM",
    transactions: 5,
    size: 16884
  },
  {
    number: 547235,
    timestamp: "Sep 10, 2018 5:12:48 PM",
    transactions: 50,
    size: 48955
  }
];

class Blocks extends Component {
  state = {};
  render() {
    return (
      <div>
        <Divider orientation="left"><h1>BLOCKS</h1></Divider>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Card title={`Block Number: ${item.number}`}>
                  <p> {item.timestamp} </p>
                  <p> {`${item.transactions} transactions`} </p>
                  <p> {`${item.size} bytes`} </p>
                </Card>
              </List.Item>
            )} 
          />
      </div>
    );
  }
}

export default Blocks;
