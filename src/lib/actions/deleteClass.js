"use server";

export const deleteClassbyId = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-class/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const resData = await res.json();
  return resData;
};

// export const serverMutation = async (path, data, method = "POST") => {
//   const res = await fetch(`${baseUrl}${path}`, {
//     method: method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   // console.log("Status:", res.status);
//   // const text = await res.text();
//   // console.log("Response:", text);

//   // return text ? JSON.parse(text) : {};
//   const resData = res.json();
//   return resData;
// };
