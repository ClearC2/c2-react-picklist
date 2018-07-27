import React from 'react'
import Component from '@reactions/component'
import {render, cleanup, fireEvent} from 'react-testing-library'
import {expect} from 'chai'
import Picklist from '../src/Picklist'

describe('Picklist', () => {
  afterEach(cleanup)

  it('should render Picklist', () => {
    const {container} = renderPicklist({})
    expect(container).to.not.be.null()
  })

  it('should render options', () => {
    const options = [
      {value: 'foo', label: 'Foo'},
      {value: 'bar', label: 'Bar'}
    ]
    const {queryByTestId} = renderPicklist({options})
    const option1 = queryByTestId('options-foo')
    expect(option1).to.not.be.null()
    const option2 = queryByTestId('options-bar')
    expect(option2).to.not.be.null()
  })

  it('should render selected', () => {
    const options = [
      {value: 'foo', label: 'Foo'},
      {value: 'bar', label: 'Bar'}
    ]
    const {queryByTestId} = renderPicklist({options, initialValue: options})
    const option1 = queryByTestId('selected-foo')
    expect(option1).to.not.be.null()
    const option2 = queryByTestId('selected-bar')
    expect(option2).to.not.be.null()
  })

  it('should handle custom value keys', () => {
    const options = [
      {id: 'foo', label: 'Foo'},
      {id: 'bar', label: 'Bar'}
    ]
    const {getByTestId} = renderPicklist({options, valueKey: 'id'})
    expect(getByTestId('options-foo').innerHTML).to.include('Foo')
    expect(getByTestId('options-bar').innerHTML).to.include('Bar')
  })

  it('should handle custom label keys', () => {
    const options = [
      {value: 'foo', display: 'Foo'},
      {value: 'bar', display: 'Bar'}
    ]
    const {getByTestId} = renderPicklist({options, labelKey: 'display'})
    expect(getByTestId('options-foo').innerHTML).to.include('Foo')
    expect(getByTestId('options-bar').innerHTML).to.include('Bar')
  })

  it('should move selected option to selected panel', () => {
    const options = [
      {value: 'foo', label: 'Foo'},
      {value: 'bar', label: 'Bar'},
      {value: 'baz', label: 'Baz'}
    ]
    let currentValue = []
    const {getByTestId, queryByTestId} = renderPicklist({
      options,
      initialValue: currentValue,
      onChange: value => { currentValue = value }
    })
    // test ui
    fireEvent.click(getByTestId('options-bar'))
    expect(getByTestId('selected-bar')).to.not.be.null()
    expect(queryByTestId('options-bar')).to.be.null()
    //test data
    expect(currentValue).to.deep.equal([options[1]])
  })

  it('should move selected value to options panel', () => {
    const options = [
      {value: 'foo', label: 'Foo'},
      {value: 'bar', label: 'Bar'},
      {value: 'baz', label: 'Baz'}
    ]
    let currentValue = [options[1]]
    const {getByTestId, queryByTestId} = renderPicklist({
      options,
      initialValue: currentValue,
      onChange: value => { currentValue = value }
    })
    // test ui
    fireEvent.click(getByTestId('selected-bar'))
    expect(getByTestId('options-bar')).to.not.be.null()
    expect(queryByTestId('selected-bar')).to.be.null()
    // test data
    expect(currentValue).to.deep.equal([])
  })

  it('should move all options to select panel on options panel bulk action click', () => {
    const options = [
      {value: 'foo', label: 'Foo'},
      {value: 'bar', label: 'Bar'},
      {value: 'baz', label: 'Baz'}
    ]
    let currentValue = []
    const {getByTestId, queryByTestId} = renderPicklist({
      options,
      initialValue: currentValue,
      onChange: value => { currentValue = value }
    })
    // test ui
    fireEvent.click(getByTestId('options-bulk-action'))
    options.forEach(option => {
      expect(queryByTestId(`selected-${option.value}`)).to.not.be.null()
    })
    // test data
    expect(currentValue).to.deep.equal(options)
  })

  it('should move all selected to options panel on selected panel bulk action click', () => {
    const options = [
      {value: 'foo', label: 'Foo'},
      {value: 'bar', label: 'Bar'},
      {value: 'baz', label: 'Baz'}
    ]
    let currentValue = options
    const {getByTestId, queryByTestId} = renderPicklist({
      options,
      initialValue: currentValue,
      onChange: value => { currentValue = value }
    })
    // test ui
    fireEvent.click(getByTestId('selected-bulk-action'))
    options.forEach(option => {
      expect(queryByTestId(`selected-${option.value}`)).to.be.null()
    })
    // test data
    expect(currentValue).to.deep.equal([])
  })

  it('should filter options on options search', () => {
    const options = [
      {value: 'foo', label: 'Foo'},
      {value: 'bar', label: 'Bar'},
      {value: 'baz', label: 'Baz'}
    ]
    const {getByTestId, queryByTestId} = renderPicklist({
      options,
      initialValue: []
    })
    fireEvent.click(getByTestId('options-search-toggle'))
    const searchInput = getByTestId('options-search-input')
    typeText(searchInput, 'Ba')
    expect(queryByTestId(`options-foo`), 'foo').to.be.null()
    expect(queryByTestId(`options-bar`), 'bar').to.not.be.null()
    expect(queryByTestId(`options-baz`), 'baz').to.not.be.null()
  })

  it('should filter selected on selected search', () => {
    const options = [
      {value: 'foo', label: 'Foo'},
      {value: 'bar', label: 'Bar'},
      {value: 'baz', label: 'Baz'}
    ]
    const {getByTestId, queryByTestId} = renderPicklist({
      options,
      initialValue: options
    })
    fireEvent.click(getByTestId('selected-search-toggle'))
    const searchInput = getByTestId('selected-search-input')
    typeText(searchInput, 'Bar')
    expect(queryByTestId(`selected-foo`), 'foo').to.be.null()
    expect(queryByTestId(`selected-bar`), 'bar').to.not.be.null()
    expect(queryByTestId(`selected-baz`), 'baz').to.be.null()
  })

  it('should use renderOption prop if exists', () => {
    const options = [
      {value: 'foo', label: 'Foo'},
      {value: 'bar', label: 'Bar'},
      {value: 'baz', label: 'Baz'}
    ]
    let currentValue = [options[1]]
    const {getByTestId} = renderPicklist({
      options,
      initialValue: currentValue,
      onChange: (value) => { currentValue = value },
      renderOption: ({option, onClick, panelId}) => (
        <span onClick={onClick} data-testid={`${panelId}-${option.value}`}>
          {option.label.toUpperCase()}
          {' '}
          {panelId === 'options' ? '+' : '-'}
        </span>
      )
    })
    // test ui
    expect(getByTestId(`options-foo`).innerHTML).to.include('FOO +')
    expect(getByTestId(`selected-bar`).innerHTML).to.include('BAR -')
    fireEvent.click(getByTestId('options-foo'))
    // test data
    expect(currentValue).to.deep.equal([options[1], options[0]])
  })
})

function renderPicklist ({initialValue = [], options = [], onChange = (() => {}), ...rest} = {}) {
  return render((
    <Component initialState={{value: initialValue}}>
      {({setState, state}) => (
        <Picklist
          {...rest}
          options={options}
          value={state.value}
          onChange={(value) => {
            setState({value})
            onChange(value)
          }}
        />
      )}
    </Component>
  ))
}

function typeText (input, text) {
  input.value = text
  fireEvent.change(input)
}
