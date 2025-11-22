import { createContext, useState } from "react";

/**
 * CriteriaContext
 * ----------------
 * Contexte global permettant de gérer une liste de critères
 * dans l'application (ajout, suppression, accès).
 *
 * Valeurs exposées par le contexte :
 * - criteres : tableau des critères actuels
 * - ajouterCritere : fonction pour ajouter un critère
 * - supprimerCritere : fonction pour supprimer un critère par son id
 *
 * @type {React.Context<{
 *   criteres: Array,
 *   ajouterCritere: Function,
 *   supprimerCritere: Function
 * }>}
 */
export const CriteriaContext = createContext(false);

/**
 * CriteriaProvider
 * ----------------
 * Composant Provider qui encapsule l'application et rend disponibles
 * les critères et les fonctions associées via le contexte.
 *
 * @component
 * @example
 * return (
 *   <CriteriaProvider>
 *     <App />
 *   </CriteriaProvider>
 * )
 *
 * @param {Object} props - Les propriétés React
 * @param {React.ReactNode} props.children - Composants enfants qui auront accès au contexte
 */
export const CriteriaProvider = ({ children }) => {
    // État contenant la liste des critères
    const [criteres, setCriteres] = useState([]);

    /**
     * Ajouter un critère
     * @param {Object} critere - Le critère à ajouter
     */
    const ajouterCritere = (critere) => {
        setCriteres((avant) => [...avant, critere]);
    };

    /**
     * Supprimer un critère (selon son id)
     * @param {Object} critere - Le critère à supprimer
     */
    const supprimerCritere = (critere) => {
        setCriteres((avant) => avant.filter((c) => c.id !== critere.id));
    };

    return (
        <CriteriaContext.Provider value={{ criteres, ajouterCritere, supprimerCritere }}>
            {children}
        </CriteriaContext.Provider>
    );
};
