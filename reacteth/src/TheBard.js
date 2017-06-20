import React from "react"
import "whatwg-fetch"
const MysteryWordFrequency= require("./lib/MysteryWordFrequency")


export default class TheBard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      words:"hello"
    }

    this.speaketh = this.speaketh.bind(this)


  }
  speaketh(){
    fetch("/Shake_Rap").then((response)=> {
    return(response.json())
  }).then((json) => {
{    this.setState(json)
}  })
  }

  render(){


    return(
      <div>
        <button onClick = {this.speaketh} type = "submit">The Bard Speaketh</button>
        <p>{this.state.words}</p>
      </div>
    )

  }

}
