import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Main from './Router';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }
}
  setProperties(){
    fetch('/api/properties')
    .then(response => {
        return response.json();
    })
    .then(response => {
      Object.keys(response).map((item) => 
        sessionStorage.setItem(item, JSON.stringify(response[item]))
      );
    });
  }


  componentDidMount(){
    this.setProperties();
  }
  render() {
    return (
      <BrowserRouter>
        <Route component={Main} />
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<Index/>, document.getElementById('root'));
