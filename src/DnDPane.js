import React, {Fragment, useRef} from 'react'
import PropTypes from 'prop-types'
import {useDrag, useDrop} from 'react-dnd'

function DnDPane () {
  const ref = useRef(null)
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

DnDPane.propTypes = {
  loginId: PropTypes.string.isRequired
}

export default DnDPane
