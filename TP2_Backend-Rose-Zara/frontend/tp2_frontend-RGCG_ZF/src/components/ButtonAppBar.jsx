import { useState } from "react";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuDrawer from "./MenuDrawer.jsx";
import UtilisateurSelector from "./UtilisateurSelector.jsx";
import ThemeToggleButton from "./ThemeToggleButton.jsx";

/**
 * ButtonAppBar - Barre d'application principale avec navigation et outils utilisateur.
 *
 * - Contient un bouton menu ouvrant le `MenuDrawer'.
 * - Affiche le titre de l'application.
 * - Inclut le sélecteur d'utilisateur et le bouton de changement de thème.
 *
 * @param {Object} props
 * @param {Function} props.setPageActuelle - Fonction pour changer la page active (accueil, statistiques, etc.).
 * @returns {JSX.Element}
 */
export default function ButtonAppBar({ setPageActuelle }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    return (
        <>
            <AppBar
                position="fixed"
                sx={(theme) => ({
                    backgroundColor: theme.palette.primary.main,
                    zIndex: theme.zIndex.drawer + 1,
                })}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Nouvelles Culturelle Japon et Corée du Sud
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">

                        <ThemeToggleButton />
                        <UtilisateurSelector />
                    </Stack>
                </Toolbar>
            </AppBar>

            <MenuDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                setPageActuelle={setPageActuelle}
            />
        </>
    );
}
