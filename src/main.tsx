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
 import EditUserScreen from "./screens/EditUser/EditUserScreen.tsx";
 import RoleBasedMorningScreen from "./screens/RoleBasedMoringReport/RoleBasedMorningScreen.tsx";

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
                    <Route path="/accessmanage/edituser" element={<EditUserScreen />} />
                    <Route path="/morning" element={<RoleBasedMorningScreen />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
)
