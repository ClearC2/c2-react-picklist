# c2-react-picklist [![CircleCI](https://circleci.com/gh/ClearC2/c2-react-picklist.svg?style=svg)](https://circleci.com/gh/ClearC2/c2-react-picklist)

A bootstrap v4 picklist react component.

## Install
```
yarn add ClearC2/c2-react-picklist#^1.0.0
```

## Usage


```jsx
import React from 'react'
import Picklist from 'c2-react-picklist'

class App extends React.Component {
  state = {
    value: [],
    options: [
      {value: 'foo', label: 'Foo'},
      {value: 'bar', label: 'Bar'},
      {value: 'baz', label: 'Baz'}
    ]
  }
  render () {
    return (
      <Picklist
        options={this.state.options}
        value={this.state.value}
        onChange={(value) => this.setState({value})}
      />
    )
  }
}
```
