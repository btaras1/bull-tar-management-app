import apiOrigin from './api';

export const getAllMatings = () =>{
    return fetch(`${apiOrigin}/mating`)
    .then(res => res.json());
}