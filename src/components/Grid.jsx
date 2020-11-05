import React from 'react'
import Row from './Row'

class Grid extends React.Component {
  constructor(props) {
    super(props);
    const size = props.size || 15;
    const symmetry = props.symmetry || 4;
    this.state = {
      size,
      symmetry,
      rows: [...Array(size)].map(
        (r, y) => [...Array(size)].map(
          (c, x) => ({x, y})
        )
      )
    }
    this.setCell = this.setCell.bind(this);
  }
  setCell(x, y, params) {
    let {rows, size, symmetry} = this.state;
    let cell = rows[y][x];
    rows[y][x] = {...cell, ...params};
    if (symmetry) {
      const y2 = size - 1 - y;
      const x2 = size - 1 - x;
      rows[y2][x2] = {...rows[y2][x2], ...params};
    }
    if (symmetry === 4) {
      const y2 = size - 1 - y;
      const x2 = size - 1 - x;
      rows[y][x2] = {...rows[y][x2], ...params};
      rows[y2][x] = {...rows[y2][x], ...params};
    }
    this.setState({ rows: [...rows]});
  }
  render() {
    const {rows} = this.state;
    // console.log('rows: ', rows);
    return <div className="grid">
    { rows.map(
        (row, y) => <Row key={y} y={y} row={row} setCell={this.setCell}/>
    )}
    </div>
  }
}

export default Grid