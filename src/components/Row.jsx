import React from 'react'
import Cell from './Cell'

function Row({y, row, setCell}) {
  return <div className="row">
  { row.map(
      (cell, x) => <Cell key={x} x={x} y={y} cell={cell} setCell={setCell}/>
  )}
  </div>
}

export default Row