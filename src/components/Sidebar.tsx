const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <h5 className="text-blue-gray-900 text-lg font-semibold">Sidebar</h5>
      </div>
      <ul className="list-none p-0">
        <li className="flex items-center mb-4">Dashboard</li>
        <li className="flex items-center mb-4">E-Commerce</li>
        <li className="flex items-center justify-between mb-4">
          <div className="flex items-center">Inbox</div>
          <span className="bg-blue-gray-100 text-blue-gray-800 text-sm rounded-full px-2 py-1">
            14
          </span>
        </li>
        <li className="flex items-center mb-4">Profile</li>
        <li className="flex items-center mb-4">Settings</li>
        <li className="flex items-center">Log Out</li>
      </ul>
    </div>
  );
};

export default Sidebar;
