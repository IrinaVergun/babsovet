import React from 'react'
import { Menu } from './Menu';
export default function Fcomponent(props) {
  return (
    <div>
        {props.children}
        <h1>hello{props.name.join(',')}</h1>
        <Menu/>
        
        </div>
  )
}
