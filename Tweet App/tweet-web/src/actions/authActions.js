const BASE_URL = "http://localhost:8086/api/v1.0/tweets";

export const login = async (username, password) => {
  const response = await fetch(
    `${BASE_URL}/login?username=${username}&password=${password}`
  );
  return response.json();
};

export const register = async (data) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    body: data,
    mode:'cors',
    headers: {
      "Content-Type": "application/json; charset=utf8",
    },
  });
  return response.json();
};
