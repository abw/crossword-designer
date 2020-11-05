import React from 'react'
import Context from './Context'
import classname from 'classnames'

function Cell({cell, action}) {
  return <div
      className={classname('cell', { black: cell.black, focus: cell.focus })}
      onClick={() => action(cell.x, cell.y)}>
    {/* {cell.x},{cell.y} */}
  </div>
}

export default Context.Consumer(Cell)