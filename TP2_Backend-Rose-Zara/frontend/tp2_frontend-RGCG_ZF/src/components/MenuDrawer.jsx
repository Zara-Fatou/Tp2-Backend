import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    ListItemIcon,
    Divider
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import BarChart from '@mui/icons-material/BarChart';

export default function MenuDrawer({ open, onClose, setPageActuelle }) {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box
                sx={(theme) => ({
                    width: 200,
                    p: 2,
                    backgroundColor: theme.palette.background.paper,
                    height: "100%"
                })}
            >

                <Typography variant="h6" gutterBottom>Menu gauche</Typography>

                <List>
                    <ListItem button onClick={() => { setPageActuelle("accueil"); onClose(); }}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Accueil" />
                    </ListItem>

                    <ListItem button onClick={() => { setPageActuelle("statistiques"); onClose(); }}>
                        <ListItemIcon><BarChart /></ListItemIcon>
                        <ListItemText primary="Statistique" />
                    </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />
            </Box>
        </Drawer>
    );
}
