import {Image, Pressable, ScrollView, Text, View} from "react-native";
import {styles} from "./AccessManagementStyles.ts";
import {useTheme} from "../../context/ThemeContext.tsx";
import {useNavigate} from "react-router-dom";
import {ImExit} from "react-icons/im";
import {useState} from "react";

export default function AccessManagementScreen() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()

    const [isAscending, setIsAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0)
    const [searchQuery, setSearchQuery] = useState('');

    const rowsPerPage = 5

    const [sortedData, setSortedData] = useState([
        { name: 'Cristiano Ronaldo', role: 'Administrador', etlAccess: 20 },
        { name: 'Taylor Swift', role: 'Consultor', etlAccess: 13 },
        { name: 'Tom Brady', role: 'Consultor', etlAccess: 2 },
        { name: 'Guillermo del Toro', role: 'Consultor', etlAccess: 1 },
        { name: 'Gabriel Montiel', role: 'Consultor', etlAccess: 6 },
        { name: 'Stephen Curry', role: 'Administrador', etlAccess: 50 },
        { name: 'Ariana Grande', role: 'Consultor', etlAccess: 13 },
        { name: 'Michael Jordan', role: 'Consultor', etlAccess: 2 },
        { name: 'Sabrina Carpenter', role: 'Consultor', etlAccess: 1 },
        { name: 'Luisito Rey', role: 'Consultor', etlAccess: 6 },
    ]);

    const toggleSort = () => {
        const sorted = [...sortedData].sort((a, b) => {
            if (isAscending) {
                return a.etlAccess - b.etlAccess;
            } else {
                return b.etlAccess - a.etlAccess;
            }
        });
        setSortedData(sorted);
        setIsAscending(!isAscending);
        setCurrentPage(0);
    };

    const filteredData = sortedData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.etlAccess.toString().includes(searchQuery)
    );
    const totalPagis = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = currentPage * rowsPerPage;
    const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage < totalPagis - 1) setCurrentPage(currentPage + 1)
    }


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
                    <Text style={[styles.navItem, isDark && styles.navItemDark]}>Bitácora de Reportes</Text>
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
                    <Text style={[styles.navItem, styles.active, isDark && styles.navItemDark]}>Gestión de Permisos</Text>
                </Pressable>
            </View>

            {/* Título y Subititulo */}
            <Text style={[styles.title, isDark && styles.titleDark]}>Gestión de Permisos</Text>

            {/* Buscador y botón */}
            <View style={styles.searchContainer}>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: isDark ? '#fff' : '#000' }}>
                        Busca un Usuario
                    </Text>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(0);
                        }}
                        style={{
                            marginTop: 8,
                            padding: '8px 12px',
                            borderRadius: 20,
                            border: '1px solid #ccc',
                            width: 400,
                            fontSize: 16,
                        }}
                    />
                </View>

                <Pressable
                    style={[styles.addBtn, isDark && styles.addBtnDark]}
                    onPress={() => console.log("Btn Presionado")}
                >
                    <Text style={[styles.addBtnTxt, isDark && styles.addBtnDark]}>Agregar Usuario</Text>
                </Pressable>

            </View>

            {/* Header de la tabla */}
            <View style={[styles.tableHeader, isDark && styles.tableHeaderDark]}>
                <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>
                    Nombre del Usuario
                </Text>
                <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>
                    Rol
                </Text>
                <Pressable onPress={toggleSort} style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>
                        No. de Accesos a ETLs {isAscending ? '⬇️' : '⬆️'}
                    </Text>
                </Pressable>
            </View>

            {/* Tabla con paginación */}
            <ScrollView style={styles.table}>
                {currentRows.map((item, index) => (
                    <View key={index} style={[styles.tableRow, isDark && styles.tableRowDark]}>
                        <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>{item.name}</Text>
                        <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>{item.role}</Text>
                        <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>{item.etlAccess}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Paginación */}
            <View style={styles.pagination}>
                {/* Botón anterior */}
                <Pressable onPress={handlePrevious} disabled={currentPage === 0}>
                    <Text style={[
                        styles.pageBtn,
                        currentPage === 0 && { opacity: 0.4 }
                    ]}>
                        Anterior
                    </Text>
                </Pressable>

                {/* Información de rango y total */}
                <Text style={styles.pageBtn}>
                    Mostrando {
                    filteredData.length > 0
                        ? `${startIndex + 1} a ${Math.min(startIndex + rowsPerPage, filteredData.length)}`
                        : '0'
                } de {filteredData.length} Usuarios
                </Text>

                {/* Botón siguiente */}
                <Pressable onPress={handleNext} disabled={currentPage >= totalPagis - 1}>
                    <Text style={[
                        styles.pageBtn,
                        currentPage >= totalPagis - 1 && { opacity: 0.4 }
                    ]}>
                        Siguiente
                    </Text>
                </Pressable>
            </View>


        </View>
    )
}
