import {
    View,
    Text,
} from 'react-native'
import {styles} from "../AccessManagement/AccessManagementStyles.ts";
import ThemeSwitch from "../../components/ThemeSwitch.tsx";
import Navbar from "../../components/NavBar.tsx";
import {useTheme} from "../../context/ThemeContext.tsx";
import BackButton from "../../components/BackButton.tsx";
import {useState} from "react";

export default function NewUserScreen() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [searchQuery, setSearchQuery] = useState('');
    const [foundUser, setFoundUser] = useState<string | null>(null);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // Simulación: si escribes "TaylorSwift" es válido, si no, no se encuentra
        if (query.trim().toLowerCase() === 'taylorswift') {
            setFoundUser('Taylor Swift');
        } else {
            setFoundUser(null);
        }
    };

    return(
        <View style={[styles.container, isDark && styles.containerDark]}>
            <ThemeSwitch />
            <Navbar />

            <BackButton/>

            {/* Título y Subititulo */}
            <Text style={[styles.title, isDark && styles.titleDark]}>Crea un Nuevo Usuario</Text>

            {/* INPUT - usando HTML input por Vite + RN Web */}
            <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginTop: 40,
                    padding: '8px 12px',
                    borderRadius: 20,
                    border: '1px solid #ccc',
                    width: 300,
                    fontSize: 16,
                }}
            />

            {/* Placeholder de resultado */}
            <Text style={{
                textAlign: 'center',
                marginTop: 12,
                fontSize: 16,
                fontStyle: 'italic',
                color: isDark ? '#ccc' : '#555'
            }}>
                {searchQuery === ''
                    ? 'Ingresa un nombre para buscar'
                    : foundUser
                        ? `Usuario encontrado: ${foundUser}`
                        : 'Usuario no encontrado'}
            </Text>

            



        </View>
    )
}