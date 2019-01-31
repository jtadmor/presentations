import React from 'react'

export const Logo = ({ logo }) => {
  if (!logo) {
    return null
  }

  return (
    <img src={logo} alt="" />
  )
}

export const Tags = ({ tags }) => {
  if (!tags || !tags.length) {
    return null
  }

  return (
    <span>{tags.join(', ')}</span>
  )
}
