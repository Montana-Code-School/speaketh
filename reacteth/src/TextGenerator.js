import React from "react"
import "whatwg-fetch"


export default class TextGenerator extends React.Component {

  state = {
    numOfWords : 0,
    words: ""
  }

  handleClick(){
    fetch('/shake_fill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numOfWords: this.state.numOfWords,
        IWorkOut : true
      })
    })
    .then(result => result.json())
    .then(json => this.setState(json))

  }

  render(){
    return (<div>
        <div>
          How many words do you want? <input onChange={(e)=> this.setState({numOfWords: e.target.value})}/>
          <button onClick={this.handleClick.bind(this)}> Get Words </button>
        </div>
        <div>{this.state.words}</div>
    </div>)


  }
}
