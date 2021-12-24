import apiOrigin from './api';

export const getAllFemales = () =>{
    return fetch(`${apiOrigin}/female`)
    .then(res => res.json());
}

export const getFemaleMatingCount = () =>{
    return fetch(`${apiOrigin}/female/mating`)
    .then(res => res.json());
}

export const addFemale = female =>{
    return fetch( `${apiOrigin}/female` , {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(female),
    })
    .then(res => res.json());
}

export const deleteFemale = id =>{
    return fetch( `${apiOrigin}/female/${id}` , {
        method: 'DELETE' ,
    });
}