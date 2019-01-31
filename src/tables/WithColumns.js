import React, { Component } from 'react'

import _ from 'lodash'

import { isOverdue, getFormattedDate } from './utils'

class Table extends Component {
  state = {
    columns: ['id', 'logo', 'name', 'tags', 'date_started', 'date_ended', 'date_due', 'overdue', 'important'],
    sort: null,
    sorted_items: this.props.items,
  }

  getColumnLabel = column => {
    const Labels = {
      id: 'ID',
      logo: 'Logo',
      name: 'Name',
      tags: 'Tags',
      date_started: 'Start Date',
      date_ended: 'End Date',
      date_due: 'Due Date',
      important: 'Important?',
      overdue: 'Overdue?'
    }

    return Labels[column] || null
  }

  canSortColumn = column => {
    return ['id', 'name', 'date_started', 'date_ended', 'date_due'].includes(column)
  }

  handleShuffle = () => {
    this.setState({ columns: _.shuffle(this.state.columns) })
  }

  handleSort = column => {
    // TODO
  }

  renderHeader = column => {
    const label = this.getColumnLabel(column)
    const canSort = this.canSortColumn(column)
    const style = canSort ? { cursor: 'pointer' } : {}

    return (
      <th
        key={column}
        onClick={canSort ? () => this.handleSort(column) : null}
        style={style}>
        {label}
      </th>
    )
  }

  getColumnValue = (item, column) => {
    if (column === 'overdue') {
      return isOverdue(item)
    }

    return item[column]
  }

  renderColumnValue = (item, column, value) => {
    if (column === 'overdue' || column === 'important') {
      return value ? 'Yes' : 'No'
    } else if (column.startsWith('date_')) {
      return getFormattedDate(value)
    }

    return value
  }

  getColumnColor = (item, column, value) => {
    switch (column) {
      case 'overdue': return value ? 'red' : 'green'
      case 'important': return value ? 'dark grey' : '#ccc'
      default: return 'black'
    }
  }

  renderColumn = (item, column) => {
    const value = this.getColumnValue(item, column)
    const renderedValue = this.renderColumnValue(item, column, value)

    const style = { color: this.getColumnColor(item, column, value) }

    return (
      <td key={column} style={style}>
        {value}
      </td>
    )
  }

  renderRow = item => {
    const { columns } = this.state

    return (
      <tr key={item.id}>
        {columns.map(column => this.renderColumn(item, column))}
      </tr>
    )
  }

  render() {
    const { columns, sorted_items } = this.state

    return (
      <div>
        <div style={{ float: 'right' }}>
          <button onClick={this.handleShuffle}>Shuffle!</button>
        </div>
        <table className="Table">
          <thead>
            <tr>
              { columns.map(this.renderHeader) }
            </tr>
          </thead>
          <tbody>
            { sorted_items.map(this.renderRow) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
