import apiOrigin from "./api";

export const getAllCountries = (authToken) => {
  return fetch(`${apiOrigin}/country/`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};
