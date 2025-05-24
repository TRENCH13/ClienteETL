import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout.tsx";
import ReusableTable from "../../components/Table.tsx";
import { styles } from "./LogBookStyles.ts";
import { useTheme } from "../../context/ThemeContext.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import CustomDateInput from "../../components/CustomDateInput";
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

    const etlHeaders = [
        { key: 'id', label: 'ID del ETL' },
        { key: 'name', label: 'Nombre del ETL' },
        { key: 'type', label: 'Tipo' },
        { key: 'detail', label: 'Detalle' }
    ];

    useEffect(() => {
        if (!selectedDate) return;

        const formatted = format(selectedDate, "yyyy-MM-dd");
        console.log("Buscando ETLs para:", formatted);

        const mockData: Record<string, ETLReport[]> = {
            "2025-04-05": [
                { id: "013", name: "ETL CargaVentas", type: "Procesamiento", detail: "Carga de ventas diarias" },
                { id: "027", name: "ETL AlertasStock", type: "Alerta", detail: "Stock bajo en inventario" }
            ],
            "2025-04-06": [
                { id: "030", name: "ETL CierreCaja", type: "Archivo", detail: "Exportación diaria de caja" },
                { id: "041", name: "ETL KPI Producción", type: "Archivo", detail: "Indicadores de producción" }
            ],
            "2025-04-07": [
                { id: "030", name: "ETL CierreCaja", type: "Archivo", detail: "Exportación diaria de caja" },
                { id: "041", name: "ETL KPI Producción", type: "Archivo", detail: "Indicadores de producción" }
            ]
        };

        setIsLoading(true);
        setEtlList([]);

        setTimeout(() => {
            setEtlList(mockData[formatted] || []);
            setIsLoading(false);
        }, 800);
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

                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    locale={es}
                    dateFormat="dd-MMM-yyyy"
                    customInput={<CustomDateInput />}
                    popperPlacement="bottom-start"
                />
            </View>

            <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                    Reportes encontrados:
                </Text>

                {isLoading ? (
                    <Text style={{ marginTop: 12, fontStyle: 'italic', color: isDark ? '#ccc' : '#555' }}>
                        Cargando reportes...
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
