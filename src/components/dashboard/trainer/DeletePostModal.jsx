"use client";

import { deletePostId } from "@/lib/actions/delete";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export function DeletePostModal({ post }) {
  const postId = post._id;
  const router = useRouter();
  const handleDelete = async (postId) => {
    try {
      const result = await deletePostId(postId);
      if (result.deletedCount > 0) {
        toast.success("Delete Successfully!");
        router.refresh("/dashboard/trainer/my-posts");
      }
    } catch (error) {
      toast.error("Delete Failed!");
    }
  };
  return (
    <AlertDialog>
      <Button
        className="absolute top-3 right-3 z-10 p-1.5 bg-black/60 text-white rounded-full hover:bg-[#C47A6A] transition-colors"
        title="Delete Post"
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
                This will permanently delete <strong>{post.title}</strong> and
                all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(postId)}
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
