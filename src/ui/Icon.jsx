import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Although we don't reference this, it's important to import it
// so that the custom FontAwesome library is constructed.
// eslint-disable-next-line
import { icons } from '../config/icons'

const styles = {
  solid: 'fas',
  outline: 'far',
  regular: 'far'
};

export const Icon = (props) => {
    let myProps = { ...props };

    // allow "name" as an alias for "icon" property
    let icon = myProps.icon || myProps.name;
    myProps.icon = icon;
    delete myProps.name;

    // look for solid/outline/regular props
    Object.keys(styles).forEach(
        style => {
            if (myProps[style]) {
                delete myProps[style];
                myProps.icon = [styles[style], icon];
            }
        }
    );

    myProps.className = (myProps.className|| '') + ' icon';

    if (myProps.color) {
        myProps.className += ' ' + myProps.color;
        delete myProps.color;
    }
    // console.log("Icon props: ", myProps);
    return <FontAwesomeIcon {...myProps}/>
}

export const Icons = ({children, className=''}) => <span className={`fa-layers fa-fw ${className}`}>
  {children}
</span>

export const IconStack = (props) => <Icons className={props.className}>
  <Icon icon={props.backIcon} color={props.backColor} transform={props.backTransform}/>
  <Icon icon={props.foreIcon} color={props.foreColor} transform={props.foreTransform} />
</Icons>

export default Icon;
