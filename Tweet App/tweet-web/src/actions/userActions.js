const BASE_URL = "http://localhost:8085/api/v1.0/tweets";

export const search = async (username, token) => {
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
