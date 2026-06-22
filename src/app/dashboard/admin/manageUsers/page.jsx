"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaUserCircle,
  FaSpinner,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { getAllUsers } from "@/lib/api/user";
import { updateUserRole, blockUser, unblockUser } from "@/lib/actions/users";
import toast from "react-hot-toast";

export default function ManageUsersPage() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    setFilteredUsers(
      !query
        ? users
        : users.filter(
            (u) =>
              u.name.toLowerCase().includes(query) ||
              u.email.toLowerCase().includes(query),
          ),
    );
  }, [searchQuery, users]);

  const handleBlockToggle = async (userId, currentStatus) => {
    setActionLoading(userId);
    try {
      if (currentStatus === "active") {
        await blockUser(userId);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, status: "blocked" } : u)),
        );
        toast.success("User blocked!");
      } else {
        await unblockUser(userId);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, status: "active" } : u)),
        );
        toast.success("User unblocked!");
      }
    } catch (err) {
      toast.error("Action failed!");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setActionLoading(userId);
    try {
      await updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
      );
      toast.success(`Role updated to ${newRole}!`);
    } catch (err) {
      toast.error("Failed to update role!");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="w-8 h-8 text-[#D4845A] animate-spin" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 px-4 sm:px-0"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Manage Users
          </h1>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "user" : "users"} found
          </p>
        </div>
        <div className="relative max-w-sm w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-[#6B655A] dark:text-[#B8B0A6]" />
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#2D2A24] border border-[#E8E0D8] dark:border-[#3A3530] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 font-['Inter'] text-sm"
          />
        </div>
      </div>

      {/* Table */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-12 text-center shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
          <p className="text-[#6B655A] dark:text-[#B8B0A6] font-['Inter']">
            No users found.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] dark:text-[#B8B0A6]">
                <tr>
                  <th className="py-3 px-4 font-semibold">User</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold">Role</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-[#E8E0D8] dark:border-[#3A3530] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                  >
                    {/* User */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover border-2 border-[#D4845A]"
                          />
                        ) : (
                          <FaUserCircle className="w-9 h-9 text-[#D4845A]" />
                        )}
                        <span className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                      {user.email}
                    </td>

                    {/* Role Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-[#D4845A]/20 text-[#D4845A]"
                            : user.role === "trainer"
                              ? "bg-[#A68B6E]/20 text-[#A68B6E]"
                              : "bg-[#6B655A]/20 text-[#6B655A]"
                        }`}
                      >
                        {user.role?.charAt(0).toUpperCase() +
                          user.role?.slice(1)}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-[#A68B6E]/20 text-[#A68B6E]"
                            : "bg-[#C47A6A]/20 text-[#C47A6A]"
                        }`}
                      >
                        {user.status === "active" ? (
                          <>
                            <FaCheck className="w-3 h-3" /> Active
                          </>
                        ) : (
                          <>
                            <FaTimes className="w-3 h-3" /> Blocked
                          </>
                        )}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      {user._id !== currentUser?.id && (
                        <div className="flex items-center justify-end gap-2">
                          {/* Role Dropdown */}
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value)
                            }
                            disabled={actionLoading === user._id}
                            className="px-2 py-1.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-xs text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] disabled:opacity-50"
                          >
                            <option value="member">Member</option>
                            <option value="trainer">Trainer</option>
                            <option value="admin">Admin</option>
                          </select>

                          {/* Block/Unblock */}
                          <button
                            onClick={() =>
                              handleBlockToggle(user._id, user.status)
                            }
                            disabled={actionLoading === user._id}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
                              user.status === "active"
                                ? "border border-[#C47A6A] text-[#C47A6A] hover:bg-[#C47A6A] hover:text-white"
                                : "border border-[#A68B6E] text-[#A68B6E] hover:bg-[#A68B6E] hover:text-white"
                            }`}
                          >
                            {actionLoading === user._id ? (
                              <FaSpinner className="w-3 h-3 animate-spin mx-2" />
                            ) : user.status === "active" ? (
                              "Block"
                            ) : (
                              "Unblock"
                            )}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
