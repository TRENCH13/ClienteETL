import { View, Text, Pressable, Image } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { styles } from '../screens/NewUser/NewUserStyles'

export default function Navbar() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <View style={styles.navbar}>
            <Pressable onPress={() => navigate('/morning')}>
                <Text style={[
                    styles.navItem,
                    isDark && styles.navItemDark,
                    isActive('/morning') && styles.active
                ]}>Reporte Matutino</Text>
            </Pressable>

            <Pressable onPress={() => navigate('/logbook')}>
                <Text style={[
                    styles.navItem,
                    isDark && styles.navItemDark,
                    isActive('/logbook') && styles.active
                ]}>Bitácora de Reportes</Text>
            </Pressable>

            <Image
                source={{ uri: '/chedraui.png' }}
                style={styles.logo}
                resizeMode="contain"
            />

            <Pressable onPress={() => navigate('/etlmanage')}>
                <Text style={[
                    styles.navItem,
                    isDark && styles.navItemDark,
                    isActive('/etlmanage') && styles.active
                ]}>Gestión de ETLs</Text>
            </Pressable>

            <Pressable onPress={() => navigate('/accessmanage')}>
                <Text style={[
                    styles.navItem,
                    isDark && styles.navItemDark,
                    isActive('/accessmanage') && styles.active
                ]}>Gestión de Permisos</Text>
            </Pressable>
        </View>
    )
}
