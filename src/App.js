import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      val: 0
    }
    this.update = this.update.bind(this)
  }
  update(){
    this.setState({val: this.state.val + 1})
  }
  componentWillMount(){
    console.log('componentWillMount')
    this.setState({m:2})
  }
  componentDidMount(){
    console.log('componentDidMount')
    this.inc = setInterval(this.update, 500)
  }
  componentWillUnmount(){
    console.log('componentWillUnMount')
    clearInterval(this.inc)
  }
  render() {
    console.log('render');
    return <button onClick={this.update}>{this.state.val * this.state.m}</button>
  }
}

class Wrapper extends React.Component{
  constructor() {
    super();
    this.state = {increasing: false}
  }
  mount(){
    ReactDOM.render(<App />, document.getElementById('a'))
  }
  unmount(){
    ReactDOM.unmountComponentAtNode(document.getElementById('a'))
  }
  update2() {
    ReactDOM.render(
      <Wrapper val2={this.props.val2+1} />, 
      document.getElementById('root'))
  }
  componentWillReceiveProps(nextProps){
    this.setState({increasing: nextProps.val2 > this.props.val2})
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(`prevProps: ${prevProps.val2}`)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.val2%5===0;
  }
  render(){
    console.log(this.state.increasing)
    return(
      <div>
      a
        <button onClick={this.mount.bind(this)}>Mount</button>
        b
        <button onClick={this.unmount.bind(this)}>UnMount</button>
        c
        <div id="a"/>  
        d
        <hr/>      
        <button onClick={this.update2.bind(this)}>
        -{this.props.val2}-
        </button>
      </div>
    )
  }
}

Wrapper.defaultProps = {val2: 0}

export default Wrapper;
