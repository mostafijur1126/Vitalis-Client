export const imageUpload = async (image) => {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) {
    throw new Error("ImgBB API key is not configured. Set NEXT_PUBLIC_IMGBB_KEY.");
  }

  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`, {
    method: "POST",
    body: formData,
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new Error(`ImgBB upload failed: ${text}`);
  }

  if (!res.ok || !data.success) {
    const message = data?.error?.message || data?.status_msg || "ImgBB upload failed.";
    throw new Error(message);
  }

  return data.data;
};
