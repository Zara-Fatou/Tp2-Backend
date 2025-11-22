import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

/**
 * Bouton d’action permettant de basculer entre les thèmes clair et sombre.
 *
 * @returns {JSX.Element} Bouton de bascule du thème.
 */
export default function ThemeToggleButton() {
    const { mode, toggleTheme } = useContext(ThemeContext);

    return (
        <Tooltip title="Changer le thème">
            <IconButton onClick={toggleTheme} color="inherit">
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
        </Tooltip>
    );
}
