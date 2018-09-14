import React, { Component } from "react";
import { Card, Timeline } from 'antd';

class Home extends Component {
  state = {
    reverse: true,
  }

  render() {
    return (
      <div>
        <div style={{marginBottom: '30px'}}>
          <Card type="inner" title="LATEST TRANSACTIONS" extra={<a href="/transactions/pending">View More Transactions</a>}>
              <Timeline pending="Fetching..." reverse={this.state.reverse}>
                <Timeline.Item color="green">96aee82859b37843cbb97d731f1b2431de23d5aa9f726feb6dc9675039584138</Timeline.Item>
                <Timeline.Item color="green">96aee82859b37843cbb97d731f1b2431de23d5aa9f726feb6dc9675039584138</Timeline.Item>
                <Timeline.Item color="green">96aee82859b37843cbb97d731f1b2431de23d5aa9f726feb6dc9675039584138</Timeline.Item>
              </Timeline>
          </Card>
        </div>
        <div>
            <Card type="inner" title="LATEST BLOCKS" extra={<a href="/blocks">View More Blocks</a>}>
              <Timeline pending="Fetching..." reverse={this.state.reverse}>
                <Timeline.Item color="red">
                  <p> 547235 </p>
                  <p> Sep 10, 2018 5:12:48 PM </p>
                </Timeline.Item>
                <Timeline.Item color="red">
                  <p> 547236 </p>
                  <p> Sep 10, 2018 5:12:51 PM </p>
                </Timeline.Item>
                <Timeline.Item color="red">
                  <p> 547237 </p>
                  <p> Sep 10, 2018 5:12:53 PM </p>
                </Timeline.Item>
              </Timeline>
            </Card>
        </div>
      </div>
    )
  }
}

export default Home;
