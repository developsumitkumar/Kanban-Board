import { useState } from "react";
import {
  Box,
  Avatar,
  Grid,
  Typography,
  Button,
} from "@mui/material";

const PRESET_AVATARS = Array.from({ length: 16 }).map(
  (_, i) => `/avatars/avatar${i + 1}.jpg`
);

function AvatarPicker({ value, onChange, onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !onUpload) return;
    try {
      setUploading(true);
      const url = await onUpload(file); // backend returns final URL
      onChange(url);
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography 
        variant="subtitle2" 
        sx={{ 
          mb: 1,
          color: "rgba(255, 255, 255, 0.9)",
          fontWeight: 600,
        }}
      >
        Choose an avatar
      </Typography>

      <Grid container spacing={1}>
        {PRESET_AVATARS.map((src) => (
          <Grid item xs={3} key={src}>
            <Avatar
              src={src}
              sx={{
                width: 48,
                height: 48,
                cursor: "pointer",
                border: value === src
                  ? "3px solid #ffffff"
                  : "2px solid rgba(255, 255, 255, 0.2)",
                transform: value === src ? "scale(1.15)" : "scale(1)",
                transition: "all 0.2s ease-in-out",
                boxShadow: value === src 
                  ? "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(37, 99, 235, 0.6)"
                  : "none",
                "&:hover": {
                  transform: "scale(1.1)",
                  border: "2px solid rgba(255, 255, 255, 0.5)",
                },
              }}
              onClick={() => onChange(src)}
            />
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="body2"
        sx={{ 
          mt: 2, 
          mb: 1,
          color: "rgba(255, 255, 255, 0.8)",
        }}
      >
        Or upload your own
      </Typography>

      <Button
        variant="outlined"
        component="label"
        size="small"
        disabled={uploading || !onUpload}
        sx={{
          borderColor: "rgba(255, 255, 255, 0.3)",
          color: "rgba(255, 255, 255, 0.9)",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.6)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {uploading ? "Uploading..." : "Upload image"}
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  );
}

export default AvatarPicker;