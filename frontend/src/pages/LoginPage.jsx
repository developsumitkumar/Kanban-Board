import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = { email: "", password: "" };
    let ok = true;

    if (!email.trim()) {
      errs.email = "Email is required";
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Enter a valid email address";
      ok = false;
    }

    if (!password) {
      errs.password = "Password is required";
      ok = false;
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
      ok = false;
    }

    setFieldErrors(errs);
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });

      const {
        token,
        userId,
        isAdmin,
        name,
        username,
        email: returnedEmail,
        profilePictureUrl,
      } = res.data;

      // Save auth + user info
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("isAdmin", String(isAdmin));
      localStorage.setItem("name", name || "");
      localStorage.setItem("username", username || "");
      localStorage.setItem("email", returnedEmail || email);
      localStorage.setItem("profilePictureUrl", profilePictureUrl || "");

      navigate("/boards");
    } catch (err) {
      console.error("login error", err.response || err);
      setError("Login failed. Check email/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/Images/Login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        position: "relative",
        padding: 2,
      }}
    >
      {/* Subtle overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255, 152, 67, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%)",
          backdropFilter: "none",
        }}
      />

      {/* Login Card */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 450,
          mr: { xs: 0, md: 8, lg: 12 },
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(40px) saturate(180%)",
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          p: { xs: 3, sm: 5 },
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#ffffff",
              mb: 1,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "0.95rem",
            }}
          >
            Sign in to access your workspace
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: "" }));
            }}
            fullWidth
            margin="dense"
            autoComplete="email"
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(10px)",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.8)",
                "&.Mui-focused": {
                  color: "rgba(255, 255, 255, 0.9)",
                },
              },
              "& .MuiInputBase-input": {
                color: "#000000",
              },
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors((prev) => ({ ...prev, password: "" }));
            }}
            fullWidth
            margin="dense"
            autoComplete="current-password"
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(10px)",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.8)",
                "&.Mui-focused": {
                  color: "rgba(255, 255, 255, 0.9)",
                },
              },
              "& .MuiInputBase-input": {
                color: "#000000",
              },
            }}
          />

          {error && (
            <Typography
              color="error"
              sx={{
                mb: 2,
                fontSize: "0.875rem",
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "8px",
                borderRadius: 1,
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            disabled={loading}
            fullWidth
            sx={{
              mt: 2,
              height: 50,
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 2.5,
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
              "&:hover": {
                backgroundColor: "#1d4ed8",
                boxShadow: "0 6px 20px rgba(37, 99, 235, 0.35)",
              },
              "&:disabled": {
                backgroundColor: "#cbd5e1",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Footer */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography sx={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "0.9rem" }}>
              New here?{" "}
              <Link
                to="/register"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 600,
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                }}
              >
                Create an account
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;