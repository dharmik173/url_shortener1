"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
  Container,
  Tooltip,
  Button,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const pages = ["Home"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBar() {
  const router = useRouter();
  const userSession = useSession();
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.textContent === "Logout") {
      console.log("hellooo");
      await signOut();
    }
    setAnchorElUser(null);
  };

  const handleRouteChange = () => {
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (userSession?.status === "loading") {
      setIsLoading(true);
    } else if (userSession?.status === "authenticated") {
      setIsLoading(false);
      setUserAuthenticated(true);
      router.push("/");
    } else if (userSession?.status === "unauthenticated") {
      setIsLoading(false);
      setUserAuthenticated(false);
    }
  }, [userSession]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className="bg-black">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => router.push("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Shortly
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleRouteChange()}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => router.push("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Shortly
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleRouteChange()}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {userAuthenticated && !isLoading && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={(e) => {
                      handleCloseUserMenu(e);
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {!userAuthenticated && !isLoading && (
            <div
              className="bg-white p-2 text-black rounded-md cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </div>
          )}
        </Toolbar>
      </Container>
      {isLoading && <>Loading....</>}
    </AppBar>
  );
}
export default NavBar;
