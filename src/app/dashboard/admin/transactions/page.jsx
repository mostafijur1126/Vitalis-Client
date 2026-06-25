"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSpinner,
  FaMoneyBillWave,
  FaUser,
  FaCalendarAlt,
  FaHashtag,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const fetchTransactions = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to load transactions: ${res.status} ${errText}`);
  }
  return res.json();
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const { data: token } = await authClient.token();
        if (!token?.token) {
          throw new Error("Unable to retrieve auth token");
        }
        const data = await fetchTransactions(token.token);
        setTransactions(data);
      } catch (err) {
        setError(err.message || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

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

  const truncateId = (id) => {
    if (id.length <= 20) return id;
    return `${id.slice(0, 10)}...${id.slice(-6)}`;
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
          Transactions
        </h1>
        <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
          {transactions.length}{" "}
          {transactions.length === 1 ? "transaction" : "transactions"} recorded
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-12 text-center shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
          <p className="text-[#6B655A] dark:text-[#B8B0A6] font-['Inter']">
            No transactions found.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] dark:text-[#B8B0A6]">
                <tr>
                  <th className="py-3 px-4 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FaUser className="w-3.5 h-3.5" />
                      User Email
                    </span>
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FaMoneyBillWave className="w-3.5 h-3.5" />
                      Amount
                    </span>
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="w-3.5 h-3.5" />
                      Date
                    </span>
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <FaHashtag className="w-3.5 h-3.5" />
                      Transaction ID
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr
                    key={txn._id}
                    className="border-b border-[#E8E0D8] dark:border-[#3A3530] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                      {txn.userEmail}
                    </td>
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                      <span className="font-semibold text-[#D4845A]">
                        ${Number(txn.price || txn.amount || 0).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                      {formatDate(txn.bookedAt || txn.createdAt || txn.date)}
                    </td>
                    <td className="py-4 px-4">
                      <code className="bg-[#F5EDE6] dark:bg-[#3A3530] px-2 py-1 rounded text-xs font-mono text-[#2D2A24] dark:text-[#EAE5DE]">
                        {truncateId(txn.transactionId || txn.sessionId || "-")}
                      </code>
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
