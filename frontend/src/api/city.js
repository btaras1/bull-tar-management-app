import apiOrigin from "./api";

export const getAllCitiesByCountryId = (authToken, id) => {
  return fetch(`${apiOrigin}/city/country/${id}`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};
