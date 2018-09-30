import React from 'react';

const SiteFooter = ({className, children}) => (
  <div className={`footer ${className || null}`}>
    {children}
  </div>
);

export default SiteFooter;
