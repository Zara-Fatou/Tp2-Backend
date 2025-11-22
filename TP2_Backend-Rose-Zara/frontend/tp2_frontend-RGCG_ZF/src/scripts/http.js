export async function fetchAvailableNouvelleAsync(){
    const reponse = await fetch('http://localhost:8080/nouvelles');
    if (!reponse.ok){
        throw new Error("Echec de chargement des nouvelles")
    }
    return await reponse.json();

}

export async function addNouvelle(nouvelle){
    const reponse = await fetch('http://localhost:8080/nouvelles/ajout',
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
    return await reponse.json();
}

export async function deleteNouvelle(id) {
    const reponse = await fetch(`http://localhost:8080/nouvelles/delete/${id}`, {
        method: 'DELETE'
    });

    if (!reponse.ok) {
        const raison = await reponse.text();
        throw new Error("Échec de la suppression : " + raison);
    }
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
        const raison = await reponse.text();
        throw new Error('Échec de la mise à jour : ' + raison);
    }

    return await reponse.json();
}

export async function fetchAvailableCriteriaAsync() {
    try {
        const rep = await fetch('http://localhost:8080/criteres');
        if (!rep.ok) throw new Error('Erreur HTTP ' + rep.status);
        return await rep.json();
    } catch (err) {
        console.error('Erreur fetchAvailableCriteriaAsync : ' + err);
        throw err;
    }
}

// export async function getCritere(){
//     try {
//
//     } catch (err) {
//         console.error('Erreur criteres: ', err)
//         th
//     }
// }