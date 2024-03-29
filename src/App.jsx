import { ThemeProvider } from "@emotion/react";
import AppRoutes from "./AppRoutes";
import { BrowserRouter} from 'react-router-dom';
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Theme from "./Theme/Theme";
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
        <AuthProvider>
              <AppRoutes />
        </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
