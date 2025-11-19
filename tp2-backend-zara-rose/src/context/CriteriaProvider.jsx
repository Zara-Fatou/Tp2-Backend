import { useEffect, useState } from "react";
import {
    fetchAvailableCriteriaAsync,
    ajouterCritereFetch,
    supprimerCritereFetch
} from "../scripts/http.js";

import { CriteriaContext } from "./CriteriaContext";

export default function CriteriaProvider({ children }) {

    const [criteres, setCriteres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Chargement initial
    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const data = await fetchAvailableCriteriaAsync();
                setCriteres(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const ajouter = async (critere) => {
        const nouveau = await ajouterCritereFetch(critere);
        setCriteres((avant) => [...avant, nouveau]);
    };

    const supprimer = async (id) => {
        await supprimerCritereFetch(id);
        setCriteres((avant) => avant.filter((c) => c.idCritere !== id));
    };

    return (
        <CriteriaContext.Provider
            value={{
                criteres,
                ajouterCritere: ajouter,
                supprimerCritere: supprimer,
                loading,
                error
            }}
        >
            {children}
        </CriteriaContext.Provider>
    );
}
