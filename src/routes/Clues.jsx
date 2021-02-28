import React   from 'react'
import Context from '../components/Context'
import Clues   from '../components/Clues'

const Route = (props) => {
  let {mode, setCluesMode} = props;
  React.useEffect(setCluesMode, [setCluesMode, mode]);
  return <Clues {...props}/>
}

export default Context.Consumer(Route)