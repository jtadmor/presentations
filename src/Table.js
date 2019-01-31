import React, { Component } from 'react'

import SimpleTable from './tables/SimpleTable'
import WithColumns from './tables/WithColumns'
import WithConfig from './tables/WithConfig'

import './Table.css'


class TableWrapper extends Component {
  state = {
    display: 'simple'
  }

  renderTable() {
    switch (this.state.display) {
      case 'simple': return <SimpleTable {...this.props} />
      case 'columns': return <WithColumns {...this.props} />
      case 'config': return <WithConfig {...this.props} />
      default: return null
    }
  }

  render() {
    return (
      <div>
        <div style={{ float: 'right' }}>
          <button onClick={() => this.setState({ display: 'simple' })}>Simple</button>
          <button onClick={() => this.setState({ display: 'columns' })}>Middle</button>
          <button onClick={() => this.setState({ display: 'config' })}>Config</button>
        </div>
        <h4>
          Projects
        </h4>
        { this.renderTable() }
      </div>
    )   
  }
}

export default TableWrapper

