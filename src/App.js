import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Table from './Table'
import Parser from './Parser'
import Pipeline from './Pipeline'

import ITEMS from './data'

class Clock extends Component {
  constructor(props) {
    super(props)

    this.state = this.getTime()
  }

  componentDidMount() {
    this.startInterval()
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  startInterval = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }

    this.interval = setInterval(() => {
      this.setState(s => ({
        time_left: s.time_left - 1000
      }))
    }, 1000)
  }

  getTime = (reset = false) => {
    let start = !reset && localStorage.getItem('config-rules:start')

    if (start) {
      start = Number(start)
    } else {
      start = Number(Date.now())
      localStorage.setItem('config-rules:start', start)
    }

    const end = start + (30 * 60 * 1000)
    const time_left = end - Number(Date.now())

    return { start, time_left }
  }

  reset = () => {
    this.setState(this.getTime(true))

    this.startInterval()
  }

  render() {
    const { time_left: ms_time_left } = this.state

    const seconds_left = Math.floor(ms_time_left / 1000)

    let display

    if (ms_time_left <= 0) {
      display = 'Time\'s up!'
    } else {
      const sec_left = seconds_left % 60
      const min_left = Math.floor(seconds_left / 60)
      const sec = `${Math.floor(sec_left/10)}${sec_left%10}`
      const min = `${Math.floor(min_left/10)}${min_left%10}`

      display = `${min}:${sec}`
    }

    const safety = seconds_left < (60 * 5) ? 'danger' : 'safe'

    return (
      <h1 className={`App-clock ${safety}`} onClick={this.reset}>
        {display}
      </h1>
    )
  }
}

class Nav extends Component {
  render() {
    const NAV_OPTIONS = ['Home', 'Table', 'Parsing'/*, 'Pipeline'*/]

    const { navTo } = this.props

    return (
      <div className="App-nav">
        {NAV_OPTIONS.map((opt, i) => (
          <button key={opt} className="Nav-button" onClick={() => navTo(i)}>
            {opt}
          </button>
        ))}
      </div>
    )
  }
}

class App extends Component {
  state = {
    nav: 0
  }

  navTo = nav => this.setState({ nav })

  render() {
    const { nav } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <h1>Config, Rules & More</h1>
            <h3>How I learned to stop writing code & start loving data</h3>
          </div>
          <Clock />
        </header>
        <div className="App-body">
          <Nav nav={nav} navTo={this.navTo} />
          <div className="App-content">
            { nav === 0 && (
              <React.Fragment>
                <h1>This talk will cover some concrete examples of how to use config / rules / option based code:</h1>
                <ul>
                  <li>Tables (Data Presentation)</li>
                  <li>HTML Parsing (Serialization / Parsing nested data structures into new formats)</li>
                  {/*<li>Bulk Editing (Pipilines)</li>*/}
                </ul>
                <h4 style={{ marginTop: '40px' }}>Tradeoffs? When? How?</h4>
              </React.Fragment>
            )}
            { nav === 1 && (
              <Table items={ITEMS} />
            )}
            { nav === 2 && (
              <Parser />
            )}
            { nav === 3 && (
              <Pipeline />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
