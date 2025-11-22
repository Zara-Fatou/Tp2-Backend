import { useContext } from "react";
import { CriteriaContext } from "../context/CriteriaContext.jsx";
import {
    Box,
    Typography,
    Paper,
    IconButton,
    Stack,
    Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * Composant d'affichage des critères de recherche et des nouvelles filtrées.
 * - Affiche les critères actifs avec leurs détails.
 * - Permet de supprimer un critère ou tous les critères.
 * - Filtre les nouvelles selon les critères saisis.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function CriteriaResult() {
    const { criteres, supprimerCritere } = useContext(CriteriaContext);

    // Récupère les nouvelles depuis le localStorage
    const nouvelles = JSON.parse(localStorage.getItem("tp1_Nouvelles")) || [];

    /**
     * Filtrage des nouvelles selon les critères actifs.
     * Si aucun critère n'est actif, retourne une liste vide.
     */
    const nouvellesFiltrees =
        criteres.length === 0
            ? []
            : nouvelles.filter((nouvelle) =>
                criteres.every((critere) =>
                    nouvelle.titre?.toLowerCase().includes(critere.elements.titre?.toLowerCase() || "") ||
                    nouvelle.summary?.toLowerCase().includes(critere.elements.summary?.toLowerCase() || "") ||
                    nouvelle.tags?.some(tag => critere.elements.tags?.includes(tag)) ||
                    nouvelle.categorie?.toLowerCase().includes(critere.elements.categorie?.toLowerCase() || "") ||
                    nouvelle.region?.toLowerCase().includes(critere.elements.region?.toLowerCase() || "")
                )
            );

    return (
        <Box sx={{ mt: 4 }}>
            {/* Section : Critères actifs */}
            <Typography variant="h6" gutterBottom sx={{ color: "#6a1b9a" }}>
                Critères actifs
            </Typography>

            {criteres.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Aucun critère actif.
                </Typography>
            ) : (
                <>
                    {/* Bouton pour réinitialiser tous les critères */}
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => criteres.forEach(c => supprimerCritere(c))}
                        sx={{ mb: 2 }}
                    >
                        Réinitialiser tous les critères
                    </Button>

                    {/* Liste des critères */}
                    {criteres.map((critere) => (
                        <Paper
                            key={critere.id}
                            elevation={2}
                            sx={{ mb: 2, p: 2, backgroundColor: "#fce4ec" }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        {critere.elements.titre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Auteur : {critere.elements.auteur || "—"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Catégorie : {critere.elements.categorie || "—"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Région : {critere.elements.region || "—"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Priorité : {critere.elements.importance || "—"}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#777' }}>
                                        Tags : {critere.elements.tags?.join(", ") || "—"}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#999' }}>
                                        Saisi le {critere.dateSaisie} par {critere.nomPersonne}
                                    </Typography>
                                </Box>
                                <IconButton color="error" onClick={() => supprimerCritere(critere)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    ))}
                </>
            )}

            {/* Section : Nouvelles filtrées */}
            <Typography variant="h6" sx={{ mt: 4 }}>
                Nouvelles filtrées
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                {nouvellesFiltrees.length} nouvelle(s) correspondent à vos critères.
            </Typography>

            {criteres.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Aucun critère actif — les nouvelles ne sont pas filtrées.
                </Typography>
            ) : nouvellesFiltrees.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Aucune nouvelle ne correspond aux critères.
                </Typography>
            ) : (
                nouvellesFiltrees.map((news) => (
                    <Paper key={news.id} elevation={3} sx={{ mb: 4, p: 2 }}>
                        <Typography variant="h6">{news.titre}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {news.date} — <strong>{news.auteur}</strong>
                        </Typography>
                        {news.image && (
                            <Box
                                component="img"
                                src={news.image}
                                alt={news.titre}
                                sx={{ width: '50%', maxHeight: 100, objectFit: 'cover', my: 2 }}
                            />
                        )}
                        <Typography variant="body1">{news.summary}</Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#777', mt: 1 }}>
                            Tags : {news.tags.join(", ")}
                        </Typography>
                    </Paper>
                ))
            )}
        </Box>
    );
}
