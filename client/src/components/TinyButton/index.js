import React from 'react';
import Button from 'antd/lib/button';
import styles from './TinyButton.module.css';

const TinyButton = (
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
    className={`${className || null} ${styles.button}`}
    onClick={onClick || null}
    data-clipboard-target={dataClipboardTarget || null}
  >
    {text || children}
  </Button>
);

export default TinyButton;
