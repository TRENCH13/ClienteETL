import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout.tsx";
import ReusableTable from "../../components/Table.tsx";
import { getReportesPorFecha, Reporte } from "../../services/ReporteService.ts";
import { styles } from "./LogBookStyles.ts";
import { useTheme } from "../../context/ThemeContext.tsx";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { es } from 'date-fns/locale';
import { format } from "date-fns";

type ETLReport = {
    id: string;
    name: string;
    type: string;
    detail: string;
};

export default function LogBookScreen() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [etlList, setEtlList] = useState<ETLReport[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [huboError, setHuboError] = useState(false);
    const [intentoCargado, setIntentoCargado] = useState(false);


    const etlHeaders = [
        { key: 'id', label: 'ID del ETL' },
        { key: 'name', label: 'Nombre del ETL' },
        { key: 'type', label: 'Tipo' },
        { key: 'detail', label: 'Detalle' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedDate) return;

            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token no encontrado");
                return;
            }

            const formatted = format(selectedDate, "yyyy-MM-dd");
            console.log("Buscando reportes reales para:", formatted);

            setIsLoading(true);
            setHuboError(false);
            setIntentoCargado(false);
            try {
                const data = await getReportesPorFecha(formatted, token);
                const parsed: ETLReport[] = data.map((reporte: Reporte) => ({
                    id: String(reporte.etl.idEtl),
                    name: reporte.etl.nombreEtl,
                    type: reporte.etl.tipoEtl,
                    detail: reporte.statusReporte
                }));
                setEtlList(parsed);
            } catch (error) {
                console.error("Error al cargar reportes por fecha:", error);
                setHuboError(true);
                console.log(huboError);
                console.log(intentoCargado);
                setEtlList([]);
            } finally {
                setIsLoading(false);
                setIntentoCargado(true);
            }
        };

        fetchData();
    }, [selectedDate]);


    return (
        <PageLayout>
            <Text style={[styles.title, isDark && styles.titleDark]}>
                Bitácora de Reportes
            </Text>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                    Selecciona una fecha
                </Text>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                    <DatePicker
                        label="Selecciona una fecha"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        slotProps={{
                            textField: {
                                variant: 'outlined',
                                style: {
                                    marginTop: 20,
                                    width: 250,
                                    backgroundColor: 'white',
                                    borderRadius: 8,
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
            </View>

            <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                    Reportes encontrados:
                </Text>

                {isLoading ? (
                    <Text style={{ marginTop: 12, fontStyle: 'italic', color: isDark ? '#ccc' : '#555' }}>
                        Cargando reportes...
                    </Text>
                ) : huboError ? (
                    <Text style={{ marginTop: 12, color: isDark ? '#fff' : '#000' }}>
                        No se pudo conectar con el servidor. Intenta nuevamente más tarde.
                    </Text>
                ) : intentoCargado && etlList.length === 0 ? (
                    <Text style={{ marginTop: 12, color: isDark ? '#fff' : '#000' }}>
                        No hay reportes para la fecha seleccionada.
                    </Text>
                ) : (
                    <ReusableTable
                        headers={etlHeaders}
                        data={etlList}
                        isDark={isDark}
                        renderRow={(item) => [item.id, item.name, item.type, item.detail]}
                    />
                )}
            </View>
        </PageLayout>
    );
}
