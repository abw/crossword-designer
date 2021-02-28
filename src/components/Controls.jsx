import React from 'react'
import classname from 'classnames'

const Controls = ({symmetries, symmetry, setSymmetry}) => {
  return <div className="controls">
    <h2>Grid Layout</h2>
    <p>
      Click on the grid squares to toggle them between black and white.
    </p>
    <h3>Symmetry</h3>
    { symmetries.map(
        s => <div key={s.value} className={classname('symmetry option', { selected: symmetry === s.value })} onClick={() => setSymmetry(s.value)}>
          {s.text}
        </div>
    )}
  </div>
}

export default Controls