import {
    View,
    Text,
    Pressable,
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
import { useNavigate } from 'react-router-dom';

type FlatReporte = {
    id: string;
    name: string;
    type: string;
    detail: string;
};

export default function MorningReportScreen() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();



    const [reportesCriticos, setReportesCriticos] = useState<Reporte[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [seleccionados, setSeleccionados] = useState<number[]>([]);
    const [etlList, setEtlList] = useState<FlatReporte[]>([]);
    const [huboError, setHuboError] = useState(false);
    const [intentoCargado, setIntentoCargado] = useState(false);


    const etlHeaders = [
        { key: 'id', label: 'ID del Reporte' },
        { key: 'name', label: 'Nombre del ETL' },
        { key: 'type', label: 'Tipo' },
        { key: 'detail', label: 'Detalle' }
    ];

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

            const planos: FlatReporte[] = reportesHoy.map(r => ({
                id: String(r.idReporte),
                name: r.etl.nombreEtl,
                type: r.etl.tipoEtl,
                detail: r.statusReporte,
            }));

            setEtlList(planos);
            setReportesCriticos(criticos);
            setHuboError(false); // éxito
        } catch (err) {
            console.error('Error al cargar reportes:', err);
            setHuboError(true); // marca error
        } finally {
            setIntentoCargado(true); // ya se intentó cargar, éxito o fallo
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

                <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                    <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                        Reportes del día:
                    </Text>

                    {huboError ? (
                        <Text style={{ color: isDark ? '#fff' : '#000', marginTop: 10 }}>
                            No se pudo conectar con el servidor. Intenta nuevamente más tarde.
                        </Text>
                    ) : intentoCargado && etlList.length === 0 ? (
                        <Text style={{ color: isDark ? '#fff' : '#000', marginTop: 10 }}>
                            No hay reportes disponibles para el día de hoy.
                        </Text>
                    ) : (
                        <ReusableTable
                            headers={etlHeaders}
                            data={etlList}
                            isDark={isDark}
                            renderRow={(item) => [item.id, item.name, item.type, item.detail]}
                            onRowClick={(item) => navigate(`/reportdetails/${item.id}`)}
                        />
                    )}
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
                                    data-testid="modal-confirm-checkbox"
                                    checked={reporte.idReporte != null && seleccionados.includes(reporte.idReporte)}
                                    onChange={() => {
                                        if (reporte.idReporte == null) return;
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
