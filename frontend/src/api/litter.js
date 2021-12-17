import apiOrigin from './api';

export const getLitterCount = () =>{
    return fetch(`${apiOrigin}/litter/stats`)
    .then(res => res.json());
}

export const getAllLitters = () =>{
    return fetch(`${apiOrigin}/litter`)
    .then(res => res.json());
}

export const getLastLitter = () =>{
    return fetch(`${apiOrigin}/litter/last`)
    .then(res => res.json());
}