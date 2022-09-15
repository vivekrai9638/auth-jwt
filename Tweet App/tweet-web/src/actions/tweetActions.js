const BASE_URL = "http://localhost:8085/api/v1.0/tweets";

export const getAll = async (token) => {
  const response = await fetch(`${BASE_URL}/all`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};


export const addTweet = async (username, token, data) => {
  const response = await fetch(`${BASE_URL}/${username}/add`, {
    method: "POST",
    body: data,
    mode:'cors',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};


export const addReply = async (username, tweetId, token, data) => {
  const response = await fetch(`${BASE_URL}/${username}/reply/${tweetId}`, {
    method: "POST",
    body: data,
    mode:'cors',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};


export const likeTweet = async (username, tweetId, token) => {
  const response = await fetch(`${BASE_URL}/${username}/like/${tweetId}`, {
    method: "POST",
    mode:'cors',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
