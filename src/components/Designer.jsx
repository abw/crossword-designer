import React   from 'react'
import Context from '../components/Context'
import Grid    from '../components/Grid'

const Designer = ({children, mode, cell, down, across, word}) => <div className="designer">
  <div className="puzzle">
    <Grid/>
    <div>Mode: {mode}</div>
    { cell && <div>
      Cell: [{cell.x}, {cell.y}],
      {down && `${down} down, `}
      {across && `${across} across, `}
      {cell.horz && "horizontal, "}
      {cell.vert && "vertical, "}
    </div>
    }
  </div>
  <div className="sidebar">
    {children}
  </div>
</div>

export default Context.Consumer(Designer)