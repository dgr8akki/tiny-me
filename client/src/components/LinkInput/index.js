import Input from "antd/lib/input";
import React from "react";
import styles from "./LinkInput.module.css";

const LinkInput = (
    {
        id,
        className,
        value,
        disable,
        name,
        onChange,
        placeholder,
        readOnly,
    },
) => (
    <Input
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`${styles.input} ${className}`}
        disabled={disable}
        readOnly={readOnly}
    />
);

export default LinkInput;
