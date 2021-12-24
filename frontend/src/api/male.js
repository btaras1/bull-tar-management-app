import apiOrigin from './api';

export const getAllMales = () =>{
    return fetch(`${apiOrigin}/male`)
    .then(res => res.json());
}

export const addMale = male =>{
    return fetch( `${apiOrigin}/male` , {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(male),
    })
    .then(res => res.json());
}
export const deleteMale = id =>{
    return fetch( `${apiOrigin}/male/${id}` , {
        method: 'DELETE' ,
    });
}