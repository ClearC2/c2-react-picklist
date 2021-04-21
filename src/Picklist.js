import React, {Component, useRef} from 'react'
import PropTypes from 'prop-types'
import {DndProvider, useDrag, useDrop} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

const noop = () => {}

// https://react-dnd.github.io/react-dnd/examples/sortable/simple
function DnDOption (
  {
    option,
    index,
    labelKey,
    onAction,
    moveOption
  }
) {
  const ref = useRef(null)
  const [{handlerId}, drop] = useDrop({
    accept: 'option',
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover (item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveOption(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })
  const [{isDragging}, drag] = useDrag({
    type: 'option',
    item: () => {
      return {index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))

  return (
    <span ref={ref} data-handler-id={handlerId}>
      <a
        href=''
        style={{cursor: isDragging ? 'move' : 'pointer'}}
        onClick={e => e.preventDefault()}
        onDoubleClick={e => {
          e.preventDefault()
          onAction([option])
        }}
      >
        {option[labelKey]}
      </a>
      <br />
    </span>
  )
}

DnDOption.propTypes = {
  option: PropTypes.object,
  index: PropTypes.number,
  labelKey: PropTypes.string,
  onAction: PropTypes.func,
  moveOption: PropTypes.func
}

class Pane extends Component {
  static propTypes = {
    items: PropTypes.array,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    onAction: PropTypes.func,
    onChange: PropTypes.func,
    actionElement: PropTypes.any,
    paneLabel: PropTypes.any,
    height: PropTypes.number,
    paneRef: PropTypes.func,
    resize: PropTypes.func,
    panelId: PropTypes.string,
    searchElement: PropTypes.any,
    renderItem: PropTypes.func,
    renderOption: PropTypes.func,
    DnD: PropTypes.bool,
    searchInputClassName: PropTypes.string
  }

  static defaultProps = {
    items: [],
    valueKey: 'value',
    labelKey: 'label',
    onAction: noop,
    onChange: noop,
    actionElement: 'Submit',
    paneLabel: 'Items',
    paneRef: noop,
    resize: noop,
    DnD: false
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
        onClick={onClick}
      >
        {option[labelKey]}
      </a>
    )
  }

  moveOption = (dragIndex, hoverIndex) => {
    const items = this.items()
    items.splice(hoverIndex, 0, items.splice(dragIndex, 1)[0])
    this.props.onChange(items)
  }

  render () {
    const {
      valueKey,
      labelKey,
      actionElement,
      onAction,
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
          {items.map((option, i) => {
            if (this.props.DnD) {
              return (
                <DnDOption
                  key={option[valueKey]}
                  option={option}
                  index={i}
                  panelId={panelId}
                  valueKey={valueKey}
                  labelKey={labelKey}
                  onAction={onAction}
                  moveOption={this.moveOption}
                />
              )
            }
            return (
              <span key={option[valueKey]}>
                {this.renderOption(option)}
                <br />
              </span>
            )
          })}
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
    renderOption: PropTypes.func,
    DnD: PropTypes.bool
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
    searchInputClassName: 'form-control form-control-sm',
    DnD: false
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
      <DndProvider backend={HTML5Backend}>
        <div className='row c2-react-picklist'>
          <div className='col-6 c2-react-picklist-pane'>
            <Pane
              actionElement='Add all'
              {...this.props}
              paneLabel={this.props.leftPaneLabel}
              items={this.getAvailableOptions()}
              onAction={options => this.add(options)}
              panelId='options'
              DnD={false}
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
      </DndProvider>
    )
  }
}

export default Picklist
