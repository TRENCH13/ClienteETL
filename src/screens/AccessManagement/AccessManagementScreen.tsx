import { Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./AccessManagementStyles.ts";
import PageLayout from "../../components/PageLayout.tsx";
import ReusableTable from "../../components/Table.tsx";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.tsx";
import { getTodosLosUsuarios, Usuario } from "../../services/UsuarioService.ts";

export default function AccessManagementScreen() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedData, setSortedData] = useState<{ id: string; name: string; role: string; createdAt: string }[]>([]);

    const rowsPerPage = 5;

    useEffect(() => {
        const cargarUsuarios = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const usuarios = await getTodosLosUsuarios(token);

                const parsed = usuarios.map((u: Usuario) => ({
                    id: String(u.id),
                    name: u.nombre,
                    role: u.rol,
                    createdAt: new Date(u.createdAt).toLocaleDateString('es-MX')  // dd/mm/aaaa
                }));

                setSortedData(parsed);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };

        void cargarUsuarios();
    }, []);

    const filteredData = sortedData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.createdAt.includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = currentPage * rowsPerPage;
    const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const headers = [
        { key: 'name', label: 'Nombre del Usuario' },
        { key: 'role', label: 'Rol' },
        { key: 'createdAt', label: 'Fecha de Creación' }
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
                renderRow={(item) => [item.name, item.role, item.createdAt]}
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
