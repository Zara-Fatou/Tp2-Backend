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

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TagIcon from "@mui/icons-material/Tag";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";

export default function CriteriaForm() {

    const { ajouterCritere } = useContext(CriteriaContext);
    const theme = useTheme();

    const [formData, setFormData] = useState({
        titre: "",
        date: "",
        motCle: "",
        resume: "",
        categorie: "",
        region: "",
        tags: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const critere = {
            titre: formData.titre,
            date: formData.date,
            motCle: formData.motCle,
            categorie: formData.categorie,
            region: formData.region,
            resume: formData.resume,
            tags: formData.tags
        };

        await ajouterCritere(critere);

        // Reset
        setFormData({
            titre: "",
            date: "",
            motCle: "",
            resume: "",
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
        >
            <Typography variant="h5" mb={3} sx={{ color: theme.palette.primary.main }}>
                Ajouter un critère
            </Typography>

            <Grid container spacing={2}>

                {/* Titre */}
                <Grid size={{ xs: 12 }}>
                    <TextField
                        name="titre"
                        label="Titre"
                        value={formData.titre}
                        onChange={handleChange}
                        required
                        fullWidth
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

                {/* Date */}
                <Grid size={{ xs: 12 }}>
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

                {/* Mot-clé */}
                <Grid size={{ xs: 12 }}>
                    <TextField
                        name="motCle"
                        label="Mot clé"
                        value={formData.motCle}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TagIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Catégorie */}
                <Grid size={{ xs: 12 }}>
                    <TextField
                        name="categorie"
                        label="Catégorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CategoryIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Région */}
                <Grid size={{ xs: 12 }}>
                    <TextField
                        name="region"
                        label="Région"
                        value={formData.region}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOnIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Résumé */}
                <Grid size={{ xs: 12 }}>
                    <TextField
                        name="resume"
                        label="Résumé"
                        multiline
                        rows={3}
                        value={formData.resume}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Tags */}
                <Grid size={{ xs: 12 }}>
                    <TextField
                        name="tags"
                        label="Tags"
                        value={formData.tags}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        placeholder="tag1, tag2"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TagIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Bouton */}
                <Grid size={{ xs: 12 }} sx={{ textAlign: "right" }}>
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
