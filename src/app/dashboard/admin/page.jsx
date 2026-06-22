"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCheckCircle,
  FaMoneyBillWave,
  FaUserCircle,
  FaChartPie,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { authClient } from "@/lib/auth-client";
import { getAllUsers } from "@/lib/api/user";
import Image from "next/image";
import { getclasses } from "@/lib/api/allClass";

const COLORS = ["#D4845A", "#A68B6E", "#C9A87C", "#E8C4A8"];

export default function AdminDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        const classes = await getclasses();
        setClasses(classes);
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const adminCount = users.filter((u) => u.role === "admin").length;
  const trainerCount = users.filter((u) => u.role === "trainer").length;
  const memberCount = users.filter((u) => u.role === "member").length;
  const totalUsers = users.length;
  const totalClasses = classes.length;

  const roleData = [
    { name: "Admin", value: adminCount },
    { name: "Trainer", value: trainerCount },
    { name: "Member", value: memberCount },
  ];

  const categoryData = [
    { name: "Cardio", value: 45 },
    { name: "Weights", value: 30 },
    { name: "Combat", value: 25 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-[#D4845A] border-t-transparent rounded-full animate-spin" />
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
      {/* Header */}
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
          Admin Overview
        </h1>
        <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
          Welcome back, {user?.name?.split(" ")[0] || "Admin"}!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: totalUsers, icon: FaUsers },
          { label: "Total Classes", value: totalClasses, icon: FaUserCircle },
          {
            label: "Total Booked Classes",
            value: trainerCount,
            icon: FaCheckCircle,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-[#2D2A24] rounded-xl p-5 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] flex items-center gap-4"
          >
            <div className="p-3 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-lg">
              <stat.icon className="w-6 h-6 text-[#D4845A]" />
            </div>
            <div>
              <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                {stat.label}
              </p>
              <p className="font-['Inter'] text-2xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Profile + Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-6 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] flex flex-col items-center text-center">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#D4845A]"
            />
          ) : (
            <FaUserCircle className="w-20 h-20 text-[#D4845A]" />
          )}
          <h3 className="font-['Inter'] text-xl font-semibold text-[#2D2A24] dark:text-[#EAE5DE] mt-3">
            {user?.name || "Admin"}
          </h3>
          <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
            {user?.email}
          </p>
          <span className="mt-2 px-4 py-1 bg-[#D4845A] text-white font-['Inter'] text-sm font-semibold rounded-full">
            Administrator
          </span>

          <div className="mt-4 w-full space-y-2">
            {[
              { label: "Admins", value: adminCount, color: "bg-[#D4845A]" },
              { label: "Trainers", value: trainerCount, color: "bg-[#A68B6E]" },
              { label: "Members", value: memberCount, color: "bg-[#C9A87C]" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-2"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                    {item.label}
                  </span>
                </div>
                <span className="font-['Inter'] text-xs font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-6 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
          <h3 className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-sm mb-4 flex items-center gap-2">
            <FaChartPie className="text-[#D4845A]" />
            Classes by Category
          </h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => `${v} classes`}
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E8E0D8",
                    borderRadius: "8px",
                  }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-6 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
          <h3 className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-sm mb-4 flex items-center gap-2">
            <FaChartPie className="text-[#D4845A]" />
            User Role Distribution
          </h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {roleData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} users`, name]}
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E8E0D8",
                    borderRadius: "8px",
                  }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
