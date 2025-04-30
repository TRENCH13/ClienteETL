import {Image, Pressable, Text, View} from "react-native";
import {styles} from "../MorningReport/MorningReportStyles.ts";
import {useTheme} from "../../context/ThemeContext.tsx";
import {useNavigate} from "react-router-dom";
import {ImExit} from "react-icons/im";

export default function LogBookScreen() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            {/* Botón de modo */}
            <View style={styles.themeSwitch}>
                <Pressable onPress={toggleTheme}>
                    <Text style={styles.themeIcon}>{isDark ? '🌞' : '🌙'}</Text>
                </Pressable>
            </View>

            <View style={styles.logoutBtn}>
                <Pressable onPress={() => {
                    const confirmLogout = window.confirm('¿Estás seguro de que deseas salir del sistema?');
                    if (confirmLogout) {
                        navigate('/');
                    }
                }}>
                    <ImExit size={28} color={isDark ? '#ffffff' : '#000000'} />
                </Pressable>
            </View>

            {/* Header de navegación */}
            <View style={styles.navbar}>

                <Pressable onPress={() => navigate('/morning')}>
                    <Text style={[styles.navItem, isDark && styles.navItemDark]}>Reporte Matutino</Text>
                </Pressable>

                <Pressable onPress={() => navigate('/logbook')}>
                    <Text style={[styles.navItem, styles.active, isDark && styles.navItemDark]}>Bitácora de Reportes</Text>
                </Pressable>

                <Image
                    source={{ uri: '/chedraui.png' }}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Pressable onPress={() => navigate('/etlmanage')}>
                    <Text style={[styles.navItem, isDark && styles.navItemDark]}>Gestión de ETLs</Text>
                </Pressable>

                <Pressable onPress={() => navigate('/accessmanage')}>
                    <Text style={[styles.navItem, isDark && styles.navItemDark]}>Gestión de Permisos</Text>
                </Pressable>

            </View>
        </View>
    )
}