"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

type ApiResponse = {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  perPage: number;
  data: User[];
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchUsers = async (page: number) => {
    try {
      const res = await fetch(
        `http://localhost:8091/api/users/cards?page=${page}&limit=6`
      );
      const json: ApiResponse = await res.json();
      setUsers(json.data);
      setTotalPages(json.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDeleteUser = async (id: number) => {
    const confirmDelete = window.confirm("Are sure you wana delete this User");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8091/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert("User Deleted");
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert(`Error:` + data.message);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users (Page {page})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition hover:shadow-lg"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              {user.name}
            </h2>
            <p className="text-sm text-gray-600 mb-1">{user.email}</p>

            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 ${
                user.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>

            <button
              className="w-full px-4 py-2 text-sm font-medium hover:bg-black text-white rounded-xl bg-gray-800 transition-colors"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ← Prev
        </button>

        <span className="px-4 py-2 font-semibold text-gray-800 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
