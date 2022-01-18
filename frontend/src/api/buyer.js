import apiOrigin from "./api";

export const getAllBuyers = (authToken) => {
  return fetch(`${apiOrigin}/buyer`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const getAllBuyersDetail = (authToken) => {
  return fetch(`${apiOrigin}/buyer/detail`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const getBuyerDetail = (authToken, id) => {
  return fetch(`${apiOrigin}/buyer/detail/${id}`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const addBuyer = (buyer, authToken) => {
  return fetch(`${apiOrigin}/buyer`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buyer),
  }).then((res) => res.json());
};

export const deleteBuyer = (id, authToken) => {
  return fetch(`${apiOrigin}/buyer/${id}`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
    method: "DELETE",
  });
};

export const updateBuyer = (id, buyer, authToken) => {
  return fetch(`${apiOrigin}/buyer/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buyer),
  });
};
