import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import {
    FormControl,
    Select,
    MenuItem,
    Button,
    Stack,
    Typography
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";

/**
 * Composant permettant de sélectionner un utilisateur dans une liste.
 * Met à jour le contexte utilisateur après validation.
 *
 * @component
 * @returns {JSX.Element} Élément JSX du sélecteur d'utilisateur.
 */
export default function UtilisateurSelector() {
    const { users, currentUser, setCurrentUser } = useContext(UserContext);
    const [selectedId, setSelectedId] = useState(currentUser.id);
    const theme = useTheme();

    // Met à jour l'ID sélectionné lors du changement dans le Select
    const handleChange = (event) => {
        setSelectedId(event.target.value);
    };

    // Applique l'utilisateur sélectionné au contexte
    const handleConfirm = () => {
        const selectedUser = users.find((u) => u.id === selectedId);
        if (selectedUser) {
            setCurrentUser(selectedUser);
        }
    };

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            {/* Titre du sélecteur */}
            <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
                <h4> Sélectionnez un utilisateur :</h4>
            </Typography>

            {/* Menu déroulant des utilisateurs */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
                <Select
                    value={selectedId}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRadius: 1,
                    }}
                >
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.nom} ({user.role})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Bouton de validation */}
            <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<PersonIcon />}
                onClick={handleConfirm}
                sx={{ borderRadius: 2, textTransform: "none" }}
            >
                Valider
            </Button>
        </Stack>
    );
}
