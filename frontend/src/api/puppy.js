import apiOrigin from './api';

export const getPuppyCount = () =>{
    return fetch(`${apiOrigin}/puppy/stats`)
    .then(res => res.json());
}