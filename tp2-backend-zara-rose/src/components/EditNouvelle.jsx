import { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Stack
} from "@mui/material";

/**
 * EditNouvelle - Formulaire d'édition d'une nouvelle.
 *
 * - Permet de modifier le titre, la date, le résumé, le texte et l'image.
 * - Soumet les données modifiées via la fonction `onSauvegarder`.
 * - Peut être annulé via `onAnnuler`.
 *
 * @param {Object} props
 * @param {Object} props.nouvelle - Nouvelle à modifier (avec titre, date, summary, text, image).
 * @param {Function} props.onSauvegarder - Callback appelé avec la nouvelle modifiée.
 * @param {Function} props.onAnnuler - Callback pour annuler l'édition.
 * @returns {JSX.Element}
 */
export default function EditNouvelle({ nouvelle, onSauvegarder, onAnnuler }) {
    const [titre, setTitre] = useState(nouvelle.titre);
    const [date, setDate] = useState(nouvelle.date);
    const [resume, setResume] = useState(nouvelle.summary);
    const [texte, setTexte] = useState(nouvelle.text);
    const [image, setImage] = useState(nouvelle.image);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nouvelleModifiee = {
            ...nouvelle,
            titre,
            date,
            summary: resume,
            text: texte,
            image,
        };
        onSauvegarder(nouvelleModifiee);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 3,
                maxWidth: 600,
                mx: "auto",
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}>
                Modifier la nouvelle
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="Titre"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                    fullWidth
                />
                <TextField
                    label="Résumé"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    multiline
                    rows={2}
                    required
                    fullWidth
                />
                <TextField
                    label="Texte"
                    value={texte}
                    onChange={(e) => setTexte(e.target.value)}
                    multiline
                    rows={4}
                    required
                    fullWidth
                />
                <TextField
                    label="URL de l’image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    fullWidth
                />

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button type="button" variant="outlined" color="secondary" onClick={onAnnuler}>
                        Annuler
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Sauvegarder
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
