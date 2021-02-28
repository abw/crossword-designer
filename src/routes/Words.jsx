import React   from 'react'
import Context from '../components/Context'
import Words   from '../components/Words'

const Route = (props) => {
  let {mode, setWordsMode} = props;
  React.useEffect(setWordsMode, [setWordsMode, mode]);
  return <Words {...props}/>
}

export default Context.Consumer(Route)