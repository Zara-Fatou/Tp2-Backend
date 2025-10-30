// src/context/ThemeContext.jsx
import { createContext, useState } from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

/**
 * Contexte pour gérer le thème clair/sombre de l'application.
 * @type {React.Context<{ mode: string, toggleTheme: Function }>}
 */


// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(undefined);

/**
 * Fournisseur de thème global pour l'application.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Composants enfants qui héritent du thème.
 */
export function ThemeProvider({ children }) {
    const [mode, setMode] = useState("light");

    /** Inverse le mode clair/sombre */
    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    //  Thème clair
    const lightTheme = createTheme({
        palette: {
            mode: "light",
            primary: { main: "#41105e" },
            secondary: { main: "#f48fb1" },
            background: { default: "#efdbc4", paper: "#fbf8e8" },
            text: { primary: "#000000", secondary: "#333333" }
        }
    });

    //  Thème sombre
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: { main: "#90aef9" },
            secondary: { main: "#f48fb1" },
            background: { default: "#121212", paper: "#31303a" },
            text: { primary: "#ffffff", secondary: "#bbbbbb" }
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        backgroundColor: theme.palette.background.paper,
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: theme.palette.divider,
                            },
                            "&:hover fieldset": {
                                borderColor: theme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: theme.palette.primary.main,
                                borderWidth: 2,
                            },
                        },
                        "& .MuiInputBase-input": {
                            color: theme.palette.text.primary,
                        },
                        "& .MuiInputLabel-root": {
                            color: theme.palette.text.secondary,
                            "&.Mui-focused": {
                                color: theme.palette.primary.main,
                            },
                        },
                    }),
                },
            },
        },
    });

    const theme = mode === "light" ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
        </ThemeContext.Provider>
    );
}
