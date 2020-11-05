import React from 'react'
import Context from './Context'
import classname from 'classnames'
import { Icon } from '../ui/ui'

function Controls({tools, toolNo, selectTool, symmetries, symmetry, setSymmetry}) {
  return <div className="controls">
    <h2>Controls</h2>
    { tools.map(
        (tool, t) => <div key={t} className={classname('tool option', { selected: toolNo === t })} onClick={() => selectTool(t)}>
          <Icon name={tool.icon} fixedWidth/> {tool.text}
        </div>
    )}
    <h2>Symmetry</h2>
    { symmetries.map(
        s => <div key={s.value} className={classname('symmetry option', { selected: symmetry === s.value })} onClick={() => setSymmetry(s.value)}>
          {s.text}
        </div>
    )}
  </div>
}

export default Context.Consumer(Controls)