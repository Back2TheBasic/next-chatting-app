import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./index.module.scss";

interface PasswordInputProps {
  type: "password" | "confirm";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const PasswordInput = ({
  type,
  value,
  onChange,
  errorMessage,
}: PasswordInputProps) => {
  const [isSecretPassword, setIsSecretPassword] = useState(true);

  const toggleIsSecretPassword = () => {
    setIsSecretPassword((prev) => !prev);
  };

  const constant = CONSTANT_MAP[type];

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={constant.id}>{constant.label}</label>
      <div className={styles.passwordInput}>
        <input
          id={constant.id}
          placeholder="비밀번호를 입력하세요"
          type={isSecretPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
        {isSecretPassword ? (
          <FaEyeSlash
            className={styles.passwordIcon}
            aria-label="open-password"
            onClick={toggleIsSecretPassword}
          />
        ) : (
          <FaEye
            className={styles.passwordIcon}
            aria-label="close-password"
            onClick={toggleIsSecretPassword}
          />
        )}
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;

const CONSTANT_MAP = {
  password: { id: "password", label: "비밀번호" },
  confirm: { id: "confirmPassword", label: "비밀번호 확인" },
};