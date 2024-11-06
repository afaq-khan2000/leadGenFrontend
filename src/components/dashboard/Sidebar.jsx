import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Face, LockOpen, Logout, Message, MonetizationOn, Notifications } from "@mui/icons-material";
import FabIcon from "../global/FabIcon";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Sidebar({ children, ...props }) {
  const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  let user = JSON.parse(localStorage.getItem("user")) ?? {};

  // get path name using useLocation hook
  const location = useLocation();
  const activePage = location.pathname;

  const userSideBarItems = [
    {
      title: "Leads List",
      icon: <MailIcon />,
      link: "/dashboard",
    },
    {
      title: "Unlocked Leads",
      icon: <LockOpen />,
      link: "/dashboard/unlocked-leads",
    },
    {
      title: "My Transactions",
      icon: <MonetizationOn />,
      link: "/dashboard/my-transactions",
    },
  ];

  const adminSideBarItems = [
    {
      title: "Users List",
      icon: <Face />,
      link: "/dashboard",
    },
    {
      title: "Unlocked Leads",
      icon: <LockOpen />,
      link: "/dashboard/admin-unlocked-leads",
    },
  ];

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {user.role === "user" &&
          userSideBarItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                backgroundColor: activePage === item.link ? "#08f" : "white",
                color: activePage === item.link ? "white" : "black",
              }}
              onClick={() => navigate(item.link)}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: activePage === item.link ? "white" : "black",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}

        {user.role === "admin" &&
          adminSideBarItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                backgroundColor: activePage === item.link ? "#08f" : "white",
                color: activePage === item.link ? "white" : "black",
              }}
              onClick={() => navigate(item.link)}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: activePage === item.link ? "white" : "black",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            color: "black",
          }}
        >
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6">Hey {user.first_name}</Typography>
              <Typography variant="body2">{new Date().toLocaleDateString()}</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <IconButton color="inherit">
                <Logout
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("access_token");
                    navigate("/login");
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      {/* <FabIcon /> */}
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
