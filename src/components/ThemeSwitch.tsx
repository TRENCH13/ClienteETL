import { Pressable, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { ImExit } from 'react-icons/im'
import { styles } from '../screens/NewUser/NewUserStyles'

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()

    const handleLogout = () => {
        const confirmLogout = window.confirm('¿Estás seguro de que deseas salir del sistema?')
        if (confirmLogout) {
            navigate('/')
        }
    }

    return (
        <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5',
            zIndex: 1000,
        }}>
            <Pressable onPress={toggleTheme}>
                <Text style={styles.themeIcon}>{isDark ? '🌞' : '🌙'}</Text>
            </Pressable>

            <Pressable onPress={handleLogout}>
                <ImExit size={28} color={isDark ? '#ffffff' : '#000000'} />
            </Pressable>
        </View>
    )
}
