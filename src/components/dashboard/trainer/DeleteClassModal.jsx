"use client";

import { deleteClassbyId } from "@/lib/actions/deleteClass";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export function DeleteClassModal({ classes, onDelete }) {
  const classId = classes._id;
  const handleDelete = async (classId) => {
    try {
      const result = await deleteClassbyId(classId);

      if (result.deletedCount > 0) {
        toast.success("Delete Successfully!");

        onDelete?.();
      }
    } catch (error) {
      toast.error("Delete Failed!");
    }
  };
  return (
    <AlertDialog>
      <Button
        className="bg-transparent p-1.5 text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#C47A6A] transition-colors"
        title="Delete"
      >
        <FaTrash className="w-4 h-4" />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete class permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>{classes.className}</strong> and all of its data. This
                action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(classes._id)}
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
  );
}
