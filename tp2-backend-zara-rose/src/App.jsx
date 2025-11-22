import "./App.css";
import {useEffect, useState} from "react";
import { UserProvider } from "/src/context/UserContext.jsx";
import { CriteriaProvider } from "/src/context/CriteriaContext.jsx";
import { ThemeProvider } from "/src/context/ThemeContext.jsx";
import BottomItem from "/src/components/BottomItem.jsx";
import NouvelleCarte from "/src/components/NouvelleCarte.jsx";
import NouvelleListe from "/src/components/NouvelleListe.jsx";
import ButtonAppBar from "/src/components/ButtonAppBar.jsx";
import CriteriaForm from "/src/components/CriteriaForm.jsx";
import CriteriaResult from "/src/components/CriteriaResult.jsx";
import Statistiques from "/src/components/Statistiques.jsx";

import {
    Box, Grid, Container, Paper, Typography, CssBaseline,
    Button, Drawer, AlertTitle, Alert
} from "@mui/material";

import {
    deleteNouvelle,
    fetchAvailableNouvelleAsync,
    updateNouvelle
} from "./scripts/http.js";

/**
 * Composant principal de l'application.
 *
 * Fonctionnalités principales :
 * - Gestion des **nouvelles culturelles** (articles) : ajout, édition, suppression.
 * - Navigation entre plusieurs pages : accueil, statistiques, etc.
 * - Fournit les contextes globaux : Thème, Utilisateur, Critères.
 * - Structure la mise en page avec une barre de navigation, contenu central, drawer (ajout) et pied de page.
 *
 * États internes :
 * - `nouvelles` : liste des articles.
 * - `nouvelleEnEdition` : article actuellement modifié.
 * - `pageActuelle` : navigation (accueil, statistiques).
 * - `openDrawer` : affichage du panneau latéral.
 *
 * @returns {JSX.Element} L’interface principale de l’application.
 */
function App() {

    const [nouvelles, setNouvelles] = useState([]);
    const [nouvelleEnEdition, setNouvelleEnEdition] = useState(null);
    const [pageActuelle, setPageActuelle] = useState("accueil");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [error, setError] = useState({error: undefined, message: " "});
    const [isFetching, setIsFetching] = useState(false);

    // Charger les nouvelles au démarrage
    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchAvailableNouvelleAsync();
                setNouvelles(data);
            } catch (error) {
                setError({error: "error", message: error.message});
            } finally {
                setIsFetching(false);
            }
        }

        fetchData();
    }, []);

    const toggleDrawer = (state) => () => setOpenDrawer(state);

    const handleSupprimer = async (id) => {
        try {
            await deleteNouvelle(id);
            setNouvelles(old => old.filter(n => n.id !== id));
        } catch (err) {
            setError({error: err.name, message: err.message});
        }
    };

    const handleEdit = (item) => setNouvelleEnEdition(item);

    const handleSauvegarder = async (modifiee) => {
        try {
            const updated = await updateNouvelle(modifiee.id, modifiee);
            setNouvelles(n =>
                n.map(x => (x.id === modifiee.id ? updated : x))
            );
            setNouvelleEnEdition(null);
        } catch (err) {
            setError({error: err.name, message: err.message});
        }
    };


    const handleAnnulerEdition = () => setNouvelleEnEdition(null);

    return (
        <ThemeProvider>
            <CssBaseline/>
            <UserProvider>
                <CriteriaProvider>
                    <Box
                        className="app"
                        sx={(theme) => ({
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: theme.palette.background.default,
                        })}
                    >

                        <ButtonAppBar
                            pageActuelle={pageActuelle}
                            setPageActuelle={setPageActuelle}
                        />

                        {/* Bouton Ajouter une nouvelle */}
                        {pageActuelle === "accueil" && (
                            <Box
                                sx={{
                                    position: "fixed",
                                    top: 80,
                                    right: 16,
                                    zIndex: 1200,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={toggleDrawer(true)}
                                >
                                    + Ajouter une nouvelle
                                </Button>
                            </Box>
                        )}

                        {/* En-tête */}
                        {pageActuelle === "accueil" && (
                            <Container maxWidth="lg" sx={{mt: 10, mb: 5}}>
                                <Paper elevation={3} sx={(theme) => ({
                                    p: 4,
                                    textAlign: "center",
                                    backgroundColor: theme.palette.background.paper,
                                })}>
                                    <Typography variant="h4" sx={(theme) => ({
                                        fontWeight: "bold",
                                        mb: 2,
                                        color: theme.palette.primary.main,
                                    })}>
                                        🌸 Bienvenue sur le journal culturel 🌸
                                    </Typography>
                                    <Typography variant="body1">
                                        Explorez les traditions du Japon et de la Corée du Sud.
                                    </Typography>
                                </Paper>
                            </Container>
                        )}

                        {/* Contenu principal */}
                        <Box sx={{flexGrow: 1, px: 2, py: 4}}>
                            <Grid container spacing={3} alignItems="flex-start">

                                {/* Critères */}
                                {pageActuelle === "accueil" && (
                                    <Grid size={{xs: 12, md: 3}}>
                                        <Paper sx={{p: 2}}>
                                            <CriteriaForm/>
                                            <CriteriaResult/>
                                        </Paper>
                                    </Grid>
                                )}

                                {/* Section Nouvelles */}
                                <Grid size={{xs: 12, md: 9}}>
                                    {!error.error ? (
                                        <Grid container spacing={3}>

                                            {pageActuelle === "accueil" ? (
                                                nouvelles.length ? (
                                                    nouvelles.map(item => (
                                                        <Grid size={{xs: 12, sm: 6}} key={item.id}>
                                                            <NouvelleCarte
                                                                item={item}
                                                                nouvelleEnEdition={nouvelleEnEdition}
                                                                onSauvegarder={handleSauvegarder}
                                                                onAnnuler={() => setNouvelleEnEdition(null)}
                                                                onEdit={handleEdit}
                                                                onSupprimer={handleSupprimer}
                                                                isFetching={isFetching}
                                                                error={error}
                                                            />
                                                        </Grid>
                                                    ))
                                                ) : (
                                                    <Typography variant="h4">
                                                        Aucune nouvelle à afficher.
                                                    </Typography>
                                                )
                                            ) : pageActuelle === "statistiques" ? (
                                                <Grid size={12}>
                                                    <Statistiques nouvelles={nouvelles}/>
                                                </Grid>
                                            ) : null}

                                        </Grid>
                                    ) : (
                                        <Alert severity="error" sx={{margin: "40px"}}>
                                            <AlertTitle>Error</AlertTitle>
                                            {error.message}
                                        </Alert>
                                    )}
                                </Grid>

                            </Grid>
                        </Box>


                        {/* Drawer */}
                        <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
                            <Box sx={{width: 350, p: 2, marginTop: 10}}>
                                <NouvelleListe
                                    nouvelles={nouvelles}
                                    setNouvelles={setNouvelles}
                                />
                            </Box>
                        </Drawer>

                        <BottomItem elevation={3}/>

                    </Box>
                </CriteriaProvider>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
