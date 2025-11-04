export function fetchAvailableNouvellesFlat(callback, setError){
    fetch('http://localhost:8080/nouvelles')
        .then((value) => value.json())
        .then((reponse) => callback(reponse))
        .catch((error) => setError({error: error.type, message: error.message}))
}

export async function fetchAvailableNouvelleAsync(){
    const reponse = await fetch('http://localhost:8080/Nouvelles');
    if (!reponse.ok){
        throw new Error("Echec de chargement des nouvelles")
    }
    const resData = await reponse.json();
    return resData;
}

export async function addNouvelle(nouvelle){
    const reponse = await fetch('http://localhost:8080/nouvelle/ajout',
        {
            method: 'POST',
            body: JSON.stringify(nouvelle),
            headers:
                {
                    'Content-Type': 'application/json'
                }
        })
    if (!reponse.ok){
        const raison = await reponse.json();
        throw new Error('La nouvelle n\'a pas pu etre creee ' + raison.message);
    }
    const resData = await reponse.json();
    return resData;
}

export async function deleteNouvelle(id) {
    const reponse = await fetch(`http://localhost:8080/nouvelles/delete/${id}`, {
        method: 'DELETE'
    });

    if (!reponse.ok) {
        const raison = await reponse.text();
        throw new Error("Échec de la suppression : " + raison);
    }

    return true; // ou reponse.json() si ton backend renvoie un message
}

export async function updateNouvelle(id, nouvellePartielle) {
    const reponse = await fetch(`http://localhost:8080/nouvelles/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nouvellePartielle)
    });

    if (!reponse.ok) {
        const raison = await reponse.json();
        throw new Error('Échec de la mise à jour : ' + raison.message);
    }

    return await reponse.json();
}
