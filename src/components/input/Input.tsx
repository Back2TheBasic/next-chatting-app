import React, { useState } from "react";
import Icon from "../icon/Icon";
import styles from "./Input.module.scss";

const Input = ({
  id = "",
  type = "text",
  label = "",
  placeholder = "",
  autoComplete = "",
  onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {},
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const checkType = (): string => {
    if (type === "email") return "email";
    if (type === "password") return showPassword ? "text" : "password";
    return "text";
  };
  const togglePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label
        htmlFor={type}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          type={checkType()}
          name={id}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          className={styles.input}
        />

        {type === "password" && (
          <button type="button" onClick={togglePasswordShow}>
            <Icon type={showPassword ? "show" : "hide"} />
          </button>
        )}
      </div>
    </>
  );
};

export default Input;
