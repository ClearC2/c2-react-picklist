import React from 'react'
import Picklist from 'c2-react-picklist'
import Component from '@reactions/component'

const options = [
  {value: 'foo', label: 'Foo'},
  {value: 'bar', label: 'Bar'},
  {value: 'baz', label: 'Baz'}
]

export default function App () {
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
              />
            )}
          </Component>
        </div>
      </div>
    </div>
  )
}
