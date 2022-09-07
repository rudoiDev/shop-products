import React from 'react';
import { NavLink } from 'react-router-dom' 

export default ({children, link, style}) => {
  return (
  <NavLink to={link} className={style}>{children}</NavLink>
  );
}
