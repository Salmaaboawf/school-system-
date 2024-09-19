import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Sidebar from "./Sidebar";
import { Button } from "flowbite-react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import DashboardHeader from "./Header/DashboardHeader";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
  });
  const [formError, setFormError] = useState(""); // New state for error message
  const [searchVal, setSearchVal] = useState("");
  const collections = ["students", "teachers", "parents"]; // Firebase collections

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersPromises = collections.map(async (collectionName) => {
          const querySnapshot = await getDocs(collection(db, collectionName));
          return querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            role: collectionName.slice(0, -1), // Assuming role is collection name without 's'
          }));
        });

        const allUsers = await Promise.all(usersPromises);
        const mergedUsers = allUsers.flat();
        setUsers(mergedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setFilteredUsers(users.filter((user) => user.role === role));
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      gender: user.gender,
      address: user.address,
      phone: user.phone,
    });
    setFormError(""); // Clear any previous error
  };

  const handleDeleteClick = async (userId) => {
    try {
      await deleteDoc(doc(db, selectedRole + "s", userId)); // Delete from the appropriate collection
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSaveEdit = async () => {
    // Check if all fields are filled
    if (!formData.name || !formData.email || !formData.gender || !formData.address || !formData.phone) {
      setFormError("Please fill in all fields.");
      return; // Don't proceed if there's an error
    }

    try {
      await updateDoc(doc(db, selectedRole + "s", editingUser.id), formData); // Update user in the appropriate collection
      setFilteredUsers(
        filteredUsers.map((user) =>
          user.id === editingUser.id ? { ...user, ...formData } : user
        )
      );
      setEditingUser(null);
      setFormError(""); // Clear the error on successful save
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const filterUsers = (role, search) => {
    let filtered = users;

    // Filter by selected role
    if (role) {
      filtered = users.filter((user) => user.role === role);
    }

    // Filter by search value
    if (search) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) // Search by name
      );
    }

    setFilteredUsers(filtered);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchVal(search);
    filterUsers(selectedRole, search); 
  }



  return (
    <div className="flex">
      <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-[100vh] z-50">
        <Sidebar />
      </div>

      <section className=" text-[#002749] xl:w-[80%] xl:ml-[20%] lg:w-[75%] lg:ml-[25%] md:w-[70%] md:ml-[30%] sm:m-auto w-full">
        <DashboardHeader pageTitle={'Show All Users'} />
        <div className="mx-4 pt-4 border border-gray-300 rounded-md">

          <div className="flex">
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-700 mb-6 ml-3 focus:ring-0 focus:border-Orange focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
          </select>
          <input type='text'
           className="bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-gray-700 mb-6 ml-3 w-72 focus:ring-0 focus:border-Orange focus:outline-none"
           onChange={handleSearchChange}
           placeholder="Search users by name..."
           />
          </div>
          <table className="min-w-full text-center text-sm font-light">
            <thead className="border-b text-white border-[#002749] bg-[#002749] h-10">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b text-base hover:bg-gray-50 bg-white">
                  <td className="p-4 hover:bg-gray-50">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      onClick={() => handleEditClick(user)}
                      className="font-semibold px-3 py-1 transition duration-300 ease-in-out"
                    >
                      <FaRegEdit className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user.id)}
                      className="font-semibold px-3 py-1 transition duration-300 ease-in-out ml-2"
                    >
                      <FaTrashAlt className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editingUser && (
            <div className="edit-form">
              <h2>Edit User</h2>
              <form>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  placeholder="Gender"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  required
                />
                <Button onClick={handleSaveEdit}>
                  Save
                </Button>
                {formError && <p className="text-red-500 mt-2">{formError}</p>} {/* Display error message */}
              </form>
            </div>
          )}
        </div>
      </section>
    </div>

  );
}

export default AllUsers;
