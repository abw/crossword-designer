import React from 'react'
import Context from './Context'
import classname from 'classnames'

function Cell({cell, clickCell, down, across, horz, vert}) {
  let isDown    = cell.down && cell.down === down;
  let isAcross  = cell.across && cell.across === across;
  let isWord    = (isDown && vert) || (isAcross && horz);
  let className = classname(
    'cell',
    {
      black:  cell.black,
      focus:  cell.focus,
      horz:   cell.horz,
      vert:   cell.vert,
      down:   isDown,
      across: isAcross,
      word:   isWord,
    }
  );
  if (cell.focus) {
    //console.log('cell: ', cell);
  }
  return <div className={className} onClick={() => clickCell(cell.x, cell.y)}>
    {cell.number && <div className="number">{cell.number}</div>}
    {cell.letter}
  </div>
}

export default Context.Consumer(Cell)