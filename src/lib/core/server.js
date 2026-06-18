const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  // handle 401,403
  const data = await res.json();
  return data;
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const text = await res.text();
  console.log("Response:", text);

  return JSON.parse(text);
  // const resData = res.json();
  // return resData;
};
