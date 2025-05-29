import { useEffect, useState } from 'react';
import MorningReportScreen from '../MorningReport/MorningReportScreen.tsx';
import NavBar from '../../components/NavBar';
import NavBarConsultant from '../../components/NavBarConsultant';

export default function RoleBasedMorningScreen() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsed = JSON.parse(userData);
            setRole(parsed.rol);
        }
    }, []);

    if (!role) return null;

    return (
        <>
            {role === 'Administrador' ? <NavBar /> : <NavBarConsultant />}
            <MorningReportScreen />
        </>
    );
}
