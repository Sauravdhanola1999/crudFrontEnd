"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    isActive: false,
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8091/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("User created successfully");
        setForm({
          name: "",
          email: "",
          isActive: true,
          password: "",
        });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Failed to add user", error);
    }
  };

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-6 h-screen w-screen"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="px-3 py-2 border border-gray-300 rounded-md w-80"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="px-3 py-2 border border-gray-300 rounded-md w-80"
        />
        <label className="block mb-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />{" "}
          Is Active?
        </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="px-3 py-2 border border-gray-300 rounded-md w-80"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-colors duration-200"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
