 import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/Login/LoginScreen'
import MorningReportScreen from './screens/MorningReport/MorningReportScreen'
import { ThemeProvider } from './context/ThemeContext'
import LogBookScreen from "./screens/LogBook/LogBookScreen.tsx";
import EtlManagementScreen from "./screens/EtlManagement/EtlManagementScreen.tsx";
import AccessManagementScreen from "./screens/AccessManagement/AccessManagementScreen.tsx";
 import NewUserScreen from "./screens/NewUser/NewUserScreen.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/morning" element={<MorningReportScreen />} />
                    <Route path="/logbook" element={<LogBookScreen />} />
                    <Route path="/etlmanage" element={<EtlManagementScreen />} />
                    <Route path="/accessmanage" element={<AccessManagementScreen />} />
                    <Route path="/accessmanage/newuser" element={<NewUserScreen />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
)
