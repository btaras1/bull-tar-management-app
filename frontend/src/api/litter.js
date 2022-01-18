import apiOrigin from "./api";

export const getLitterCount = (authToken) => {
  return fetch(`${apiOrigin}/litter/stats`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const getAllLitters = (authToken) => {
  return fetch(`${apiOrigin}/litter`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const getLastLitter = (authToken) => {
  return fetch(`${apiOrigin}/litter/last`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const addLitter = (litter, authToken) => {
  return fetch(`${apiOrigin}/litter`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(litter),
  }).then((res) => res.json());
};

export const updateLitter = (id, litter, authToken) => {
  return fetch(`${apiOrigin}/litter/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(litter),
  });
};

export const addPuppyToLitter = (id, puppy, authToken) => {
  return fetch(`${apiOrigin}/litter/puppy/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(puppy),
  }).then((res) => res.json());
};

export const deleteLitter = (id, authToken) => {
  return fetch(`${apiOrigin}/litter/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });
};
