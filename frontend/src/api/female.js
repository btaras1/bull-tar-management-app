import apiOrigin from './api';

export const getAllFemales = () =>{
    return fetch(`${apiOrigin}/female`)
    .then(res => res.json());
}

export const getFemaleMatingCount = () =>{
    return fetch(`${apiOrigin}/female/mating`)
    .then(res => res.json());
}