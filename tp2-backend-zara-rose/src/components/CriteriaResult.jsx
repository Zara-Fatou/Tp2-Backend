import { useContext } from "react";
import {
    Box,
    Typography,
    Paper,
    IconButton,
    Stack,
    Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { CriteriaContext } from "../context/CriteriaContext.jsx";

export default function CriteriaResult() {

    const { criteres, supprimerCritere } = useContext(CriteriaContext);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#6a1b9a" }}>
                Critères actifs
            </Typography>

            {criteres.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Aucun critère actif.
                </Typography>
            ) : (
                <>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => criteres.forEach(c => supprimerCritere(c.idCritere))}
                        sx={{ mb: 2 }}
                    >
                        Réinitialiser tous les critères
                    </Button>

                    {criteres.map((critere) => (
                        <Paper
                            key={critere.idCritere}
                            elevation={2}
                            sx={{ mb: 2, p: 2, backgroundColor: "#fce4ec" }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center">

                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                        {critere.titre}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Date : {critere.date}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Mot clé : {critere.motCle}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Catégorie : {critere.categorie}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Région : {critere.region}
                                    </Typography>

                                    <Typography variant="body2" sx={{ fontStyle: "italic", color: "#777" }}>
                                        Tags : {critere.tags}
                                    </Typography>

                                    <Typography variant="caption" sx={{ color: "#999" }}>
                                        ID Critère : {critere.idCritere}
                                    </Typography>
                                </Box>

                                <IconButton
                                    color="error"
                                    onClick={() => supprimerCritere(critere.idCritere)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    ))}
                </>
            )}
        </Box>
    );
}
