// src/context/UserContext.jsx
import { createContext, useState } from "react";
import {utilisateurs} from "../scripts/utilisateurs.js";


/**
 * UserContext
 * -----------
 * Contexte global permettant de partager la liste des utilisateurs
 * et l'utilisateur courant dans toute l'application.
 *
 * @type {React.Context<{
 *   users: Array,
 *   currentUser: Object,
 *   setCurrentUser: Function
 * }>}
 */
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users] = useState(utilisateurs);
    const [currentUser, setCurrentUser] = useState(users[0]);

    // currentUser : utilisateur actuellement sélectionné dans l'application
    // setCurrentUser : permet de changer l'utilisateur courant
    return (
        <UserContext.Provider value={{ users, currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
