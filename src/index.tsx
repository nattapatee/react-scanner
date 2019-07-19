import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'
import {WebTwain} from './WebTwain';
import Dynamsoft from 'dwt';


class App extends Component {
  componentDidMount =()=>{
  
    Dynamsoft.WebTwainEnv.ProductKey = 't0111CQIAAH00/YsKpVpaTe5Xm+s/ZPUSGdou9HrMzQaStCvfRWPehSaMFAFRtaK2kvoJT87hAY2G75GJudN26BinfItJjgP3hCbMzB52jI7e2quxH5P5cxcP9qT4IN/ohDHfkPsfRe/2JBGWRC8cOGWj';
  }
  render() {
    return (<h1> <WebTwain/>
      </h1>)
  }
}

render(<App />, document.getElementById('root'))