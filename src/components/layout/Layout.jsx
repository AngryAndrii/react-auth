import {
  Box,
  List,
  Button,
  AppBar,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../helpers/authContext";
import useSignOut from "../../hooks/signout";
import StyledLayout from "../layout/layout.styled";

function Layout() {
  const { user, loading } = useAuth();
  const handleSignOut = useSignOut();
  if (loading) return <div>Завантаження...</div>;
  return (
    <StyledLayout>
      <Box sx={{ margin: "20px", paddingTop: "50px" }}>
        <AppBar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "5px 25px",
            backgroundColor: "primary.light",
          }}
        >
          <nav>
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px",
                color: "primary.text",
                textDecoration: "none",
              }}
            >
              <ListItem disablePadding>
                <NavLink className={"page-link"} to="/">
                  Home
                </NavLink>
              </ListItem>
              <ListItem disablePadding>
                <NavLink className={"page-link"} to="/register">
                  Register page
                </NavLink>
              </ListItem>
              <ListItem disablePadding>
                <NavLink className={"page-link"} to="/login">
                  Login page
                </NavLink>
              </ListItem>
              <ListItem disablePadding>
                <NavLink className={"page-link"} to="/profile">
                  Profile page
                </NavLink>
              </ListItem>
            </List>
          </nav>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: "20px",
            }}
          >
            <Box>{user?.displayName}</Box>
            <Button variant="contained" onClick={handleSignOut}>
              Logout
            </Button>
          </Box>
        </AppBar>
        <main>
          <Outlet />
        </main>
        <footer>{/* <p>&copy; 2025 Angry Andrii</p> */}</footer>
      </Box>
    </StyledLayout>
  );
}

export default Layout;
