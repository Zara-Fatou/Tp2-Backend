import { useState, useContext } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    InputAdornment,
    useTheme,
} from "@mui/material";
import { CriteriaContext } from "../context/CriteriaContext.jsx";
import { UserContext } from "../context/UserContext.jsx";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TagIcon from "@mui/icons-material/Tag";
import TitleIcon from "@mui/icons-material/Title";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";

export default function CriteriaForm() {
    const { ajouterCritere } = useContext(CriteriaContext);
    const { currentUser } = useContext(UserContext);
    const theme = useTheme();

    const [formData, setFormData] = useState({
        titre: "",
        date: "",
        auteur: "",
        summary: "",
        categorie: "",
        region: "",
        importance: "",
        tags: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { titre, date, auteur, summary, tags } = formData;

        const critere = {
            id: Date.now(),
            refPersonne: currentUser.id,
            nomPersonne: currentUser.nom,
            dateSaisie: date,
            elements: {
                titre,
                auteur,
                summary,
                categorie: formData.categorie,
                region: formData.region,
                tags: tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
            },
        };

        ajouterCritere(critere);

        setFormData({
            titre: "",
            date: "",
            auteur: "",
            summary: "",
            categorie: "",
            region: "",
            tags: "",
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                mt: 3,
                maxWidth: 300,
                mx: "auto",
                bgcolor: theme.palette.background.paper,
                p: 3,
                borderRadius: 3,
                boxShadow: theme.shadows[4],
            }}
            noValidate
        >
            <Typography
                variant="h5"
                mb={3}
                sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
                Ajouter un critère
            </Typography>

            <Grid container spacing={2}>
                {/* Chaque champ occupe toute la largeur */}
                <Grid item xs={12}>
                    <TextField
                        name="titre"
                        label="Titre"
                        value={formData.titre}
                        onChange={handleChange}
                        required
                        fullWidth
                        placeholder="Titre"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TitleIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="date"
                        label="Date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarTodayIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="auteur"
                        label="Mot-clé"
                        value={formData.auteur}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        placeholder="Ex: économie, politique"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="categorie"
                        label="Catégorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        placeholder="Ex: Culture, Spiritualité"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CategoryIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="region"
                        label="Région"
                        value={formData.region}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        placeholder="Ex: Japon, Corée du Sud"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOnIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="summary"
                        label="Résumé"
                        multiline
                        rows={3}
                        value={formData.summary}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        placeholder="Résumé du critère"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="tags"
                        label="Tags"
                        value={formData.tags}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        placeholder="Séparez les tags par des virgules"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TagIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="medium"
                        sx={{ fontWeight: "bold", px: 5 }}
                    >
                        Ajouter
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
