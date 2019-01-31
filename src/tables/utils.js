import React from 'react'
import moment from 'moment'
import _ from 'lodash'


import { Logo, Tags } from '../displays'


export function getDefaultSettings() {
  return {
    id: {
      key: 'id',
      label: 'ID',
      sort: true,
    },

    logo: {
      key: 'logo',
      label: 'Logo',
      // renderValue: true
      renderValue: ({ value }) => (<Logo logo={value} />)
    },

    name: {
      key: 'name',
      label: 'Name',
      sort: true,
    },

    tags: {
      key: 'tags',
      label: 'Tags',
      renderValue: ({ value }) => (<Tags tags={value} />)
    },

    date_started: {
      key: 'date_started',
      label: 'Start Date',
      renderValue: ({ value }) => getFormattedDate(value),
      sort: true,
    },

    date_ended: {
      key: 'date_ended',
      label: 'End Date',
      renderValue: ({ value }) => getFormattedDate(value),
      sort: true,
    },

    date_due: {
      key: 'date_due',
      label: 'Due Date',
      renderValue: ({ value }) => getFormattedDate(value),
      sort: true,
    },

    overdue: {
      key: 'overdue',
      label: 'Overdue',
      getValue: isOverdue,
      renderValue: ({ item, value }) => value ? 'Yes' : 'No',
      getColor: ({ item, value }) => value ? 'red' : 'green',
      sort: true,
    },

    important: {
      key: 'important',
      label: 'Important?',
      renderValue: ({ item, value }) => value ? 'Yes' : 'No',
      getColor: ({ item, value }) => value ? 'dark grey' : '#ccc',
      getStyle: ({ item, value }) => ({
        color: value ? 'dark grey' : '#ccc'
      })
    }
  }
}


export const getItemValue = _.curry((setting, item) => {
  return setting.getValue ? setting.getValue(item) : item[setting.key]
})


export function getFormattedDate(date) {
  return date ? moment(date).format('ll') : null
}

export function isOverdue(item) {
  const now = Date.now()

  if (!item.date_due || item.date_due > now) {
    return false
  } else if (!item.date_ended) {
    return true
  }

  return false
}

export function wasEverOverdue(item) {
  const now = Date.now()

  if (!item.date_due || item.date_due > now) {
    return false
  } else if (!item.date_ended) {
    return true
  }

  return item.date_ended > item.date_due
}
