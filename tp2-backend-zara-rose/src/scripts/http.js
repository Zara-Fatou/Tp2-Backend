const BASE_URL = "http://localhost:8080";


/**
 * Récupère toutes les nouvelles depuis le backend.
 * @returns {Promise<any>}
 */
export async function fetchAvailableNouvelleAsync() {
    const reponse = await fetch('http://localhost:8080/nouvelles');
    if (!reponse.ok) {
        throw new Error("Echec de chargement des nouvelles")
    }
    return await reponse.json();

}

/**
 * Ajoute une nouvelle au backend.
 * @param nouvelle
 * @returns {Promise<any>}
 */
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

/**
 * Supprime une nouvelle par son id.
 * @param id
 * @returns {Promise<void>}
 */
export async function deleteNouvelle(id) {
    const reponse = await fetch(`${BASE_URL}/nouvelles/delete/${id}`, {
        method: 'DELETE'
    });

    if (!reponse.ok) {
        const raison = await reponse.text();
        throw new Error("Échec de la suppression : " + raison);
    }
}

/**
 * Met à jour une nouvelle partiellement.
 * @param id
 * @param nouvellePartielle
 * @returns {Promise<any>}
 */
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

/**
 * Récupère tous les critères du backend.
 * @returns {Promise<any>}
 */
export async function fetchAvailableCriteriaAsync() {

    const url = `${BASE_URL}/criteres`;
    const rep = await fetch(url);

    if (!rep.ok) {
        throw new Error('Echec chargement des criteres ');
    }
    return await rep.json();
}

/**
 * Ajoute un critère au backend.
 * @param critere
 * @returns {Promise<any>}
 */
export async function ajouterCritereFetch(critere) {
    const rep = await fetch(`${BASE_URL}/criteres/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(critere)
    });

    if (!rep.ok) throw new Error("Erreur lors de l'ajout du critère");
    return await rep.json();
}



/**
 * Supprime un critère via son id.
 * @param id
 * @returns {Promise<any|null>}
 */
export async function supprimerCritereFetch(id) {
    const rep = await fetch(`${BASE_URL}/criteres/delete/${id}`, {
        method: "DELETE"
    });

    if (!rep.ok) {
        throw new Error(`Échec de la suppression (HTTP ${rep.status})`);
    }

    try {
        return await rep.json();
    } catch {
        return null;
    }
}



/**
 * Récupère tous les utilisateurs disponibles.
 * @returns {Promise<any>}
 */
export async function fetchAvailableUserAsync() {

    const url = `${BASE_URL}/utilisateurs`;
    const rep = await fetch(url);

    if (!rep.ok) {
        throw new Error('Echec chargement des utilisateurs ');
    }
    return await rep.json();
}

