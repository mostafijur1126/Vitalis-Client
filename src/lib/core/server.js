const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path, token = null) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
    },
  });

  // handle 401,403
  const data = await res.json();
  return data;
};

export const serverMutation = async (path, data, token, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Server error:${res.status} - ${errText}`);
  }
  return res.json();
};
