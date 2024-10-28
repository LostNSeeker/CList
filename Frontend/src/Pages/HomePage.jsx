import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TopNav from "@/Components/TopNav";
import Dashboard from "./Dashboard";
import Contests from "../Components/Contests";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import homeIcon from "/public/home.svg";
import contestsIcon from "/public/contests.svg";

const drawerWidth = 260;
const closedDrawerWidth = 84; // Width when closed

const ContestsIcon = () => (
  <img
    src={contestsIcon}
    alt="con"
    style={{ backgroundColor: "white", borderRadius: "50%" }}
  />
);

const HomeIcon = () => (
  <img
    src={homeIcon}
    alt="home"
    style={{ backgroundColor: "white", borderRadius: "50%", padding: "10px" }}
  />
);

const menuItems = [
  { text: "Home", path: "/", icon: <HomeIcon /> },
  { text: "Contests", path: "/contests", icon: <ContestsIcon /> },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: closedDrawerWidth, // Set the width of the closed drawer
  [theme.breakpoints.up("sm")]: {
    width: closedDrawerWidth, // Set the width of the closed drawer for larger screens
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  backgroundColor: "#18181B", // Set the header background color to black
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#18181B", // Set the entire drawer background color to black
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          backgroundColor: "#18181B", // Set the paper background color to black
          ...openedMixin(theme),
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          backgroundColor: "#18181B", // Set the paper background color to black
          ...closedMixin(theme),
        },
      },
    },
  ],
}));

export default function HomePage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#18181B" }}>
        <Toolbar sx={{ padding: 0, margin: 0 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ marginRight: 4 }, open && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, m: 0, p: 0}}>
            <TopNav />
          </Box>

        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map(({ text, path, icon }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link} // Use Link as the button component
                to={path} // Set the path to navigate to
                sx={[{ minHeight: 48, px: 2.5, backgroundColor: "#18181B", color: "white" }]}> {/* Set background color and text color */}
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {icon} {/* Render the icon */}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography sx={{ marginBottom: 2, marginTop: 5 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contests" element={<Contests fullPage={true} />} />
          </Routes>
        </Typography>
        <Typography sx={{ marginBottom: 2 }}></Typography>
      </Box>
    </Box>
  );
}
