import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * Bouton de suppression avec confirmation par boîte de dialogue.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onSupprimer - Fonction appelée lors de la suppression.
 * @param {number|string} props.id - Identifiant de la nouvelle à supprimer.
 */
export default function SupprimerNouvelle({ onSupprimer, id }) {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        onSupprimer(id);
        setOpen(false);
    };

    return (
        <>
            {/* Bouton de suppression */}
            <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setOpen(true)}
            >
                Supprimer
            </Button>

            {/* Fenêtre de confirmation */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <Typography>
                        Voulez-vous vraiment supprimer cette nouvelle ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Annuler</Button>
                    <Button onClick={handleConfirm} color="error" variant="contained">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
