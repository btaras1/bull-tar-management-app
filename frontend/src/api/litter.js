import apiOrigin from './api';

export const getLitterCount = () =>{
    return fetch(`${apiOrigin}/litter/stats`)
    .then(res => res.json());
}