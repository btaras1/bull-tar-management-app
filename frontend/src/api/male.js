import apiOrigin from "./api";

export const getAllMales = (authToken) => {
  return fetch(`${apiOrigin}/male`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const addMale = (male, authToken) => {
  return fetch(`${apiOrigin}/male`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(male),
  }).then((res) => res.json());
};
export const deleteMale = (id, authToken) => {
  return fetch(`${apiOrigin}/male/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  });
};

export const updateMale = (id, male, authToken) => {
  return fetch(`${apiOrigin}/male/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(male),
  });
};
