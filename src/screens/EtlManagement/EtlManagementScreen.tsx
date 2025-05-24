import {ActivityIndicator, Pressable, Text, View} from "react-native";
import {styles} from "./EtlManagementStyles.ts";
import PageLayout from "../../components/PageLayout.tsx";
import ReusableTable from "../../components/Table.tsx";
import {useState} from "react";
import {useTheme} from "../../context/ThemeContext.tsx";

export default function EtlManagementScreen() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [isAscending, setIsAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0)
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const rowsPerPage = 5

    const [sortedData, setSortedData] = useState([
        { id: '013', name: 'Lorem ipsum dolor sit amet', type: 'Procesamiento' },
        { id: '027', name: 'Lorem ipsum dolor sit amet', type: 'Alerta' },
        { id: '030', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '037', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '041', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '130', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '137', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '141', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
    ]);

    const headers = [
        { key: 'id', label: 'ID del ETL', sortable: true, ascending: isAscending },
        { key: 'name', label: 'Nombre del ETL' },
        { key: 'type', label: 'Tipo' },
        { key: 'detail', label: 'Detalle' }
    ];

    const toggleSort = () => {
        const sorted = [...sortedData].sort((a, b) => {
            const idAb = parseInt(a.id, 10);
            const idB = parseInt(b.id, 10);
            if (isAscending) {
                return idAb - idB;
            } else {
                return idB - idAb;
            }
        });
        setSortedData(sorted);
        setIsAscending(!isAscending);
        setCurrentPage(0)
    };

    const handleSort = (key: string) => {
        if (key === 'id') toggleSort();
    };

    const filteredData = sortedData.filter(item =>
        item.id.includes(searchQuery) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPags = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = currentPage * rowsPerPage;
    const currentRows = filteredData.slice(startIndex, startIndex + rowsPerPage);


    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage < totalPags - 1) setCurrentPage(currentPage + 1)
    }

    return (
        <PageLayout
            overlay={
                modalVisible && (
                    <View style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999,
                    }}>
                        <View style={{
                            backgroundColor: isDark ? '#1e1e1e' : '#f1f9f5',
                            padding: 40,
                            borderRadius: 20,
                            width: '90%',
                            maxWidth: 500,
                            position: 'relative',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                    width: 32,
                                    height: 32,
                                    borderRadius: 4,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#f1f9f5'
                                }}
                            >
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>✕</Text>
                            </Pressable>

                            <Text style={{
                                fontSize: 28,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginBottom: 30,
                                color: isDark ? '#fff' : '#000'
                            }}>
                                Crea un ETL
                            </Text>

                            <Text style={{ fontWeight: '600', marginBottom: 4, color: isDark ? '#fff' : '#000' }}>Nombre del ETL</Text>
                            <input
                                type="text"
                                placeholder="ETL Crítico"
                                style={{
                                    padding: 10,
                                    borderRadius: 6,
                                    border: '1px solid #ccc',
                                    width: '100%',
                                    marginBottom: 16,
                                    fontSize: 14
                                }}
                            />

                            <Text style={{ fontWeight: '600', marginBottom: 4, color: isDark ? '#fff' : '#000' }}>Descripción del ETL</Text>
                            <input
                                type="text"
                                placeholder="Este es un ETL de carácter crítico"
                                style={{
                                    padding: 10,
                                    borderRadius: 6,
                                    border: '1px solid #ccc',
                                    width: '100%',
                                    marginBottom: 16,
                                    fontSize: 14
                                }}
                            />

                            <Text style={{ fontWeight: '600', marginBottom: 4, color: isDark ? '#fff' : '#000' }}>Tipo de ETL</Text>
                            <select
                                style={{
                                    padding: 10,
                                    borderRadius: 6,
                                    border: '1px solid #ccc',
                                    width: '100%',
                                    marginBottom: 30,
                                    fontSize: 14
                                }}
                            >
                                <option>Archivo</option>
                                <option>Alerta</option>
                                <option>Procesamiento</option>
                            </select>

                            <Pressable
                                onPress={() => {
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        setIsLoading(false);
                                        alert('ETL guardado');
                                        setModalVisible(false);
                                    }, 2000);
                                }}
                                style={{
                                    backgroundColor: '#555',
                                    paddingVertical: 12,
                                    paddingHorizontal: 20,
                                    borderRadius: 6,
                                    alignSelf: 'center',
                                }}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                                        Guardar ETL
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                    </View>
                )
            }
        >
            <Text style={[styles.title, isDark && styles.titleDark]}>Gestión de ETLs</Text>

            <Pressable
                style={[styles.addBtn, isDark && styles.addBtnDark]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={[styles.addBtnTxt, isDark && styles.addBtnDark]}>Agregar ETL</Text>
            </Pressable>

            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: isDark ? '#fff' : '#000' }}>
                    Busca un ETL
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
                        width: 300,
                        fontSize: 16,
                    }}
                />
            </View>

            <ReusableTable
                headers={headers}
                data={currentRows}
                isDark={isDark}
                onSort={handleSort}
                renderRow={(item) => [item.id, item.name, item.type, 'Editar']}
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
                } de {filteredData.length} ETLs
                </Text>

                <Pressable onPress={handleNext} disabled={currentPage >= totalPags - 1}>
                    <Text style={[
                        styles.pageBtn,
                        currentPage >= totalPags - 1 && { opacity: 0.4 }
                    ]}>
                        Siguiente
                    </Text>
                </Pressable>
            </View>
        </PageLayout>
    );
}