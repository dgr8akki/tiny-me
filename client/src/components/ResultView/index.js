import React from 'react';
import Input from 'antd/lib/input';

const ResultView = (
  {
    id,
    className,
    value,
    children,
    disable,
    readOnly
  }
) => (
  <Input
    id={id || null}
    className={className || null}
    value={value || null}
    disabled={disable || false}
    readOnly={readOnly || false}
    placeholder="Paste your link here"
  >
    {children}
  </Input>
);

export default ResultView;
