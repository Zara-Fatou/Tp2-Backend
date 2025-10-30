import { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "../context/UserContext.jsx";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Collapse,
    Chip,
    Stack,
    Box
} from "@mui/material";
import EditNouvelle from "./EditNouvelle.jsx";
import SupprimerNouvelle from "./SupprimerNouvelle.jsx";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

/**
 * Affiche une carte de nouvelle avec possibilité de lecture complète,
 * modification et suppression si l’utilisateur est l’auteur.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.item - La nouvelle affichée
 * @param {Object|null} props.nouvelleEnEdition - Nouvelle actuellement en édition
 * @param {Function} props.onSauvegarder - Callback quand une nouvelle modifiée est sauvegardée
 * @param {Function} props.onAnnuler - Callback pour annuler l’édition
 * @param {Function} props.onEdit - Callback pour lancer l’édition
 * @param {Function} props.onSupprimer - Callback pour supprimer la nouvelle
 * @returns {JSX.Element}
 */
export default function NouvelleCarte({
                                          item,
                                          nouvelleEnEdition,
                                          onSauvegarder,
                                          onAnnuler,
                                          onEdit,
                                          onSupprimer
                                      }) {
    const [expanded, setExpanded] = useState(false);
    const { users, currentUser } = useContext(UserContext);
    const theme = useTheme();

    const handleExpandClick = () => setExpanded(!expanded);
    const auteur = users.find((u) => u.id === item.id_auteur)?.nom || item.auteur;

    // Si cette nouvelle est en mode édition, on affiche l’éditeur
    if (nouvelleEnEdition?.id === item.id) {
        return (
            <EditNouvelle
                nouvelle={item}
                onSauvegarder={onSauvegarder}
                onAnnuler={onAnnuler}
            />
        );
    }

    return (
        <Card
            sx={{
                minHeight: 400,
                maxWidth: 600,
                mb: 4,
                borderRadius: 3,
                boxShadow: 4,
                backgroundColor: theme.palette.background.paper,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.01)", boxShadow: 6 }
            }}
        >
            {item.image && (
                <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.titre}
                    sx={{
                        width: "100%",
                        height: 300,
                        objectFit: "cover",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12
                    }}
                />
            )}

            <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                    <Box
                        component="span"
                        sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
                    >
                        {item.date}
                    </Box>{" "}
                    — {auteur}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{ mt: 1, color: theme.palette.primary.main }}
                >
                    {item.titre}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {item.summary}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    onClick={handleExpandClick}
                    sx={{ color: theme.palette.primary.main }}
                >
                    {expanded ? "Réduire" : "Lire la suite"}
                </Button>
            </CardActions>

            <Collapse in={expanded}>
                <CardContent
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        borderTop: "1px solid",
                        borderColor: theme.palette.divider
                    }}
                >
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        {item.text}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {(item.tags || []).map((tag) => (
                            <Chip
                                key={tag}
                                label={`#${tag}`}
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    fontWeight: "bold"
                                }}
                            />
                        ))}
                    </Stack>

                    {(currentUser?.id === item.id_auteur || currentUser?.role === "admin") && (
                        <Stack direction="row" spacing={1}>
                            <Button
                                size="small"
                                startIcon={<ModeEditIcon />}
                                onClick={() => onEdit(item)}
                            >
                                Modifier
                            </Button>
                            <SupprimerNouvelle id={item.id} onSupprimer={onSupprimer} />
                        </Stack>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}
