import apiOrigin from './api';

export const getAllMatings = () =>{
    return fetch(`${apiOrigin}/mating`)
    .then(res => res.json());
}

export const addMating = mating =>{
    return fetch( `${apiOrigin}/mating` , {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mating),
    })
    .then(res => res.json());
}

export const getMatingsWithoutLitter = () =>{
    return fetch(`${apiOrigin}/mating/nolitter`)
    .then(res => res.json());
}