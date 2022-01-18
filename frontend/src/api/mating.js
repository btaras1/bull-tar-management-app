import apiOrigin from "./api";

export const getAllMatings = (authToken) => {
  return fetch(`${apiOrigin}/mating`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const addMating = (mating, authToken) => {
  return fetch(`${apiOrigin}/mating`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mating),
  }).then((res) => res.json());
};

export const getMatingsWithoutLitter = (authToken) => {
  return fetch(`${apiOrigin}/mating/nolitter`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const updateMating = (id, mating, authToken) => {
  return fetch(`${apiOrigin}/mating/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mating),
  });
};

export const deleteMating = (id, authToken) => {
  return fetch(`${apiOrigin}/mating/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });
};
