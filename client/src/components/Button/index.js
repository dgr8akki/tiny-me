import React from 'react';
import Button from 'antd/lib/button';

const TMButton = (
  {
    id,
    className,
    onClick,
    dataClipboardTarget,
    text,
    children
  }
) => (
  <Button
    id={id || null}
    className={className || null}
    onClick={onClick || null}
    data-clipboard-target={dataClipboardTarget || null}
  >
    {text || children}
  </Button>
);

export default TMButton;
