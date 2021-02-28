import React from 'react'
import Context from './Context'

const Clues = ({words}) => <div className="Clues">
  <h2>Clues</h2>
</div>

export default Context.Consumer(Clues)