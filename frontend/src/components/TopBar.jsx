import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function TopBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const storedName = localStorage.getItem("name");
  const storedUsername = localStorage.getItem("username");
  const storedEmail = localStorage.getItem("email");
  const profilePictureUrl = localStorage.getItem("profilePictureUrl") || "";

  const displayName = storedName || storedUsername || storedEmail || "User";
  const initial =
    (storedName && storedName.trim()[0]) ||
    (storedUsername && storedUsername.trim()[0]) ||
    (storedEmail && storedEmail.trim()[0]) ||
    "U";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);

  /* ✅ ONLY CHANGE IS HERE */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePictureUrl");
    localStorage.removeItem("activeUserId");

    // 🔹 redirect to LandingPage
    navigate("/", { replace: true });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHome = () => {
    if (token) {
      navigate("/boards");
    } else {
      navigate("/login");
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBoardsClick = () => {
    handleHome();
    handleMenuClose();
  };

  const handleLoginClick = () => {
    handleLogin();
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    handleLogout();
    handleMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        color: "#ffffff",
      }}
    >
      <Toolbar sx={{ minHeight: 72, px: { xs: 2, sm: 3 } }}>
        {/* Logo + title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleHome}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "30%",
              mr: 1.4,
              background:
                "conic-gradient(from 180deg at 50% 50%, #ffffff, #e0e7ff, #c7d2fe, #ffffff)",
              boxShadow: "0 0 16px rgba(255, 255, 255, 0.6)",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.7,
              fontSize: { xs: "1.05rem", sm: "1.15rem" },
              color: "#251e1eff",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            My Work Planner
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop actions */}
        {!isMobile && (
          <Stack direction="row" spacing={2.5} alignItems="center">
            {token && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  src={profilePictureUrl || undefined}
                  alt={displayName}
                  sx={{
                    width: 32,
                    height: 32,
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {initial.toUpperCase()}
                </Avatar>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: "rgba(71, 63, 63, 0.95)",
                  }}
                >
                  Signed in as <strong>{displayName}</strong>
                </Typography>
              </Stack>
            )}

            <Button
              color="inherit"
              size="medium"
              onClick={handleHome}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "rgba(14, 12, 12, 0.95)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Boards
            </Button>

            {token ? (
              <Button
                variant="outlined"
                color="inherit"
                size="medium"
                onClick={handleLogout}
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  px: 3,
                  py: 0.7,
                  fontWeight: 600,
                  borderColor: "rgba(15, 22, 220, 0.4)",
                  color: "#1c1b1eff",
                  "&:hover": {
                    borderColor: "rgba(23, 22, 22, 0.7)",
                    backgroundColor: "rgba(59, 66, 166, 0.1)",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                size="medium"
                onClick={handleLogin}
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  px: 3,
                  py: 0.7,
                  fontWeight: 600,
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                  color: "#1b1717ff",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.35)",
                    boxShadow: "0 6px 16px rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Stack>
        )}

        {/* Mobile menu */}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ ml: 1, color: "#ffffff" }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                  color: "#ffffff",
                },
              }}
            >
              {token && (
                <MenuItem disabled dense>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                    Signed in as <strong>{displayName}</strong>
                  </Typography>
                </MenuItem>
              )}

              <MenuItem onClick={handleBoardsClick}>
                <Typography sx={{ color: "#ffffff" }}>Boards</Typography>
              </MenuItem>

              {token ? (
                <MenuItem onClick={handleLogoutClick}>
                  <Typography sx={{ color: "#ffffff" }}>Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleLoginClick}>
                  <Typography sx={{ color: "#ffffff" }}>Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
