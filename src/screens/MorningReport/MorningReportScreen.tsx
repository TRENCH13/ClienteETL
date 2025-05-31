import {
    View,
    Text,
    Pressable,
    ScrollView,
} from 'react-native';
import { useEffect, useState } from "react";
import { styles } from './MorningReportStyles';
import PageLayout from "../../components/PageLayout.tsx";
import { useTheme } from "../../context/ThemeContext.tsx";
import {
    getReportesCriticosNoAcusados,
    getReportesDeHoy,
    acusarReporte,
    Reporte
} from "../../services/ReporteService.ts";
import ReusableTable from "../../components/Table.tsx";

export default function MorningReportScreen() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [isAscending, setIsAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;

    const [sortedData, setSortedData] = useState<Reporte[]>([]);
    const [reportesCriticos, setReportesCriticos] = useState<Reporte[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [seleccionados, setSeleccionados] = useState<number[]>([]);

    useEffect(() => {
        cargarReportes();
    }, []);

    const cargarReportes = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token no encontrado');

            const [reportesHoy, criticos] = await Promise.all([
                getReportesDeHoy(token),
                getReportesCriticosNoAcusados(token)
            ]);

            setSortedData(reportesHoy);
            setReportesCriticos(criticos);
        } catch (err) {
            console.error('Error al cargar reportes:', err);
        }
    };

    const acusarReportes = async (ids: number[]) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token no encontrado');
            return;
        }

        const exitosos: number[] = [];
        const fallidos: number[] = [];

        await Promise.all(ids.map(async (id) => {
            try {
                console.log("▶️ Acusando reporte:", id);
                await acusarReporte(id, token);
                exitosos.push(id);
            } catch (error) {
                console.error(`❌ Error al acusar reporte con ID ${id}:`, error);
                fallidos.push(id);
            }
        }));

        console.log(`✅ Reportes acusados exitosamente:`, exitosos);
        if (fallidos.length > 0) {
            console.warn(`⚠️ Algunos reportes fallaron al acusarse:`, fallidos);
        }

        // Opcional: alertar al usuario
        if (exitosos.length > 0) {
            alert(`Se acusaron ${exitosos.length} reporte(s) exitosamente.`);
        }
        if (fallidos.length > 0) {
            alert(`Error al acusar ${fallidos.length} reporte(s): ${fallidos.join(', ')}`);
        }

        await cargarReportes(); // refresca datos visualmente
    };

    const toggleSort = () => {
        const sorted = [...sortedData].sort((a, b) => {
            const idA = a.idReporte;
            const idB = b.idReporte;
            return isAscending ? idA - idB : idB - idA;
        });
        setSortedData(sorted);
        setIsAscending(!isAscending);
        setCurrentPage(0);
    };

    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const startIndex = currentPage * rowsPerPage;
    const currentRows = sortedData.slice(startIndex, startIndex + rowsPerPage);

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <PageLayout>
                <Text style={[styles.title, isDark && styles.titleDark]}>Bienvenido</Text>
                <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                    Este es el reporte matutino de ejecución del día de hoy:
                </Text>

                <Pressable
                    style={[
                        styles.criticalBtnCircle,
                        reportesCriticos.length > 0 ? styles.criticalRed : styles.criticalGray
                    ]}
                    onPress={() => {
                        if (reportesCriticos.length > 0) setModalVisible(true);
                    }}
                >
                    <Text style={styles.criticalBtnText}>⚠️</Text>
                </Pressable>

                <View style={[styles.tableHeader, isDark && styles.tableHeaderDark]}>
                    <Pressable onPress={toggleSort} style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>
                            ID {isAscending ? '⬇️' : '⬆️'}
                        </Text>
                    </Pressable>
                    <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>
                        Nombre del ETL
                    </Text>
                    <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>
                        Tipo
                    </Text>
                    <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>
                        Detalle
                    </Text>
                </View>

                <ScrollView style={styles.table}>
                    {currentRows.map((item) => (
                        <View key={item.idReporte} style={[styles.tableRow, isDark && styles.tableRowDark]}>
                            <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>{item.idReporte}</Text>
                            <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>{item.etl.nombreEtl}</Text>
                            <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>{item.etl.tipoEtl}</Text>
                            <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>{item.statusReporte}</Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.pagination}>
                    <Pressable onPress={handlePrevious} disabled={currentPage === 0}>
                        <Text style={[styles.pageBtn, currentPage === 0 && { opacity: 0.4 }]}>Anterior</Text>
                    </Pressable>
                    <Text style={styles.pageBtn}>Página {currentPage + 1} / {totalPages}</Text>
                    <Pressable onPress={handleNext} disabled={currentPage === totalPages - 1}>
                        <Text style={[styles.pageBtn, currentPage === totalPages - 1 && { opacity: 0.4 }]}>Siguiente</Text>
                    </Pressable>
                </View>
            </PageLayout>

            {/* Modal */}
            {modalVisible && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Reportes Críticos</Text>
                        <Text style={styles.modalText}>
                            Tienes {reportesCriticos.length} reporte(s) crítico(s) sin acusar.
                        </Text>

                        <ReusableTable
                            headers={[
                                { key: 'idEtl', label: 'ID' },
                                { key: 'nombreEtl', label: 'Nombre' },
                                { key: 'tipoEtl', label: 'Tipo' },
                                { key: 'checked', label: 'Revisado' },
                            ]}
                            data={reportesCriticos}
                            isDark={isDark}
                            renderRow={(reporte) => [
                                reporte.etl.idEtl,
                                reporte.etl.nombreEtl,
                                reporte.etl.tipoEtl,
                                <input
                                    type="checkbox"
                                    checked={seleccionados.includes(reporte.idReporte)}
                                    onChange={() => {
                                        setSeleccionados(prev =>
                                            prev.includes(reporte.idReporte)
                                                ? prev.filter(id => id !== reporte.idReporte)
                                                : [...prev, reporte.idReporte]
                                        );
                                    }}
                                />
                            ]}
                        />


                        <Pressable
                            onPress={async () => {
                                await acusarReportes(seleccionados);
                                setModalVisible(false);
                                setSeleccionados([]);
                            }}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Guardar y cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </>
    );
}
