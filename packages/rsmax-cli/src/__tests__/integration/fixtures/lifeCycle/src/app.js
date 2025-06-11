import React from 'react';
import './app.css';

export default class App extends React.Component {
  onShow() {
    console.log('on show');
  }

  onHide() {
    console.log('on hide');
  }

  render() {
    return this.props.children;
  }
}
