import React from 'react'
import Icon from './Icon'
import classnames from 'classnames'

export const Button = (props) => {
  let content = props.text || props.children;
  return <button
    className={classnames('button', props.className, { empty: ! content })}
    aria-label={props.label} onClick={props.onClick} tabIndex={props.tabIndex||0}>
    {props.icon && <Icon icon={props.icon} fixedWidth />}
    {props.iconLeft && <Icon icon={props.iconLeft} className="on-left" fixedWidth/>}
    {content
      ? <span className="caption">{content}</span>
      : null
    }
    {props.iconRight && <Icon icon={props.iconRight} className="on-right" fixedWidth/>}
  </button>
}

export default Button
