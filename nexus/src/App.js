import React from 'react';
import './scss/main.scss';
import Printers from './components/Printers';

export default class App extends React.PureComponent {
  render = () => (
      <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand" href="/">FablabPPR print Nexus</a>
        </nav>
        <main role="main" className="container">
          <Printers/>
        </main>
      </>
    )
}
