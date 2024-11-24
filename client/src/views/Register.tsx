import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import InputField from "../components/InputField";
import FormError from "../components/FormError";

export default function Register() {
  const { register } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.password);
      window.location.href = '/login';
    } catch (err) {
      setError("Registration failed. Please try again. Keep in mind the password must contain at least a lowercase letter, uppercase letter, digit and special character.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-900">
      <div className="bg-indigo-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-900 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormError error={error} />
          <button
            type="submit"
            className="w-full bg-indigo-900 text-white py-2 px-4 rounded mt-4 hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
