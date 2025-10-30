import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Divider,
    Chip,
    Stack
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

/**
 * Affiche des statistiques sur les nouvelles
 *
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.nouvelles - Liste des nouvelles disponibles
 * @returns {JSX.Element}
 */
export default function Statistiques({ nouvelles }) {
    if (!nouvelles || nouvelles.length === 0) {
        return (
            <Typography variant="body1" sx={{ mt: 2 }} color="text.secondary">
                Aucune nouvelle disponible pour calculer les statistiques.
            </Typography>
        );
    }

    // Données de base
    const nombreNouvelles = nouvelles.length;
    const tailles = nouvelles.map((n) => n.text.length);
    const tailleMin = Math.min(...tailles);
    const tailleMax = Math.max(...tailles);
    const tailleMoyenne = Math.round(
        tailles.reduce((a, b) => a + b, 0) / tailles.length
    );

    const dates = nouvelles.map((n) => new Date(n.date));
    const datePlusAncienne = new Date(Math.min(...dates));
    const datePlusRecente = new Date(Math.max(...dates));

    // Associer titres aux tailles
    const nouvellesMin = nouvelles.filter((n) => n.text.length === tailleMin);
    const nouvellesMax = nouvelles.filter((n) => n.text.length === tailleMax);

    // Associer titres aux dates
    const nouvellesAnciennes = nouvelles.filter(
        (n) => new Date(n.date).getTime() === datePlusAncienne.getTime()
    );
    const nouvellesRecentes = nouvelles.filter(
        (n) => new Date(n.date).getTime() === datePlusRecente.getTime()
    );

    // Compte par tag (sans titres)
    const compteParTag = {};
    nouvelles.forEach((n) => {
        (n.tags || []).forEach((tag) => {
            compteParTag[tag] = (compteParTag[tag] || 0) + 1;
        });
    });

    return (
        <Box sx={{ p: 3 }}>
            <Typography
                variant="h4"
                sx={(theme) => ({
                    mb: 5,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                })}
            >
                Statistiques des Nouvelles
            </Typography>

            <Grid container spacing={4}>
                {/* Nombre total */}
                <Grid item xs={12} md={6}>
                    <Card elevation={4} sx={(theme) => ({ backgroundColor: theme.palette.background.paper })}>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                Nombre total
                            </Typography>
                            <Typography variant="h2" color="primary" sx={{ fontWeight: "bold" }}>
                                {nombreNouvelles}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2" color="text.secondary">
                                Titres :
                            </Typography>
                            {nouvelles.map((n) => (
                                <Typography key={n.id} variant="caption" display="block">
                                    • {n.titre}
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Taille des nouvelles */}
                <Grid item xs={12} md={6}>
                    <Card elevation={4} sx={(theme) => ({ backgroundColor: theme.palette.background.paper })}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Taille des nouvelles
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography>📏 Plus courte : {tailleMin} caractères</Typography>
                            {nouvellesMin.map((n) => (
                                <Typography key={n.id} variant="caption" display="block">
                                    • {n.titre}
                                </Typography>
                            ))}
                            <Typography sx={{ mt: 1 }}>📏 Plus longue : {tailleMax} caractères</Typography>
                            {nouvellesMax.map((n) => (
                                <Typography key={n.id} variant="caption" display="block">
                                    • {n.titre}
                                </Typography>
                            ))}
                            <Typography sx={{ mt: 1 }}>📏 Moyenne : {tailleMoyenne} caractères</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Dates */}
                <Grid item xs={12} md={6}>
                    <Card elevation={4} sx={(theme) => ({ backgroundColor: theme.palette.background.paper })}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Dates
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography>
                                <EventIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                                Plus ancienne : {datePlusAncienne.toLocaleDateString()}
                            </Typography>
                            {nouvellesAnciennes.map((n) => (
                                <Typography key={n.id} variant="caption" display="block">
                                    • {n.titre}
                                </Typography>
                            ))}
                            <Typography sx={{ mt: 1 }}>
                                <EventIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                                Plus récente : {datePlusRecente.toLocaleDateString()}
                            </Typography>
                            {nouvellesRecentes.map((n) => (
                                <Typography key={n.id} variant="caption" display="block">
                                    • {n.titre}
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Tags */}
                <Grid item xs={12} md={6}>
                    <Card elevation={4} sx={(theme) => ({ backgroundColor: theme.palette.background.paper })}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom color="primary">
                                Nouvelles par tag
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            {Object.entries(compteParTag).length > 0 ? (
                                <Stack direction="row" flexWrap="wrap" spacing={1}>
                                    {Object.entries(compteParTag).map(([tag, count]) => (
                                        <Chip
                                            key={tag}
                                            label={`#${tag} (${count})`}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </Stack>
                            ) : (
                                <Typography color="text.secondary">Aucun tag disponible</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
