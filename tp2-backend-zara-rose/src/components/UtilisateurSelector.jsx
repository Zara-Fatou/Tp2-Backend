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

export default function UtilisateurSelector() {
    const { users, currentUser, setCurrentUser } = useContext(UserContext);
    const [selectedId, setSelectedId] = useState(currentUser.id);
    const theme = useTheme();

    const handleChange = (event) => {
        setSelectedId(event.target.value);
    };

    const handleConfirm = () => {
        const selectedUser = users.find((u) => u.id === selectedId);
        if (selectedUser) {
            setCurrentUser(selectedUser);
        }
    };

    return (
        <Stack direction="row" spacing={1} alignItems="center">

            {/* TITRE – corrigé, sans div ni h4 */}
            <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
                Sélectionnez un utilisateur :
            </Typography>

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
