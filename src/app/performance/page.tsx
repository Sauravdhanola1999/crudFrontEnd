type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

const AllUsersPage = async () => {
  const response = await fetch("http://localhost:8091/api/users");
  const users: User[] = await response.json();
  // console.log(users);
  return (
    <div className="p-8">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Directory</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 p-6"
          >
            <div className="flex flex-col gap-2 mb-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base font-medium text-gray-800">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-base font-medium text-gray-800">
                  {user.name}
                </p>
              </div>
            </div>

            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                user.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.isActive ? "🟢 Active" : "🔴 Inactive"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsersPage;
