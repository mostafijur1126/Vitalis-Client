"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaDumbbell,
  FaEdit,
  FaFileAlt,
  FaImage,
  FaLevelUpAlt,
  FaTag,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { Modal, Button, Surface } from "@heroui/react";
import { UpdateClass } from "@/lib/actions/updateClasses";
import { imageUpload } from "@/lib/imgUpload";

const EditModal = ({ classes, onUpdated }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [className, setClassName] = useState(classes?.className || "");
  const [classImage, setClassImage] = useState(classes?.classImage || "");
  const [category, setCategory] = useState(classes?.category || "HIIT");
  const [difficultyLevel, setDifficultyLevel] = useState(
    classes?.difficultyLevel || "Advanced",
  );
  //   console.log(classImage);
  const [duration, setDuration] = useState(classes?.duration || 45);
  const [price, setPrice] = useState(classes?.price || 0);
  const [slot, setSlot] = useState(classes?.slot || 20);
  const [description, setDescription] = useState(classes?.description || "");
  const [time, setTime] = useState(
    classes?.time?.replace(" AM", "").replace(" PM", "") || "08:00",
  );
  const [selectedDays, setSelectedDays] = useState(
    classes?.classSchedule ? classes.classSchedule.split(", ") : [],
  );
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleImageRemove = () => setClassImage("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedData = {
      className,
      classImage,
      category,
      difficultyLevel,
      duration: Number(duration),
      price: Number(price),
      slot: Number(slot),
      description,
      classSchedule: selectedDays.join(", "),
      time: time + " AM",
      authorId: user?.id,
    };

    try {
      const data = await UpdateClass(classes._id, updatedData);
      //   console.log(data);

      if (data.modifiedCount > 0) {
        toast.success("Class updated successfully!");
        onUpdated?.();
      } else {
        toast.error("No changes made!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update class!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <Button
        className="bg-transparent p-1.5 text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A] transition-colors"
        title="Edit"
      >
        <FaEdit className="w-4 h-4" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-4xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Class</Modal.Heading>
              <p className="mt-1.5 text-sm text-muted">
                Update the class details below.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-5">
                      {/* Class Name */}
                      <div>
                        <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                          <FaDumbbell className="text-[#D4845A] w-4 h-4" />
                          CLASS NAME
                        </label>
                        <input
                          type="text"
                          value={className}
                          onChange={(e) => setClassName(e.target.value)}
                          placeholder="Fitness Class"
                          className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 font-['Inter'] text-sm"
                        />
                      </div>

                      {/* Class Image */}
                      <div>
                        <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                          <FaImage className="text-[#D4845A] w-4 h-4" />
                          CLASS IMAGE
                        </label>
                        {uploading ? (
                          <div className="w-full h-48 flex items-center justify-center border rounded-lg">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-[#D4845A]" />
                          </div>
                        ) : classImage ? (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                            <Image
                              src={classImage}
                              alt="Class preview"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                            <button
                              type="button"
                              onClick={handleImageRemove}
                              className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full"
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="w-full h-48 bg-[#F5EDE6] dark:bg-[#3A3530] border-2 border-dashed border-[#E8E0D8] dark:border-[#4A4540] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#D4845A] transition-colors">
                              <FaImage className="w-8 h-8 text-[#6B655A] mb-2" />
                              <p className="font-['Inter'] text-sm text-[#6B655A]">
                                Click to upload or drag & drop
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                  setUploading(true);
                                  const image = await imageUpload(file);
                                  setClassImage(image.url);
                                } catch (error) {
                                  console.error(error);
                                } finally {
                                  setUploading(false);
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Category */}
                      <div>
                        <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                          <FaTag className="text-[#D4845A] w-4 h-4" />
                          CATEGORY
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] font-['Inter'] text-sm appearance-none"
                        >
                          {[
                            "Yoga",
                            "HIIT",
                            "Weights",
                            "Pilates",
                            "Cardio",
                            "Stretching",
                          ].map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                      {/* Duration */}
                      <div>
                        <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                          <FaClock className="text-[#D4845A] w-4 h-4" />
                          DURATION
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={duration}
                            onChange={(e) =>
                              setDuration(parseInt(e.target.value) || 0)
                            }
                            className="w-24 px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] font-['Inter'] text-sm"
                          />
                          <span className="font-['Inter'] text-sm text-[#6B655A]">
                            mins
                          </span>
                        </div>
                      </div>

                      {/* Schedule Days */}
                      <div>
                        <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                          <FaCalendarAlt className="text-[#D4845A] w-4 h-4" />
                          CLASS SCHEDULE DAYS
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {days.map((day) => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => toggleDay(day)}
                              className={`px-3 py-1.5 rounded-md font-['Inter'] text-sm font-medium transition-all ${
                                selectedDays.includes(day)
                                  ? "bg-[#D4845A] text-white shadow-sm"
                                  : "bg-[#F5EDE6] dark:bg-[#3A3530] text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#E8E0D8]"
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time */}
                      <div>
                        <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                          <FaClock className="text-[#D4845A] w-4 h-4" />
                          TIME
                        </label>
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] font-['Inter'] text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Full width fields */}
                  <div className="space-y-5">
                    {/* Description */}
                    <div>
                      <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                        <FaFileAlt className="text-[#D4845A] w-4 h-4" />
                        DESCRIPTION
                      </label>
                      <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the class..."
                        className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] focus:outline-none focus:border-[#D4845A] font-['Inter'] text-sm resize-none"
                      />
                    </div>

                    {/* Difficulty, Price, Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                          <FaLevelUpAlt className="text-[#D4845A] w-4 h-4" />
                          DIFFICULTY
                        </label>
                        <select
                          value={difficultyLevel}
                          onChange={(e) => setDifficultyLevel(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] font-['Inter'] text-sm appearance-none"
                        >
                          {["Beginner", "Intermediate", "Advanced"].map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                          <FaDollarSign className="text-[#D4845A] w-4 h-4" />
                          PRICE ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={price}
                          onChange={(e) =>
                            setPrice(parseFloat(e.target.value) || 0)
                          }
                          className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] font-['Inter'] text-sm"
                        />
                      </div>

                      <div>
                        <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                          <FaUsers className="text-[#D4845A] w-4 h-4" />
                          SLOT
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={slot}
                          onChange={(e) =>
                            setSlot(parseInt(e.target.value) || 0)
                          }
                          className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] font-['Inter'] text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 font-['Inter'] font-semibold rounded-lg shadow-md transition-colors flex items-center gap-2 ${
                        isSubmitting
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-[#D4845A] text-white hover:bg-[#B86A42]"
                      }`}
                    >
                      {isSubmitting ? "Updating..." : "Update Class"}
                    </button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditModal;
