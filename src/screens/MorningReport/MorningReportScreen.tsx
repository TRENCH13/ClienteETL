import {
    View,
    Text,
    Pressable,
    ScrollView, Image
} from 'react-native'
import { styles } from './MorningReportStyles'
import { useTheme } from '../../context/ThemeContext'

export default function MorningReportScreen() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    const dummyData = [
        { id: '013', name: 'Lorem ipsum dolor sit amet', type: 'Procesamiento' },
        { id: '027', name: 'Lorem ipsum dolor sit amet', type: 'Alerta' },
        { id: '030', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '037', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '041', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '055', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
    ]

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            {/* Botón de modo */}
            <View style={styles.themeSwitch}>
                <Pressable onPress={toggleTheme}>
                    <Text style={styles.themeIcon}>{isDark ? '🌞' : '🌙'}</Text>
                </Pressable>
            </View>

            {/* Header de navegación */}
            <View style={styles.navbar}>
                <Text style={[styles.navItem, styles.active]}>Reporte Matutino</Text>
                <Text style={styles.navItem}>Bitácora de Reportes</Text>
                <Image
                    source={{ uri: '/chedraui.png' }}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.navItem}>Gestión de ETLs</Text>
                <Text style={styles.navItem}>Gestión de Permisos</Text>
            </View>

            {/* Título */}
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>
                Este es el reporte matutino de ejecución del día de hoy:
            </Text>

            {/* Tabla */}
            <ScrollView style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableCell}>ID ⬇️</Text>
                    <Text style={styles.tableCell}>Nombre del ETL</Text>
                    <Text style={styles.tableCell}>Tipo</Text>
                    <Text style={styles.tableCell}>Detalle</Text>
                </View>

                {dummyData.map((item) => (
                    <View key={item.id} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.id}</Text>
                        <Text style={styles.tableCell}>{item.name}</Text>
                        <Text style={styles.tableCell}>{item.type}</Text>
                        <Text style={styles.tableCell}>🔗</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Paginación */}
            <View style={styles.pagination}>
                <Text style={styles.pageBtn}>Anterior</Text>
                <Text style={styles.pageBtn}>Siguiente</Text>
            </View>
        </View>
    )
}
