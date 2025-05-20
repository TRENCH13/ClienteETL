import { View, Text, Pressable, Image, TextStyle } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { styles } from '../screens/NewUser/NewUserStyles'

export default function Navbar() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path: string) => location.pathname.startsWith(path)


    const getNavItemStyle = (path: string): TextStyle => ({
        color: isActive(path)
            ? '#fff'
            : isDark
                ? '#fff'
                : '#000',
        fontWeight: isActive(path) ? 'bold' : 'normal',
        borderBottomWidth: isActive(path) ? 2 : 0,
        backgroundColor: isActive(path)
            ? '#555'
            : isDark
                ? '#1e1e1e'
                : '#F1F9F5',
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderRadius: 6,
    })

    return (
        <View style={styles.navbar}>
            <Pressable onPress={() => navigate('/morning')}>
                <Text style={getNavItemStyle('/morning')}>Reporte Matutino</Text>
            </Pressable>

            <Pressable onPress={() => navigate('/logbook')}>
                <Text style={getNavItemStyle('/logbook')}>Bitácora de Reportes</Text>
            </Pressable>

            <Image
                source={{ uri: '/chedraui.png' }}
                style={styles.logo}
                resizeMode="contain"
            />

            <Pressable onPress={() => navigate('/etlmanage')}>
                <Text style={getNavItemStyle('/etlmanage')}>Gestión de ETLs</Text>
            </Pressable>

            <Pressable onPress={() => navigate('/accessmanage')}>
                <Text style={getNavItemStyle('/accessmanage')}>Gestión de Permisos</Text>
            </Pressable>
        </View>
    )
}
