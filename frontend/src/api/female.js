import apiOrigin from "./api";

export const getAllFemales = (authToken) => {
  return fetch(`${apiOrigin}/female`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const getFemaleMatingCount = (authToken) => {
  return fetch(`${apiOrigin}/female/mating`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const addFemale = (female, authToken) => {
  return fetch(`${apiOrigin}/female`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(female),
  }).then((res) => res.json());
};

export const deleteFemale = (id, authToken) => {
  return fetch(`${apiOrigin}/female/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });
};

export const updateFemale = (id, female, authToken) => {
  return fetch(`${apiOrigin}/female/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(female),
  });
};
