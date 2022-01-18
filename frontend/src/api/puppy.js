import apiOrigin from "./api";

export const getPuppyCount = (authToken) => {
  return fetch(`${apiOrigin}/puppy/stats`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const updatePuppy = (id, puppy, authToken) => {
  return fetch(`${apiOrigin}/puppy/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(puppy),
  });
};

export const addPuppy = (id, puppy, authToken) => {
  return fetch(`${apiOrigin}/puppy/${id}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(puppy),
  });
};

export const deletePuppy = (id, authToken) => {
  return fetch(`${apiOrigin}/puppy/${id}`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
    method: "DELETE",
  });
};

export const addBuyerToPuppy = (id, buyer, authToken) => {
  return fetch(`${apiOrigin}/puppy/buyer/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buyer),
  }).then((res) => res.json());
};
