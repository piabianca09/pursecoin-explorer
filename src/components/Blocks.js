import React, {Component} from "react";
import axios from 'axios'
import { Card, Divider } from 'antd';

const BlockList = (props) => {
  const {blocks} = props
  return(
    <div>
    {
      blocks.map(block => 
        <div className="block" key={block.blockHash}>
          <Card title={`Block Hash: ${block.blockHash}`}>
            <p> {block.dateCreated} </p>
            <p> {` Transaction Data Hash: ${block.blockDataHash}`} </p>
            <p> {`Mined by: ${block.minedBy}`} </p>
          </Card>
        </div>
    )
  }
  </div>
  )}

class Blocks extends Component {
  state = {
    blocks: [],
    error: null
  }

  componentWillMount() {
      const node = localStorage.getItem('node')
      const blocksUrl = `${node}/blocks`
      axios.get(blocksUrl)
        .then(response => {
            console.log(response.data.blocks)
          this.setState({blocks: response.data.blocks})
        })
        .catch(err => {
            this.setState({error: err.data})
        })
  }

  render() {
    return (
        <div>
          <Divider orientation="left"><h1>BLOCKS</h1></Divider>
          <BlockList blocks={this.state.blocks}/>
        </div>
  )
  }
}

export default Blocks;
