import React from 'react'
import ReactDOM from 'react-dom'
import { Core } from 'react-chunky'
// import { AppContainer } from 'react-hot-loader'
import Component from './src/core/Component'
import Screen from './src/core/Screen'
import App from './src/core/App'
import * as firebase from "firebase"

// if (module.hot) module.hot.accept('./src/core/App', () => renderApp(App))

// <AppContainer>
//   <App {...props}/>
// </AppContainer>,

global.firebase = firebase

export function renderApp(props) {
  const Main = (
  <Core.AppContainer {...props}>
    <App {...props}/>
  </Core.AppContainer>)

  ReactDOM.render(Main, document.getElementById('chunky'))
}

export { Component, Screen, App }
