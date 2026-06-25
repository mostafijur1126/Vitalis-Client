"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSpinner,
  FaEye,
  FaCheck,
  FaTimes,
  FaUserCircle,
  FaCalendarAlt,
  FaTag,
  FaClock,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import {
  getAllTrainerApplication,
  approveTrainerApplication,
  rejectTrainerApplication,
  cancelTrainerApplication,
} from "@/lib/api/getTrainerApplication";

export default function AppliedTrainersPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);

  const pendingApplications = applications.filter(
    (app) => app.status?.toLowerCase() === "pending",
  );
  const pendingCount = pendingApplications.length;

  useEffect(() => {
    const loadApps = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        if (!tokenData?.token) {
          throw new Error("Unable to authenticate admin");
        }
        setToken(tokenData.token);

        const data = await getAllTrainerApplication(tokenData.token);
        setApplications(data || []);
      } catch (err) {
        setError(err.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    loadApps();
  }, []);

  const openModal = (app) => {
    setSelectedApp(app);
    setFeedback(app.feedback || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
    setFeedback("");
  };

  const handleAction = async (action) => {
    if (!selectedApp || !token) return;
    setActionLoading(true);
    try {
      if (action === "approve") {
        await approveTrainerApplication(selectedApp._id, feedback, token);
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApp._id
              ? { ...app, status: "approved", feedback }
              : app,
          ),
        );
      } else if (action === "reject") {
        await rejectTrainerApplication(selectedApp._id, feedback, token);
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApp._id
              ? { ...app, status: "rejected", feedback }
              : app,
          ),
        );
      } else if (action === "cancel") {
        await cancelTrainerApplication(selectedApp._id, token);
        setApplications((prev) =>
          prev.filter((app) => app._id !== selectedApp._id),
        );
      }
      closeModal();
    } catch (err) {
      alert(`Failed to ${action}: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 px-4 sm:px-0"
      >
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Applied Trainers
          </h1>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            {pendingCount} pending{" "}
            {pendingCount === 1 ? "application" : "applications"}
          </p>
        </div>

        {pendingCount === 0 ? (
          <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-12 text-center shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
            <p className="text-[#6B655A] dark:text-[#B8B0A6] font-['Inter']">
              No pending trainer applications.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#2D2A24] rounded-xl shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-['Inter'] text-sm">
                <thead className="bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] dark:text-[#B8B0A6]">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Applicant</th>
                    <th className="py-3 px-4 font-semibold">Specialty</th>
                    <th className="py-3 px-4 font-semibold">Experience</th>
                    <th className="py-3 px-4 font-semibold">Applied At</th>
                    <th className="py-3 px-4 font-semibold text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="border-b border-[#E8E0D8] dark:border-[#3A3530] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {app.userImage ? (
                            <Image
                              width={36}
                              height={36}
                              src={app.userImage}
                              alt={app.userName}
                              className="w-9 h-9 rounded-full object-cover border-2 border-[#D4845A]"
                            />
                          ) : (
                            <FaUserCircle className="w-9 h-9 text-[#D4845A]" />
                          )}
                          <div>
                            <p className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                              {app.userName}
                            </p>
                            <p className="text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                              {app.userEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                        {app.specialty}
                      </td>
                      <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                        {app.experience} years
                      </td>
                      <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE] text-sm">
                        {formatDate(app.time)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => openModal(app)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4845A] text-white rounded-lg text-xs font-medium hover:bg-[#B86A42] transition-colors shadow-sm"
                        >
                          <FaEye className="w-3.5 h-3.5" />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#2D2A24] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E8E0D8] dark:border-[#3A3530] max-h-[90vh] overflow-y-auto"
          >
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#2D2A24] dark:text-[#EAE5DE] mb-4">
              Application Details
            </h2>

            <div className="space-y-4">
              {/* Applicant info */}
              <div className="flex items-center gap-3">
                {selectedApp.userImage ? (
                  <Image
                    width={48}
                    height={48}
                    src={selectedApp.userImage}
                    alt={selectedApp.userName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D4845A]"
                  />
                ) : (
                  <FaUserCircle className="w-12 h-12 text-[#D4845A]" />
                )}
                <div>
                  <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                    {selectedApp.userName}
                  </p>
                  <p className="text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                    {selectedApp.userEmail}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[#6B655A] dark:text-[#B8B0A6] flex items-center gap-1">
                    <FaTag className="w-3.5 h-3.5 text-[#D4845A]" />
                    Specialty
                  </p>
                  <p className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                    {selectedApp.specialty}
                  </p>
                </div>
                <div>
                  <p className="text-[#6B655A] dark:text-[#B8B0A6] flex items-center gap-1">
                    <FaCalendarAlt className="w-3.5 h-3.5 text-[#D4845A]" />
                    Experience
                  </p>
                  <p className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                    {selectedApp.experience} years
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[#6B655A] dark:text-[#B8B0A6] flex items-center gap-1">
                  <FaClock className="w-3.5 h-3.5 text-[#D4845A]" />
                  Applied At
                </p>
                <p className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                  {formatDate(selectedApp.appliedAt || selectedApp.time)}
                </p>
              </div>
              <div>
                <p className="text-[#6B655A] dark:text-[#B8B0A6] flex items-center gap-1">
                  <FaTag className="w-3.5 h-3.5 text-[#D4845A]" />
                  Status
                </p>
                <p className="font-medium text-[#2D2A24] dark:text-[#EAE5DE] capitalize">
                  {selectedApp.status || "pending"}
                </p>
              </div>

              {/* Feedback Input */}
              <div>
                <label
                  htmlFor="feedback"
                  className="block font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] mb-1"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  rows="3"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback for the applicant..."
                  className="w-full px-4 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => handleAction("approve")}
                  disabled={actionLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#A68B6E] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#8B7A5E] transition-colors disabled:opacity-50"
                >
                  {actionLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaCheck />
                  )}
                  Approve
                </button>
                <button
                  onClick={() => handleAction("reject")}
                  disabled={actionLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-[#C47A6A] text-[#C47A6A] font-['Inter'] font-medium rounded-lg hover:bg-[#C47A6A] hover:text-white transition-colors disabled:opacity-50"
                >
                  {actionLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTimes />
                  )}
                  Reject
                </button>
                <button
                  onClick={() => handleAction("cancel")}
                  disabled={actionLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#C47A6A] text-[#6B655A] dark:text-[#B8B0A6] font-['Inter'] font-medium rounded-lg hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors disabled:opacity-50"
                >
                  {actionLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTimes />
                  )}
                  Cancel Application
                </button>
                <button
                  onClick={closeModal}
                  className="py-2.5 px-4 text-[#6B655A] dark:text-[#B8B0A6] font-['Inter'] text-sm hover:text-[#2D2A24] dark:hover:text-[#EAE5DE] transition-colors"
                  disabled={actionLoading}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
