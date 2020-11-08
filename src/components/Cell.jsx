import React from 'react'
import Context from './Context'
import classname from 'classnames'

function Cell({cell, action}) {
  let cn = classname(
    'cell',
    {
      black: cell.black,
      focus: cell.focus,
      horz:  cell.horz,
      vert:  cell.vert,
    }
  );
  if (cell.focus) {
    //console.log('cell: ', cell);
  }
  return <div className={cn} onClick={() => action(cell.x, cell.y)}>
    {cell.number && <div className="number">{cell.number}</div>}
    {cell.letter}
  </div>
}

export default Context.Consumer(Cell)