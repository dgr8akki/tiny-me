import React from 'react';

const ResultView = (
  {
    id,
    className,
    value,
    children,
    disable,
    name,
    rows,
    onChange,
    placeholder,
    readOnly,
  },
) => (
  <textarea
    id={id || null}
    className={className || null}
    value={value || ''}
    disabled={disable || false}
    name={name || null}
    rows={rows || null}
    onChange={onChange || null}
    placeholder={placeholder || ''}
    readOnly={readOnly || false}
  >
    {children}
  </textarea>
);

export default ResultView;
