import React from 'react';
import { Router } from "@reach/router"

import './scss/main.scss';
import Printers from './components/Printers';
import CurrentPrinterNavBar from './containers/CurrentPrinterNavBar';
import Printer from './containers/Printer';

export default class App extends React.PureComponent {
  render = () => (
      <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand" href="/">Print nexus</a>
          <CurrentPrinterNavBar />
        </nav>
        <Router>
          <Printers path="/"/>
          <Printer path="/p/:id"/>
        </Router>
      </>
    )
}
