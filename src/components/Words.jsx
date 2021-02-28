import React from 'react'
import Context from './Context'

const Words = ({words, word, template, down, across, vert, horz}) => <div className="words">
  <h2>Words</h2>
  <p>
    Click on the grid squares to enter letters to make up
    the words that are the answers for your puzzle.  For letters
    that are part of two words, click again on the square to
    toggle between the words going across and down.
  </p>
  { vert && down &&
    <div>
      <h3>{down} Down</h3>
      <div className="word-gap text-monospace">
        {word}
      </div>
      <div className="word-gap text-monospace">
        {template}
      </div>
    </div>
  }
  { horz && across &&
    <div>
      <h3>{across} Across</h3>
      <div className="word-gap text-monospace">
        {word}
      </div>
      <div className="word-gap text-monospace">
        {template}
      </div>
    </div>
  }
</div>

export default Context.Consumer(Words)