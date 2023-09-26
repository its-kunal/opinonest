import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  SvgIcon,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Divider,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NestIcon from "../assets/nest.svg";
import PollIcon from "@mui/icons-material/Poll";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Navbar() {
  const [drawerOpen, setDrawer] = useState(false);
  const navigate = useNavigate();
  const list = [
    {
      icon: PollIcon,
      text: "Polls",
      link: "/",
    },
    {
      icon: AddBoxIcon,
      text: "Create Poll",
      link: "/create",
    },
    {
      icon: HowToVoteIcon,
      text: "My Polls",
      link: "/mypolls",
    },
    {
      icon: ReviewsIcon,
      text: "My Responses",
      link: "/myresponses",
    },
    {
      icon: PersonIcon,
      text: "My Profile",
      link: "/user",
    },
  ];
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <IconButton
          onClick={() => {
            setDrawer(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          OpinioNest
        </Typography>
        <img src={NestIcon} className="h-8" />
        <Button
          size="small"
          onClick={logoutHandler}
          color="error"
          sx={{ ml: "auto", display: { xs: "none", sm: "block" } }}
        >
          Log Out
        </Button>
      </Toolbar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          setDrawer(false);
        }}
      >
        <Box
          sx={{
            width: 250,
          }}
        >
          <Container sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Typography variant="h5" component="div">
              OpinioNest
            </Typography>
            <img src={NestIcon} className="h-8" />
          </Container>
          <Divider sx={{ my: 1 }}></Divider>
          <List>
            {list.map((v, idx) => {
              return (
                <ListItemButton
                  key={idx}
                  divider
                  onClick={() => {
                    navigate(v.link);
                    setDrawer(false);
                  }}
                >
                  <ListItemIcon>
                    <SvgIcon component={v.icon} />
                  </ListItemIcon>
                  <ListItemText primary={v.text} />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
