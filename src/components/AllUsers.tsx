import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Sidebar from "./Sidebar";
import { Button } from "flowbite-react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import DashboardHeader from "./Header/DashboardHeader";
import Swal from "sweetalert2";

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
    class_id: "", // إضافة class_id هنا
  });
  const [formError, setFormError] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const collections = ["students", "teachers", "parents"];
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersPromises = collections.map(async (collectionName) => {
          const querySnapshot = await getDocs(collection(db, collectionName));
          return querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            role: collectionName.slice(0, -1),
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

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "levels"));
        const classData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("Fetched classes:", classData);
        setClasses(classData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClassData();
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
      class_id: user.class_id || "", // إعداد قيمة class_id
    });
    setFormError("");
  };

  const handleDeleteClick = async (userId) => {
    Swal.fire({
      title: "Are you sure you want to remove this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, selectedRole + "s", userId));
          setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));

          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting user:", error);

          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the user.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleSaveEdit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.gender ||
      !formData.address ||
      !formData.phone
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    try {
      await updateDoc(doc(db, selectedRole + "s", editingUser.id), formData);
      setFilteredUsers(
        filteredUsers.map((user) =>
          user.id === editingUser.id ? { ...user, ...formData } : user
        )
      );
      setEditingUser(null);
      setFormError("");
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

    if (role) {
      filtered = users.filter((user) => user.role === role);
    }

    if (search) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchVal(search);
    filterUsers(selectedRole, search);
  };

  return (
    <div className="flex">
      <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-[100vh] z-50">
        <Sidebar />
      </div>

      <section className="text-[#002749] xl:w-[80%] xl:ml-[20%] lg:w-[75%] lg:ml-[25%] md:w-[70%] md:ml-[30%] sm:m-auto w-full">
        <DashboardHeader pageTitle={"Show All Users"} />
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
            <input
              type="text"
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
                <tr
                  key={user.id}
                  className="border-b text-base hover:bg-gray-50 bg-white"
                >
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
            <div className="edit-form p-4 border border-gray-300 rounded-lg shadow-md mt-4">
              <h2 className="text-xl font-semibold mb-4">Edit User</h2>
              <form>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                  className="border rounded p-2 mb-2 w-full"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="border rounded p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  placeholder="Gender"
                  required
                  className="border rounded p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  required
                  className="border rounded p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  required
                  className="border rounded p-2 mb-2 w-full"
                />
                {editingUser.role === "student" && ( // يظهر خانة class_id فقط عند تعديل الطالب
                  <select
                    name="class_id"
                    value={formData.class_id}
                    onChange={handleInputChange}
                    className="border rounded p-2 mb-2 w-full"
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map((classItem) => (
                      <option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </option>
                    ))}
                  </select>
                )}
                {formError && <p className="text-red-600">{formError}</p>}
                <div className="flex space-x-4">
                  <Button
                    onClick={handleSaveEdit}
                    className="bg-[#002749] text-white"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditingUser(null)}
                    className="bg-red-500 text-white"
                  >
                    Cancel
                  </Button>
                </div>{" "}
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AllUsers;
