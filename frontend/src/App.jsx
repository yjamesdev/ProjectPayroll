import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./views/global/Topbar";
import Sidebar from "./views/global/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./views/dashboard/Index";
import Employee from "./views/Employee/Index";
import Report from "./views/Report/Index";
import Profile from "./views/Profile/Index";
import Attendance from "./views/Attendance/Index";
import Calendar from "./views/Calendar/Index";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <main className="content">
              <Topbar />
              <Router>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/Employee" element={<Employee />} />
                  <Route path="/Report" element={<Report />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/Attendance" element={<Attendance />} />
                  <Route path="/Calendar" element={<Calendar />} />
                </Routes>
              </Router>
              <Sidebar />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
