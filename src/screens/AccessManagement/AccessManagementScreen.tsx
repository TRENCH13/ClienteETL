import {Pressable, Text, View} from "react-native";
import {styles} from "./AccessManagementStyles.ts";
import PageLayout from "../../components/PageLayout.tsx";
import ReusableTable from "../../components/Table.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useTheme} from "../../context/ThemeContext.tsx";

export default function AccessManagementScreen() {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [isAscending, setIsAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0)
    const [searchQuery, setSearchQuery] = useState('');

    const rowsPerPage = 5

    const [sortedData, setSortedData] = useState([
        { id: '001', name: 'Cristiano Ronaldo', role: 'Administrador', etlAccess: 20 },
        { id: '002', name: 'Taylor Swift', role: 'Consultor', etlAccess: 13 },
        { id: '003', name: 'Tom Brady', role: 'Consultor', etlAccess: 2 },
        { id: '004', name: 'Guillermo del Toro', role: 'Consultor', etlAccess: 1 },
        { id: '005', name: 'Gabriel Montiel', role: 'Consultor', etlAccess: 6 },
        { id: '006', name: 'Stephen Curry', role: 'Administrador', etlAccess: 50 },
        { id: '007', name: 'Ariana Grande', role: 'Consultor', etlAccess: 13 },
        { id: '008', name: 'Michael Jordan', role: 'Consultor', etlAccess: 2 },
        { id: '009', name: 'Sabrina Carpenter', role: 'Consultor', etlAccess: 1 },
        { id: '010', name: 'Luisito Rey', role: 'Consultor', etlAccess: 6 },
    ]);


    const handleSort = (key: string) => {
        if (key === 'etlAccess') toggleSort();
    };

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
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = currentPage * rowsPerPage;
    const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
    }

    const headers = [
        { key: 'name', label: 'Nombre del Usuario' },
        { key: 'role', label: 'Rol' },
        { key: 'etlAccess', label: 'No. de Accesos a ETLs', sortable: true, ascending: isAscending }
    ];


    return (
        <PageLayout>
            <Text style={[styles.title, isDark && styles.titleDark]}>Gestión de Permisos</Text>

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
                    onPress={() => navigate('/accessmanage/newuser')}
                >
                    <Text style={[styles.addBtnTxt, isDark && styles.addBtnDark]}>Agregar Usuario</Text>
                </Pressable>
            </View>

            <ReusableTable
                headers={headers}
                data={currentRows}
                isDark={isDark}
                onSort={handleSort}
                renderRow={(item) => [item.name, item.role, item.etlAccess]}
                onRowClick={(item) =>
                    navigate(`/accessmanage/edituser?id=${item.id}&name=${encodeURIComponent(item.name)}`)
                }
            />

            <View style={styles.pagination}>
                <Pressable onPress={handlePrevious} disabled={currentPage === 0}>
                    <Text style={[
                        styles.pageBtn,
                        currentPage === 0 && { opacity: 0.4 }
                    ]}>
                        Anterior
                    </Text>
                </Pressable>

                <Text style={styles.pageBtn}>
                    Mostrando {
                    filteredData.length > 0
                        ? `${startIndex + 1} a ${Math.min(startIndex + rowsPerPage, filteredData.length)}`
                        : '0'
                } de {filteredData.length} Usuarios
                </Text>

                <Pressable onPress={handleNext} disabled={currentPage >= totalPages - 1}>
                    <Text style={[
                        styles.pageBtn,
                        currentPage >= totalPages - 1 && { opacity: 0.4 }
                    ]}>
                        Siguiente
                    </Text>
                </Pressable>
            </View>
        </PageLayout>
    );
}
