import React from 'react'
import Cell from './Cell'

function Row({y, row}) {
  return <div className="row">
  { row.map(
      (cell, x) => <Cell key={x} x={x} y={y} cell={cell}/>
  )}
  </div>
}

export default Row