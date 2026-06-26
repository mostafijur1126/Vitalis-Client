"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSpinner,
  FaUserCircle,
  FaChalkboardTeacher,
  FaUser,
} from "react-icons/fa";
import { getAllTrainer } from "@/lib/api/getTrainerApplication";
import { authClient } from "@/lib/auth-client";
import { setUserRole } from "@/lib/api/user";
import toast from "react-hot-toast";
import Image from "next/image";

const demoteTrainer = async (trainerId, token) => {
  return setUserRole(trainerId, "user", token);
};

export default function ManageTrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const loadTrainers = async () => {
      const { data: token } = await authClient.token();

      if (!token) {
        toast.error("Authentication failed. Please login again.");
        setLoading(false);
        return;
      }
      try {
        const data = await getAllTrainer(token.token);
        setTrainers(data);
      } catch (err) {
        setError(err.message || "Failed to load trainers");
      } finally {
        setLoading(false);
      }
    };
    loadTrainers();
  }, []);

  const handleDemote = async (trainer) => {
    const { data: token } = await authClient.token();
    if (!token) {
      toast.error("Authentication failed. Please login again.");
      return;
    }

    setActionLoading(trainer._id);
    try {
      await demoteTrainer(trainer._id, token.token);
      setTrainers((prev) => prev.filter((t) => t._id !== trainer._id));
      toast.success(`${trainer.name} was demoted to User.`);
    } catch (err) {
      toast.error("Failed to demote trainer: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 px-4 sm:px-0"
    >
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
          Manage Trainers
        </h1>
        <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
          {trainers.length} active{" "}
          {trainers.length === 1 ? "trainer" : "trainers"}
        </p>
      </div>

      {trainers.length === 0 ? (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-12 text-center shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
          <p className="text-[#6B655A] dark:text-[#B8B0A6] font-['Inter']">
            No active trainers on the platform.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] dark:text-[#B8B0A6]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Trainer</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold">Specialty</th>
                  <th className="py-3 px-4 font-semibold">Classes</th>
                  <th className="py-3 px-4 font-semibold">Joined</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {trainers.map((trainer) => (
                  <tr
                    key={trainer._id}
                    className="border-b border-[#E8E0D8] dark:border-[#3A3530] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {trainer.image ? (
                          <Image
                            src={trainer.image}
                            alt={trainer.name}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover border-2 border-[#D4845A]"
                          />
                        ) : (
                          <FaUserCircle className="w-9 h-9 text-[#D4845A]" />
                        )}
                        <span className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                          {trainer.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                      {trainer.email}
                    </td>
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                      <span className="inline-block px-2.5 py-0.5 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-full text-xs text-[#D4845A]">
                        {trainer.specialty}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                      <span className="flex items-center gap-1.5">
                        <FaChalkboardTeacher className="w-3.5 h-3.5 text-[#D4845A]" />
                        {trainer.classesCount}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE] text-xs">
                      {formatDate(trainer.joinedAt)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <AlertDialog>
                        <Button
                          disabled={actionLoading === trainer._id}
                          className=" bg-transparent inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#C47A6A] text-[#C47A6A] rounded-lg text-xs font-medium hover:bg-[#C47A6A] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading === trainer._id ? (
                            <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <FaUser className="w-3.5 h-3.5" />
                          )}
                          Demote to User
                        </Button>
                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-[400px]">
                              <AlertDialog.CloseTrigger />
                              <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                  Demote to User?
                                </AlertDialog.Heading>
                              </AlertDialog.Header>
                              <AlertDialog.Body>
                                <p>
                                  This will permanently demote{" "}
                                  <strong>{trainer.name}</strong> to a regular
                                  user. This action cannot be undone.
                                </p>
                              </AlertDialog.Body>
                              <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handleDemote(trainer)}
                                  slot="close"
                                  variant="danger"
                                >
                                  Delete
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
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
