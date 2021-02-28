import React    from 'react'
import Context  from '../components/Context'
import Controls from '../components/Controls'

const Route = (props) => {
  let {mode, setGridMode} = props;
  React.useEffect(setGridMode, [setGridMode, mode]);
  return <Controls {...props}/>
}

export default Context.Consumer(Route)