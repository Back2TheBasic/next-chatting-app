import React from "react";

const Input = ({
  id = "",
  type = "text",
  label = "",
  placeholder = "",
  autoComplete = "",
  onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {},
  required = false,
}) => {
  return (
    <>
      <label
        htmlFor={type}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={id}
          id={id}
          placeholder="이메일을 입력하세요"
          onChange={onChange}
          autoComplete="email"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink sm:text-sm sm:leading-6"
        />
      </div>
    </>
  );
};

export default Input;
