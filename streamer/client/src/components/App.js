import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Header from './Header/Header';
import StreamCreate from './StreamCreate/StreamCreate';
import StreamDelete from './StreamDelete/StreamDelete';
import StreamEdit from './StreamEdit/StreamEdit';
import StreamList from './StreamList/StreamList';
import StreamShow from './StreamShow/StreamShow';

class App extends Component {
  render() {
    return (
      <div className="App ui container">
        <Header />
        <BrowserRouter>
          <div className="routes">
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit" exact component={StreamEdit} />
            <Route path="/streams/delete" exact component={StreamDelete} />
            <Route path="/streams/show" exact component={StreamShow} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
