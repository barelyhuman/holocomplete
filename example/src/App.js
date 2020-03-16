import React, { Component } from 'react'

import HoloComplete from 'holocomplete'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showComplete:false
    };
  }
  render () {
    const {showComplete}=this.state;
    return (
      <div className="">
        <button onClick={()=>this.setState({showComplete:!showComplete})}>Open HoloComplete</button>
        <HoloComplete data={["hello"]} show={showComplete} onConfirm={(value)=>{console.log(value)}}/>
      </div>
    )
  }
}
