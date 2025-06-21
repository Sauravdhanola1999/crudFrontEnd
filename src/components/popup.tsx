import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface EditModalProps {
  user: User;
  onClose: () => void;
  onUserUpdated: () => void;
}

export default function PopUp({ user, onClose, onUserUpdated }: EditModalProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

 const handleSave = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:8091/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (!res.ok) {
      throw new Error("Failed to update user");
    }

    const updatedUser = await res.json();
    console.log("User updated successfully:", updatedUser);
     onUserUpdated();
    onClose(); 
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 text-xl font-bold">
            &times;
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={()=>handleSave(user.id)}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
