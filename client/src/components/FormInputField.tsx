import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputFieldProps {
  register: UseFormRegisterReturn;
  label?: string;
  error?: FieldError;
  inputGroupElement?: JSX.Element;
}

export default function FormInputField({
  register,
  label,
  error,
  inputGroupElement,
  ...props
}: FormInputFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-50 mb-2">{label}</label>}
      <div className="flex items-center">
        <input
          {...register}
          {...props}
          className={`block w-60 max-w-md bg-transparent outline-none border-b-2 py-2 px-4 ${
            error
              ? "text-red-500 border-red-600"
              : "text-gray-50 border-purple-900"
          }`}
        />
        {inputGroupElement}
      </div>
      {error?.message && (
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
}
