const BASE_URL = "http://localhost:8080";


export async function fetchAvailableNouvelleAsync() {
    const reponse = await fetch('http://localhost:8080/nouvelles');
    if (!reponse.ok) {
        throw new Error("Echec de chargement des nouvelles")
    }
    return await reponse.json();

}

export async function addNouvelle(nouvelle) {
    const reponse = await fetch('http://localhost:8080/nouvelles/ajout',
        {
            method: 'POST',
            body: JSON.stringify(nouvelle),
            headers:
                {
                    'Content-Type': 'application/json'
                }
        })
    if (!reponse.ok) {
        const raison = await reponse.json();
        throw new Error('La nouvelle n\'a pas pu etre creee ' + raison.message);
    }
    return await reponse.json();
}

export async function deleteNouvelle(id) {
    const reponse = await fetch(`${BASE_URL}/nouvelles/delete/${id}`, {
        method: 'DELETE'
    });

    if (!reponse.ok) {
        const raison = await reponse.text();
        throw new Error("Échec de la suppression : " + raison);
    }
}

export async function updateNouvelle(id, nouvellePartielle) {
    const reponse = await fetch(`${BASE_URL}/nouvelles/${id}`, {
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

    const url = `${BASE_URL}/criteres`;
    const rep = await fetch(url);

    if (!rep.ok) {
        throw new Error('Echec chargement des criteres ');
    }
    return await rep.json();
}

export async function ajouterCritere(critere) {

    const rep = await fetch(`${BASE_URL}/critere/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(critere)
    });
    if (!rep.ok) {
        throw new Error("Erreur lors de l'ajout du critère");
    }
    return await rep.json();
}

export async function supprimerCritere(id) {
    const rep = await fetch(`${BASE_URL}/criteres/delete/${id}`, {
        method: "DELETE"
    });
    if (!rep.ok) {
        throw new Error(`Échec de la suppression (HTTP ${rep.status})`);
    }
    // Si le backend renvoie du JSON, on le lit; sinon on renvoie null
    try {
        return await rep.json();
    } catch {
        return null;
    }


}

export async function modifierCritere(id, nouveau) {

    const response = await fetch(`${BASE_URL}/criteres/patch/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(nouveau)
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du critère");
    }
    return await response.json();
}

export async function fetchAvailableUserAsync() {

    const url = `${BASE_URL}/utilisateurs`;
    const rep = await fetch(url);

    if (!rep.ok) {
        throw new Error('Echec chargement des utilisateurs ');
    }
    return await rep.json();
}

