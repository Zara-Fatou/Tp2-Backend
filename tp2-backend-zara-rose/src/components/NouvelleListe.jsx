import { useState, useContext } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Stack
} from "@mui/material";
import { utilisateurs } from "../scripts/utilisateurs.js";
import { UserContext } from "../context/UserContext.jsx";
import {addNouvelle} from "../scripts/http.js";

/**
 * Formulaire pour ajouter une nouvelle culturelle.
 *
 * Règles :
 * - Le texte de la nouvelle est initialisé avec le résumé.
 * - L’auteur doit correspondre à l’utilisateur connecté, sauf si celui-ci est admin (id === 1).
 * - Vérifie que l’auteur existe dans la liste des utilisateurs connus.
 *
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.nouvelles - Liste actuelle des nouvelles
 * @param {Function} props.setNouvelles - Setter pour mettre à jour les nouvelles
 * @returns {JSX.Element}
 */
export default function NouvelleListe({ nouvelles, setNouvelles }) {
    const { currentUser } = useContext(UserContext);
    const [lastId, setLastId] = useState(
        nouvelles.length ? Math.max(...nouvelles.map((n) => n.id)) : 0
    );

    /**
     * Gère la soumission du formulaire et ajoute une nouvelle.
     * @param {Event} event - L’événement de soumission du formulaire
     */
    const ajouterNouvelle = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const auteurSaisi = formData.get("auteur");

        const user = utilisateurs.find(
            (u) => u.nom.toLowerCase() === auteurSaisi.toLowerCase()
        );

        if (!user) {
            alert(`L'auteur "${auteurSaisi}" n'est pas reconnu.`);
            return;
        }

        if (currentUser.id !== 1 && user.id !== currentUser.id) {
            alert("Vous ne pouvez créer une nouvelle qu’en votre nom.");
            return;
        }

        // Construire l’objet nouvelle
        const nouvelle = {
            id: lastId + 1,
            titre: formData.get("titre"),
            date: formData.get("date"),
            id_auteur: user.id,
            auteur: user.nom,
            image: formData.get("image"),
            summary: formData.get("summary"),
            texte: formData.get("summary"),
            tags: formData.get("tags")
                ? formData.get("tags").split(",").map((tag) => tag.trim())
                : []
        };

        try {
            const created = await addNouvelle(nouvelle);
            setNouvelles((prev) => [created, ...prev]);
            event.target.reset();
        } catch (err) {
            alert("Erreur lors de la création : " + err.message);
        }
    };

    return (
        <Box sx={{ mt: 4, px: 2 }}>
            <Typography variant="h5" gutterBottom color="text.secondary">
                Ajouter une nouvelle culturelle
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                <Box component="form" onSubmit={ajouterNouvelle} sx={{ width: 300 }}>
                    <Stack spacing={2}>
                        <TextField name="titre" label="Titre" required />
                        <TextField
                            name="date"
                            label="Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            name="auteur"
                            label="Auteur"
                            required
                            defaultValue={currentUser.nom}
                            InputProps={{
                                readOnly: currentUser.id !== 1
                            }}
                        />
                        <TextField name="image" label="URL de l’image" />
                        <TextField
                            name="summary"
                            label="Résumé"
                            multiline
                            rows={3}
                            required
                        />
                        <TextField name="tags" label="Tags (séparés par des virgules)" />
                        <Button type="submit" variant="contained" color="primary">
                            Ajouter
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
