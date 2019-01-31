import React, { Component } from 'react'
import _ from 'lodash'

import { getDefaultSettings, getItemValue } from './utils'

class Table extends Component {
  constructor(props) {
    super(props)

    const settings = getDefaultSettings()

    const column_order = _.keys(settings)

    this.state = {
      settings,
      column_order,
      sort: null,
      sorted_items: props.items
    }
  }

  handleShuffle = () => {
    this.setState({ column_order: _.shuffle(this.state.column_order) })
  }

  handleSort = column  => {
    const should_reverse = this.state.sort === column

    const setting = this.state.settings[column]

    const sorted_items = _.sortBy(this.props.items, getItemValue(setting))

    this.setState({
      sort: column,
      sorted_items: should_reverse ? sorted_items.reverse() : sorted_items
    })
  }

  renderHeader = column => {
    const setting = this.state.settings[column]
    const { sort, label } = setting

    return (
      <th
        key={column}
        style={sort ? { cursor: 'pointer' } : {}}
        onClick={sort ? () => this.handleSort(column) : null}>
        {label}
      </th>
    )
  }

  getColumnColor = (item, setting, value) => {
    if (setting.color) {
      return setting.color
    } else if (setting.getColor) {
      return setting.getColor({ item, value, setting })
    }

    return 'black'
  }

  renderColumn = (item, column) => {
    const setting = this.state.settings[column]

    const value = getItemValue(setting, item)
    const rendered = utils.renderValue(column)
    // const rendered = setting.renderValue ? setting.renderValue({ item, value }) : value
    const style = { color: this.getColumnColor(item, setting, value) }

    return (
      <td key={column} style={style}>
        {rendered}
      </td>
    )
  }

  renderRow = item => {
    const { column_order } = this.state

    return (
      <tr key={item.id}>
        {column_order.map(column => this.renderColumn(item, column))}
      </tr>
    )
  }

  render() {
    const { column_order, sorted_items } = this.state

    return (
      <div>
        <div style={{ float: 'right' }}>
          <button onClick={this.handleShuffle}>Shuffle!</button>
        </div>
        <table className="Table">
          <thead>
            <tr>
              {column_order.map(this.renderHeader)}
            </tr>
          </thead>
          <tbody>
            {sorted_items.map(this.renderRow)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
