import React from 'react'
import Context from './Context'
import Row from './Row'

function Grid({rows}) {
  return <div className="grid">
  { rows.map(
      (row, y) => <Row key={y} y={y} row={row}/>
  )}
  </div>
}

export default Context.Consumer(Grid)