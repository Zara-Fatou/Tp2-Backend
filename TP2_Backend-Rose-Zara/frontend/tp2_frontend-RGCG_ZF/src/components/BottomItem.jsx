import { Paper, Typography, IconButton, Stack } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

/**
 * @typedef {Object} BottomItemProps
 * @property {number} [elevation=0] - Niveau d'ombre (elevation) appliqué au Paper.
 */

/**
 * Pied de page simple avec texte et icônes vers les réseaux sociaux.
 *
<<<<<<< Updated upstream
 * @component
 * @param {object} props - Propriétés du composant.
 * @param {number} [props.elevation=0] - Niveau d'élévation (ombre) appliqué au Paper.
 * @returns {JSX.Element} Élément JSX représentant le pied de page.
=======
 * - Structure sémantique : `Paper` utilisé comme `footer`.
 * - Mise en page : `Stack` pour aligner horizontalement les icônes.
 * - Accessibilité : `aria-label` sur la nav, et `aria-label` sur chaque bouton.
 *
 * @param {BottomItemProps} props
 * @param {number} [props.elevation=0]
 * @returns {JSX.Element}
>>>>>>> Stashed changes
 */
export default function BottomItem({ elevation = 0 }) {
    return (
        <Paper
            component="footer"
            elevation={elevation}
            sx={(theme) => ({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
            })}
        >
            {/* Texte informatif du footer */}
            <Typography variant="body2" color="text.secondary">
                Cégep Limoilou — TP AppWeb II — H25
            </Typography>

            <Stack direction="row" spacing={1} component="nav" aria-label="Réseaux sociaux">
                <IconButton
                    color="primary"
                    component="a"
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter — ouvre dans un nouvel onglet"
                    title="Twitter"
                >
                    <TwitterIcon fontSize="small" />
                </IconButton>

                <IconButton
                    color="primary"
                    component="a"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook — ouvre dans un nouvel onglet"
                    title="Facebook"
                >
                    <FacebookIcon fontSize="small" />
                </IconButton>

                <IconButton
                    color="primary"
                    component="a"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn — ouvre dans un nouvel onglet"
                    title="LinkedIn"
                >
                    <LinkedInIcon fontSize="small" />
                </IconButton>
            </Stack>
        </Paper>
    );
}
