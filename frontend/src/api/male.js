import apiOrigin from './api';

export const getAllMales = () =>{
    return fetch(`${apiOrigin}/male`)
    .then(res => res.json());
}