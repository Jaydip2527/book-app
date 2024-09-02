import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import img from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { confirmToast, toast } from "../../utils/constant";

const drawerWidth = 240;

function HeaderComponent(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token");
  const loginUser = JSON.parse(localStorage.getItem("userDetails"));
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    if (isLogin) {
      const msg = await confirmToast("You won't be able to Logout this!"); // msg
      if (msg) {
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        navigate("/");
        toast('Logout successfully!: ', "success");
      }
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ py: 2, backgroundColor: "#1976d2" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={img} alt="Logo" width={70} />
        </Typography>
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center", backgroundColor: "cornflowerblue" }}>
            <ListItemText primary="Logout" onClick={() => handleLogout()} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img src={img} alt="Logo" width={70} />
          </Typography>
          <Box sx={{ display: { sm: "none", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={img} alt="Logo" width={70} />
            </Typography>
            <Button sx={{ color: "#fff", mr: 2 }}>
              Welcome {loginUser?.username}
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff", mr: 2 }}>
              Welcome {loginUser?.username}
            </Button>
            <Button sx={{ color: "#fff", backgroundColor: "cornflowerblue" }} onClick={() => handleLogout()}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
      </nav>
    </Box>
  );
}

export default HeaderComponent;
