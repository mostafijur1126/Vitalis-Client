"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaSpinner,
  FaCheck,
  FaTimes,
  FaTrash,
  FaUser,
  FaDollarSign,
  FaTag,
  FaEye,
} from "react-icons/fa";
import {
  getAdminAllClasses,
  approveClassByAdmin,
  rejectClassByAdmin,
  deleteClassByAdmin,
} from "@/lib/api/allClass";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const approveClass = async (classId) => {
  const { data: token } = await authClient.token();
  if (!token) throw new Error("Authentication required");
  return approveClassByAdmin(classId, token.token);
};

const rejectClass = async (classId) => {
  const { data: token } = await authClient.token();
  if (!token) throw new Error("Authentication required");
  return rejectClassByAdmin(classId, token.token);
};

const deleteClass = async (classId) => {
  const { data: token } = await authClient.token();
  if (!token) throw new Error("Authentication required");
  return deleteClassByAdmin(classId, token.token);
};

export default function ManageClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await getAdminAllClasses();
        setClasses(data);
      } catch (err) {
        setError(err.message || "Failed to load classes");
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, []);

  const handleApprove = async (classId) => {
    setActionLoading(classId);
    try {
      await approveClass(classId);
      setClasses((prev) =>
        prev.map((cls) =>
          cls._id === classId ? { ...cls, status: "approved" } : cls,
        ),
      );
      toast.success("Class approved successfully.");
    } catch (err) {
      toast.error("Failed to approve class: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (classId) => {
    setActionLoading(classId);
    try {
      await rejectClass(classId);
      setClasses((prev) =>
        prev.map((cls) =>
          cls._id === classId ? { ...cls, status: "rejected" } : cls,
        ),
      );
      toast.success("Class rejected successfully.");
    } catch (err) {
      toast.error("Failed to reject class: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (classId) => {
    setActionLoading(classId);
    try {
      await deleteClass(classId);
      toast.success("Class deleted successfully.");
      setClasses((prev) => prev.filter((cls) => cls._id !== classId));
    } catch (err) {
      toast.error("Failed to delete class: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#A68B6E]/20 text-[#A68B6E] dark:bg-[#A68B6E]/30 dark:text-[#A68B6E]">
            <FaCheck className="w-3 h-3" /> Approved
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#D4A050]/20 text-[#D4A050] dark:bg-[#D4A050]/30 dark:text-[#D4A050]">
            <FaTimes className="w-3 h-3" /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#C47A6A]/20 text-[#C47A6A] dark:bg-[#C47A6A]/30 dark:text-[#C47A6A]">
            <FaTimes className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[#6B655A]/20 text-[#6B655A] dark:bg-[#6B655A]/30 dark:text-[#B8B0A6]">
            {status.toUpperCase()}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="w-8 h-8 text-[#D4845A] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#C47A6A] font-['Inter']">{error}</p>
      </div>
    );
  }

  const pendingCount = classes.filter((cls) => cls.status === "pending").length;
  const approvedCount = classes.filter(
    (cls) => cls.status === "approved",
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 px-4 sm:px-0"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Manage Classes
          </h1>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            {classes.length} total classes · {pendingCount} pending ·{" "}
            {approvedCount} approved
          </p>
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-12 text-center shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
          <p className="text-[#6B655A] dark:text-[#B8B0A6] font-['Inter']">
            No classes found.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] dark:text-[#B8B0A6]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Image</th>
                  <th className="py-3 px-4 font-semibold">Class Name</th>
                  <th className="py-3 px-4 font-semibold">Trainer</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr
                    key={cls._id}
                    className="border-b border-[#E8E0D8] dark:border-[#3A3530] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                  >
                    <td className="py-3 px-4">
                      {cls.classImage ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5EDE6] dark:bg-[#3A3530]">
                          <Image
                            src={cls.classImage}
                            alt={cls.className}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-[#F5EDE6] dark:bg-[#3A3530] flex items-center justify-center text-[#6B655A] dark:text-[#B8B0A6] text-xs">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                        {cls.className}
                      </p>
                      <p className="text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                        {cls.classSchedule} · {cls.time}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {cls.authorImage ? (
                          <Image
                            src={cls.authorImage}
                            alt={cls.authorName}
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <FaUser className="w-4 h-4 text-[#6B655A] dark:text-[#B8B0A6]" />
                        )}
                        <span className="text-[#2D2A24] dark:text-[#EAE5DE]">
                          {cls.authorName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-full text-xs text-[#D4845A]">
                        <FaTag className="w-3 h-3" />
                        {cls.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1 text-[#2D2A24] dark:text-[#EAE5DE]">
                        <FaDollarSign className="w-3.5 h-3.5 text-[#D4845A]" />
                        {cls.price}
                      </span>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(cls.status)}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {cls.status !== "approved" && (
                          <button
                            onClick={() => handleApprove(cls._id)}
                            disabled={actionLoading === cls._id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#A68B6E] text-white rounded-lg text-xs font-medium hover:bg-[#8B7A5E] transition-colors disabled:opacity-50"
                          >
                            {actionLoading === cls._id ? (
                              <FaSpinner className="w-3 h-3 animate-spin" />
                            ) : (
                              <FaCheck className="w-3 h-3" />
                            )}
                            Approve
                          </button>
                        )}
                        {cls.status !== "rejected" && (
                          <button
                            onClick={() => handleReject(cls._id)}
                            disabled={actionLoading === cls._id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#D4A050] text-[#D4A050] rounded-lg text-xs font-medium hover:bg-[#D4A050] hover:text-white transition-colors disabled:opacity-50"
                          >
                            {actionLoading === cls._id ? (
                              <FaSpinner className="w-3 h-3 animate-spin" />
                            ) : (
                              <FaTimes className="w-3 h-3" />
                            )}
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(cls._id)}
                          disabled={actionLoading === cls._id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#C47A6A] text-[#C47A6A] rounded-lg text-xs font-medium hover:bg-[#C47A6A] hover:text-white transition-colors disabled:opacity-50"
                        >
                          {actionLoading === cls._id ? (
                            <FaSpinner className="w-3 h-3 animate-spin" />
                          ) : (
                            <FaTrash className="w-3 h-3" />
                          )}
                          Delete
                        </button>
                      </div>
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
