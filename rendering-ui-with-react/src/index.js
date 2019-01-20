import * as serviceWorker from './serviceWorker';

// import react and react-dom packages
import React from 'react';
import ReactDOM from 'react-dom';

// create a React component
const App = () => {
  return (
    <div className="my-app">
      <h1>
        Hello World!
      </h1>
    </div>
  )
}

// inject the react component to the dom using react-dom
ReactDOM.render(
  <App />,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
