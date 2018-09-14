import React from "react";
import { Card, Divider } from 'antd';

const items = [
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

const Items = () => {
  return(
    <div>
    {
      items.map( item => 
        <div className="block">
          <Card title={`Block Number: ${item.number}`}>
            <p> {item.timestamp} </p>
            <p> {`${item.transactions} transactions`} </p>
            <p> {`${item.size} bytes`} </p>
          </Card>
        </div>
    )
  }
  </div>
  )}

const Blocks = () =>  {
  return (
      <div>
        <Divider orientation="left"><h1>BLOCKS</h1></Divider>
        <Items />
      </div>
)}

export default Blocks;
