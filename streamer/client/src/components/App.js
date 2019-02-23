import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './../state';

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
      <Provider store={store}>
        <div className="App ui container">
          <BrowserRouter>
            <div className="routes">
              <Header />
              <Route path="/" exact component={StreamList} />
              <Route path="/streams/new" exact render={(props) => <StreamCreate {...props} />} />
              <Route path="/streams/edit" exact component={StreamEdit} />
              <Route path="/streams/delete" exact component={StreamDelete} />
              <Route path="/streams/show" exact component={StreamShow} />
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
