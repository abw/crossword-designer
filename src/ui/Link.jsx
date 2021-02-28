import React from 'react'
import Icon from './Icon'
import classnames from 'classnames'
import { Link as RouterLink } from '@reach/router'

export const Link = (props) => {
  const getProps = (routing) => {
      const active = props.exact
        ? routing.isCurrent
        : routing.isPartiallyCurrent;
      return {
        className: classnames(props.className, { active: active })
      }
  };

  return <RouterLink
    to={props.to}
    exact={props.exact&&'exact'}
    onClick={props.onClick}
    getProps={getProps}
  >
  {props.icon &&
    <Icon icon={props.icon}/>
  }
  {props.iconLeft &&
    <Icon icon={props.iconLeft} fixedWidth className={`left on-left ${props.iconLeftClass||''}`}/>
  }
  {props.imageLeft &&
    <img src={props.imageLeft} className="left on-left" alt={`Link to ${props.to}`}/>
  }
  {props.bare
    ? props.text||props.children
    : <span className="text">{props.text||props.children}</span>
  }
  {props.iconRight &&
    <Icon icon={props.iconRight} fixedWidth className={`right on-right ${props.iconRightClass||''}`}/>
  }
</RouterLink>}

export default Link
