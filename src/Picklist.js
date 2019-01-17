import React, {Component} from 'react'
import PropTypes from 'prop-types'

const noop = () => {}

class Pane extends Component {
  static propTypes = {
    items: PropTypes.array,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    onAction: PropTypes.func,
    actionElement: PropTypes.any,
    paneLabel: PropTypes.any,
    height: PropTypes.number,
    paneRef: PropTypes.func,
    resize: PropTypes.func,
    panelId: PropTypes.string,
    searchElement: PropTypes.any,
    renderItem: PropTypes.func,
    renderOption: PropTypes.func
  }

  static defaultProps = {
    items: [],
    valueKey: 'value',
    labelKey: 'label',
    onAction: noop,
    actionElement: 'Submit',
    paneLabel: 'Items',
    paneRef: noop,
    resize: noop
  }

  state = {
    search: false,
    searchText: ''
  }

  onFlush = (e) => {
    e.preventDefault()
    this.props.onAction(this.items())
    this.setState({searchText: ''})
  }

  items = () => {
    let {items, labelKey} = this.props
    const {search, searchText} = this.state
    if (search) {
      items = items.filter(item => String(item[labelKey]).toLowerCase().includes(searchText.toLowerCase()))
    }
    return items
  }

  onSearchElementCLick = (e) => {
    e.preventDefault()
    this.setState({search: !this.state.search, searchText: ''})
  }

  renderOption = (option) => {
    const {panelId, valueKey, labelKey, onAction, renderOption} = this.props
    const onClick = (e) => {
      e.preventDefault()
      onAction([option])
    }
    if (renderOption) {
      return renderOption({option, onClick, panelId})
    }
    return (
      <a
        href=''
        data-testid={`${panelId}-${option[valueKey]}`}
        onClick={(e) => {
          e.preventDefault()
          onAction([option])
        }}
      >
        {option[labelKey]}
      </a>
    )
  }

  render () {
    const {
      valueKey,
      actionElement,
      height,
      paneRef,
      paneLabel,
      panelId,
      searchElement,
      searchInputClassName
    } = this.props
    const items = this.items()
    const innerDivStyle = {height, overflow: height ? 'auto' : null}
    return (
      <div ref={paneRef} >
        <div className='row'>
          <div className='col-3'>{paneLabel}</div>
          <div className={`col-9 text-right`}>
            <a href='' onClick={this.onFlush} data-testid={`${panelId}-bulk-action`}>
              {actionElement}
            </a>
            &nbsp;&nbsp;&nbsp;
            <a
              href=''
              data-testid={`${panelId}-search-toggle`}
              onClick={this.onSearchElementCLick}
            >
              {searchElement}
            </a>
          </div>
        </div>
        <hr style={{margin: 0}} />
        <div style={innerDivStyle}>
          {this.state.search ? (
            <input
              type='text'
              className={searchInputClassName}
              placeholder='Search'
              value={this.state.searchText}
              onChange={e => this.setState({
                searchText: e.target.value,
                selected: {},
                selectAll: false
              })}
              data-testid={`${panelId}-search-input`}
            />
          ) : null}
          {items.map(option => (
            <span key={option[valueKey]}>
              {this.renderOption(option)}
              <br />
            </span>
          ))}
          {items.length === 0 ? <br /> : null}
        </div>
      </div>
    )
  }
}

class Picklist extends Component {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.array,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    onChange: PropTypes.func,
    height: PropTypes.number,
    leftPaneLabel: PropTypes.any,
    rightPaneLabel: PropTypes.any,
    searchElement: PropTypes.any,
    searchInputClassName: PropTypes.any,
    renderOption: PropTypes.func
  }

  static defaultProps = {
    options: [],
    labelKey: 'label',
    valueKey: 'value',
    value: [],
    onChange: noop,
    height: null,
    leftPaneLabel: 'Options',
    rightPaneLabel: 'Selected',
    searchElement: <span>&#128269;</span>,
    searchInputClassName: 'form-control form-control-sm'
  }

  add = options => {
    const {value, valueKey, onChange} = this.props
    const values = value.slice(0)
    options.forEach(option => {
      const found = values.find(o => o[valueKey] === option[valueKey])
      if (!found) {
        values.push(option)
      }
    })
    onChange(values)
  }

  remove = options => {
    const {value, valueKey, onChange} = this.props
    const values = value.slice(0)
    const keys = options.map(opt => opt[valueKey])
    keys.forEach(key => {
      const index = values.map(o => o[valueKey]).indexOf(key)
      if (index > -1) {
        values.splice(index, 1)
      }
    })
    onChange(values)
  }

  getAvailableOptions = () => {
    const {options, value, valueKey} = this.props
    return options.filter(option => {
      return value.find(v => v[valueKey] === option[valueKey]) === undefined
    })
  }

  render () {
    return (
      <div className='row c2-react-picklist'>
        <div className='col-6 c2-react-picklist-pane'>
          <Pane
            actionElement='Add all'
            {...this.props}
            paneLabel={this.props.leftPaneLabel}
            items={this.getAvailableOptions()}
            onAction={options => this.add(options)}
            panelId='options'
          />
        </div>
        <div className='col-6 c2-react-picklist-pane'>
          <Pane
            actionElement='Remove all'
            {...this.props}
            paneLabel={this.props.rightPaneLabel}
            items={this.props.value}
            onAction={options => this.remove(options)}
            panelId='selected'
          />
        </div>
      </div>
    )
  }
}

export default Picklist
