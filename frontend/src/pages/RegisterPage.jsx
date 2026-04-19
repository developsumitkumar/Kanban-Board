import { useState } from "react";
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
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import AvatarPicker from "../components/AvatarPicker";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    admin: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    const value =
      field === "admin" ? e.target.value === "true" : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

const validate = () => {
  const newErrors = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  let ok = true;

  // Name: required, min length, only letters/spaces
  if (!form.name.trim()) {
    newErrors.name = "Name is required";
    ok = false;
  } else if (form.name.trim().length < 3) {
    newErrors.name = "Name must be at least 3 characters";
    ok = false;
  } else if (!/^[A-Za-z\s]+$/.test(form.name.trim())) {
    newErrors.name = "Name can contain only letters and spaces";
    ok = false;
  }
 
  // Username: required, 3–20 chars, letters/numbers/underscore
  if (!form.username.trim()) {
    newErrors.username = "Username is required";
    ok = false;
  } else if (form.username.trim().length < 3) {
    newErrors.username = "Username must be at least 3 characters";
    ok = false;
  } else if (form.username.trim().length > 20) {
    newErrors.username = "Username cannot exceed 20 characters";
    ok = false;
  } else if (!/^[A-Za-z0-9_]+$/.test(form.username.trim())) {
    newErrors.username = "Username can contain only letters, numbers and underscore";
    ok = false;
  }

  // Email: required + pattern
  if (!form.email.trim()) {
    newErrors.email = "Email is required";
    ok = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    newErrors.email = "Please enter a valid email address";
    ok = false;
  }

  // Password: required + strong pattern
  const password = form.password;
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/; // 8+ chars, upper, lower, digit, special[web:18]

  if (!password) {
    newErrors.password = "Password is required";
    ok = false;
  } else if (!strongPasswordRegex.test(password)) {
    newErrors.password =
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    ok = false;
  }

  // Confirm password: required + match
  if (!form.confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
    ok = false;
  } else if (form.confirmPassword !== form.password) {
    newErrors.confirmPassword = "Passwords do not match";
    ok = false;
  }

  setErrors(newErrors);
  return ok;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        admin: form.admin,
        profilePictureUrl: avatarUrl || null,
      });

      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/Images/Register.jpg')",
        backgroundSize: "",
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
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(37, 99, 235, 0.3) 100%)",
          backdropFilter: "none",
        }}
      />

      {/* Registration Card */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 480,
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
            Welcome
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "0.95rem",
            }}
          >
            Create your account to get started
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Full Name"
            value={form.name}
            onChange={handleChange("name")}
            fullWidth
            margin="dense"
            error={!!errors.name}
            helperText={errors.name}
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
            label="Username"
            value={form.username}
            onChange={handleChange("username")}
            fullWidth
            margin="dense"
            error={!!errors.username}
            helperText={errors.username}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(248, 250, 252, 0.8)",
              },
            }}
          />

          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            fullWidth
            margin="dense"
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(248, 250, 252, 0.8)",
              },
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange("password")}
            fullWidth
            margin="dense"
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(248, 250, 252, 0.8)",
              },
            }}
          />

          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            fullWidth
            margin="dense"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(248, 250, 252, 0.8)",
              },
            }}
          />

          <AvatarPicker value={avatarUrl} onChange={setAvatarUrl} />

          {error && (
            <Typography
              color="error"
              sx={{
                mt: 2,
                fontSize: "0.875rem",
                textAlign: "center",
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
              mt: 3,
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
              "Create Account"
            )}
          </Button>

          {/* Footer */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography sx={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "0.9rem" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 600,
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RegisterPage;