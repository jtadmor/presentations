import React, { Component } from 'react'
import _ from 'lodash'

import Rules from './parsing_rules'

class DataBuilder {
  constructor(rules) {
    this.init(rules)
  }

  init = (rules = this.rules) => {
    this.rules = rules
    this.items = []
    this.current_item = {}
  }

  addCurrentItem = () => {
    if (!_.isEmpty(this.current_item)) {
      this.items.push(this.current_item)
      this.current_item = {}
    }
  }

  setProperty = (key, value) => {
    this.current_item[key] = value
  }

  applyRuleToNode(rule, node, next) {
    const { key, parse } = rule

    if (key) {
      const { getValue = n => n.innerText } = rule
      if (rule.start_new_item) {
        this.addCurrentItem()
      }
      const value = getValue(node)
      this.setProperty(key, value)
    } else if (typeof parse === 'function') {
      return parse(node, this, next)
    }
  }

  matchesCondition(rule, node) {
    const { condition, match_element } = rule

    if (match_element) {
      return node.nodeName === match_element
    } else if (typeof condition === 'function') {
      return condition(node, this)
    }
  }

  parseHtml(html_string) {
    const { body } = new DOMParser().parseFromString(html_string, 'text/html')

    this.parseElements(body.childNodes)
    this.addCurrentItem()

    return this.items
  }

  parseElements = nodes => {
    _.each(nodes, this.parseElement)
  }

  parseElement = node => {
    const next = () => {
      if (node.childNodes) {
        this.parseElements(node.childNodes)
      }
    }

    _.each(this.rules, rule => {
      if (this.matchesCondition(rule, node)) {
        const returned = this.applyRuleToNode(rule, node, next)

        if (returned === false) {
          return false
        }
      }
    })
  }
}



class Parser extends Component {
  constructor(props) {
    super(props)

    this.data_builder = new DataBuilder(Rules.Projects)
    this.state = {
      html: ''
    }
  }

  setRef = input => {
    this.input = input
  }

  handleParse = () => {
    const { html } = this.state

    console.log('html', html)

    const parsed = this.data_builder.parseHtml(html)

    this.setState({ parsed })
  }

  render() {
    const { html, parsed } = this.state

    return (
      <div>
        <h3>Parse HTML</h3>
        <textarea
          onChange={e => this.setState({ html: e.target.value })}
          value={html}
        />
        <div>
          <button
            style={{ marginTop: '20px' }}
            onClick={this.handleParse}>
            Parse
          </button>
        </div>
        { parsed ? (
          <pre style={{ backgroundColor: '#ccc', color: 'red', padding: '20px' }}>
            <strong>{JSON.stringify(parsed, null, 2)}</strong>
          </pre>
        ) : null }
      </div>
    )
  }
}

export default Parser
