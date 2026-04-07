import React, { useContext, useEffect, useState } from "react";
import { AppBar, Avatar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography, } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// import Diversity1Icon from '@mui/icons-material/Diversity1';

import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import { useTheme, useMediaQuery } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../context/auth/authContext";

const drawerWidth = 240;

export default function SimpleDrawer({ children }) {

    const { user, logout } = useContext(AuthContext);


    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const Navigate = useNavigate();

    const orderNavigate = () => {
        Navigate('/orderHistory',{replace:true});
    }

    const loginNavigate = () => {
        Navigate('/',{ state: { from: "checkout" }, replace: true });
    }


    const settings = [
        // {
        //     icon: <PersonIcon />,
        //     name: 'Profile',
        //     // function: ProfileNavigate,
        // },
        {
            icon: <ShoppingCartIcon />,
            name: 'Order History',
            function: orderNavigate
        },
        {
            icon: <LogoutIcon />,
            name: 'Logout',
            function: logout
        },
        {
            icon: <LoginIcon />,
            name: 'login',
            function: loginNavigate
        }
    ];

    const [profile, setProfile] = useState(null);

    const handleOpenUserMenu = (event) => {
        setProfile(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setProfile(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    backgroundColor: scrolled
                        ? "rgba(255, 255, 255, 0.85)"
                        : "rgba(255, 255, 255, 1)",

                    backdropFilter: scrolled ? "blur(10px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",

                    borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
                    boxShadow: scrolled
                        ? "0 4px 12px rgba(0,0,0,0.05)"
                        : "none",

                    color: "text.primary",
                }}
            >

                <Toolbar>
                    <Typography variant="h6" fontWeight={700} sx={{ ml: 2 }}>
                        Product Mart
                    </Typography>

                    <Box sx={{ flexGrow: 0, flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip

                        >
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={user?.imageUrl} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px', borderRadius: 50 }}
                            id="menu-appbar"
                            anchorEl={profile}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}

                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(profile)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem sx={{ ...(user && { borderBottom: 1}), pb: 1 ,borderColor: 'grey.300' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                                        {user?.firstname}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user?.email}
                                    </Typography>
                                </Box>
                            </MenuItem>
                            {settings
                                .filter((setting) => {
                                    if (user) {
                                        return setting.name !== 'login';
                                    } else {

                                        return setting.name === 'login';
                                    }
                                })
                                .map((setting, index) => (
                                    <MenuItem key={index} onClick={() => { setting.function(); handleCloseUserMenu(); }}>
                                        <Box sx={{ display: "flex", alignContent: "center", gap: 1 }}>
                                            {setting.icon}
                                            <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                                        </Box>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: "100%",
                }}
            >
                <Toolbar />

                {children}
            </Box>
        </Box>
    );
}
