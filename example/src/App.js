import React from 'react'
import Picklist from 'c2-react-picklist'
import Component from '@reactions/component'

const options = [
  {value: 'foo', label: 'Foo'},
  {value: 'bar', label: 'Bar'},
  {value: 'baz', label: 'Baz'}
]

export default function App () {
  const [allowDnD, setAllowDnD] = React.useState(false)
  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-6'>
          <Component initialState={{value: []}}>
            {({setState, state}) => (
              <Picklist
                options={options}
                value={state.value}
                onChange={(value) => setState({value})}
                DnD={allowDnD}
              />
            )}
          </Component>
        </div>
        <label style={{marginLeft: 10}}>
          <input
            type='checkbox'
            checked={allowDnD}
            onChange={e => setAllowDnD(e.target.checked)}
          />
          &nbsp;
          allow Drag and Drop
        </label>
      </div>
    </div>
  )
}
