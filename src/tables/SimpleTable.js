import React, { Component } from 'react'

import { Logo, Tags } from '../displays'

import { getFormattedDate, isOverdue } from './utils'

class Table extends Component {
  render() {
    const { items } = this.props

    return (
      <table className="Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Started</th>
            <th>Ended</th>
            <th>Due</th>
            <th>Overdue?</th>
            <th>Tags</th>
            <th>Important?</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td><Logo logo={item.logo} /></td>
              <td>{item.name}</td>
              <td>{getFormattedDate(item.date_started)}</td>
              <td>{getFormattedDate(item.date_ended)}</td>
              <td>{getFormattedDate(item.date_due)}</td>
              <td>{isOverdue(item) ? 'Yes' : 'No'}</td>
              <td>{item.important ? <Tags tags={item.tags} /> : null}</td>
              <td>{item.important ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Table
