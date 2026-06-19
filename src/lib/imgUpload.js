export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );
  //   console.log(process.env.NEXT_PUBLIC_IMGBB_KEY);
  const data = await res.json();
  //   console.log(data);
  return data.data;
};
