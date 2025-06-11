import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import PageLayout from '../../components/PageLayout';
import BackButton from '../../components/BackButton';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetalleReporte } from '../../services/ReporteService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ReportDetailsScreen() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { id } = useParams();
    const [detalle, setDetalle] = useState<any>(null);

    useEffect(() => {
        const fetchDetalle = async () => {
            const token = localStorage.getItem('token');
            if (!token || !id) return;

            try {
                const data = await getDetalleReporte(Number(id), token);
                setDetalle(data);
            } catch (err) {
                console.error('Error al cargar el detalle del reporte:', err);
            }
        };

        void fetchDetalle();
    }, [id]);

    const formatDate = (iso: string | null) =>
        iso ? format(new Date(iso), "dd 'de' MMMM 'de' yyyy", { locale: es }) : 'N/A';

    const formatTime = (iso: string | null) =>
        iso ? format(new Date(iso), "HH:mm:ss", { locale: es }) : 'N/A';

    return (
        <PageLayout>
            <BackButton />
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: isDark ? '#fff' : '#000', textAlign: 'center' }}>
                Detalle de Ejecución de
            </Text>
            <Text style={{ fontSize: 20, color: isDark ? '#fff' : '#000', textAlign: 'center', marginBottom: 20 }}>
                {detalle?.etl?.nombreEtl || 'Sin nombre'}
            </Text>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 30, paddingBottom: 50 }}>
                {/* Generales */}
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: isDark ? '#fff' : '#000' }}>
                    Detalles Generales:
                </Text>
                <Text style={{ color: isDark ? '#fff' : '#000' }}>
                    <Text style={{ fontWeight: 'bold' }}>ID: </Text>{detalle?.idReporte ?? 'N/A'}{"   "}
                    <Text style={{ fontWeight: 'bold' }}>Nombre completo: </Text>{detalle?.etl?.nombreEtl ?? 'N/A'}{"   "}
                    <Text style={{ fontWeight: 'bold' }}>Tipo de ETL: </Text>{detalle?.etl?.tipoEtl ?? 'N/A'}
                </Text>
                <Text style={{ color: isDark ? '#fff' : '#000', marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Fecha del reporte: </Text>{formatDate(detalle?.fechaReporte)}
                </Text>

                {/* Procesamiento */}
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: isDark ? '#fff' : '#000' }}>
                    Detalle Procesamiento:
                </Text>
                {detalle?.detalleProcesamiento ? (
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Nombre: </Text>{detalle.detalleProcesamiento.nombre}
                        </Text>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Fecha: </Text>{formatDate(detalle.detalleProcesamiento.fecha)}
                        </Text>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Nombre del archivo: </Text>{detalle.detalleProcesamiento.nombreArchivo}
                        </Text>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Status: </Text>{detalle.detalleProcesamiento.status}
                        </Text>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Mensaje: </Text>{detalle.detalleProcesamiento.mensaje}
                        </Text>
                    </View>
                ) : (
                    <Text style={{ color: isDark ? '#aaa' : '#555', marginBottom: 20 }}>No aplica.</Text>
                )}

                {/* Archivo */}
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: isDark ? '#fff' : '#000' }}>
                    Detalle Archivo:
                </Text>
                {detalle?.detalleArchivo ? (
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Status: </Text>{detalle.detalleArchivo.status}
                        </Text>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Mensaje: </Text>{detalle.detalleArchivo.mensaje}
                        </Text>
                    </View>
                ) : (
                    <Text style={{ color: isDark ? '#aaa' : '#555', marginBottom: 20 }}>No aplica.</Text>
                )}

                {/* Alerta */}
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: isDark ? '#fff' : '#000' }}>
                    Detalle Alerta:
                </Text>
                {detalle?.detalleAlerta ? (
                    <View>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Nombre: </Text>{detalle.detalleAlerta.nombre}
                        </Text>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Host: </Text>{detalle.detalleAlerta.hostName}
                        </Text>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Hora de inicio: </Text>{formatTime(detalle.detalleAlerta.horaInicio)}
                        </Text>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Hora de fin: </Text>{formatTime(detalle.detalleAlerta.horaFin)}
                        </Text>
                        <Text style={{ color: isDark ? '#fff' : '#000' }}>
                            <Text style={{ fontWeight: 'bold' }}>Tiempo ejecución: </Text>{(detalle.detalleAlerta.tiempoEjecucion / 1000).toFixed(0)} segundos
                        </Text>
                    </View>
                ) : (
                    <Text style={{ color: isDark ? '#aaa' : '#555' }}>No aplica.</Text>
                )}
            </ScrollView>
        </PageLayout>
    );
}
