import React from 'react'

function Cell({cell, setCell}) {
  //let [black, setBlack] = React.useState(false);
  //console.log('cell: ', cell);

  return <div className={`cell ${cell.black?'black':'white'}`} onClick={() => setCell(cell.x, cell.y, { black: !cell.black })}>
    {/* {cell.x},{cell.y} */}
  </div>
}

export default Cell