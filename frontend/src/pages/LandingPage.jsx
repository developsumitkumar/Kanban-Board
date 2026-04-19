import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundImage: "url('/Images/LandingPage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      }}
    >
      {/* right-side overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to left, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0.4), rgba(255,255,255,0))",
        }}
      />

      {/* content */}
      <Box
        sx={{
          position: "relative",
          maxWidth: 600,
          mr: { xs: 3, sm: 6, md: 10 },
          textAlign: "right",
          animation: "fadeUp 0.8s ease-out",
        }}
      >
        <Typography
          sx={{
            letterSpacing: 4,
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#64748b",
            mb: 1,
          }}
        >
          WELCOME
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#0f172a",
          }}
        >
          My Work Planner
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: "1.05rem",
            color: "#475569",
            maxWidth: 480,
            ml: "auto",
          }}
        >
          Organize your tasks effortlessly with a modern Kanban board designed
          for clarity, focus, and productivity.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 4, justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              px: 4,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 999,
              textTransform: "none",
              backgroundColor: "#0f172a",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              "&:hover": {
                backgroundColor: "#020617",
                transform: "translateY(-1px)",
              },
            }}
          >
            Log in
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/register")}
            sx={{
              px: 4,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 999,
              textTransform: "none",
              borderColor: "#0f172a",
              color: "#0f172a",
              "&:hover": {
                backgroundColor: "rgba(15,23,42,0.05)",
              },
            }}
          >
            Sign up
          </Button>
        </Stack>
      </Box>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}

export default LandingPage;
