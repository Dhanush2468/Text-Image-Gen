import { Stack, Typography } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      py={2}
      px={{ xs: 2, md: 15 }}
      position="fixed"
      sx={{
        
        width: "100%",
          background: "linear-gradient(90deg, #0F1928, #0A0C10)",
        zIndex: 2
      }}
    >
      <Typography fontWeight="bold" fontSize={20} color="white">
        ArtiGen
      </Typography>
    </Stack>
  );
};

export default Navbar;
