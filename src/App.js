import { Box, createTheme, ThemeProvider } from "@mui/material";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        m={0}
        height="100vh"
        sx={{
          background: "linear-gradient(90deg, #0F1928, #0A0C10)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <Box sx={{ flex: 1, width: "100%", overflowY: "auto" }}>
          <Form />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
