import {
    View,
    Text,
    Pressable,
    ScrollView,
} from 'react-native'
import {useState} from "react";
import { styles } from './MorningReportStyles'
import PageLayout from "../../components/PageLayout.tsx";
import {useTheme} from "../../context/ThemeContext.tsx";

export default function MorningReportScreen() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [isAscending, setIsAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0)
    const rowsPerPage = 5


    const [sortedData, setSortedData] = useState([
        { id: '013', name: 'Lorem ipsum dolor sit amet', type: 'Procesamiento' },
        { id: '027', name: 'Lorem ipsum dolor sit amet', type: 'Alerta' },
        { id: '030', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '037', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '041', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '055', name: 'Lorem ipsum dolor sit amet', type: 'Alerta' },
        { id: '100', name: 'Lorem ipsum dolor sit amet', type: 'Alerta' },
        { id: '045', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '155', name: 'Lorem ipsum dolor sit amet', type: 'Alerta' },
        { id: '001', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '002', name: 'Lorem ipsum dolor sit amet', type: 'Alerta' },
        { id: '113', name: 'Lorem ipsum dolor sit amet', type: 'Alerta' },
        { id: '020', name: 'Lorem ipsum dolor sit amet', type: 'Archivo' },
        { id: '200', name: 'Lorem ipsum dolor sit amet', type: 'Alerta' },
    ]);

    const toggleSort = () => {
        const sorted = [...sortedData].sort((a, b) => {
            const idA = parseInt(a.id, 10);
            const idB = parseInt(b.id, 10);
            if (isAscending) {
                return idA - idB;
            } else {
                return idB - idA;
            }
        });
        setSortedData(sorted);
        setIsAscending(!isAscending);
        setCurrentPage(0)
    };

    const totalPages = Math.ceil(sortedData.length / rowsPerPage)
    const startIndex = currentPage * rowsPerPage
    const currentRows = sortedData.slice(startIndex, startIndex + rowsPerPage)

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
    }

    return (
        <PageLayout>
            {/* Título y Subititulo */}
            <Text style={[styles.title, isDark && styles.titleDark]}>Bienvenido</Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                Este es el reporte matutino de ejecución del día de hoy:
            </Text>

            {/* Header de la tabla */}
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

            {/* Tabla con paginación */}
            <ScrollView style={styles.table}>
                {currentRows.map((item) => (
                    <View key={item.id} style={[styles.tableRow, isDark && styles.tableRowDark]}>
                        <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>{item.id}</Text>
                        <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>{item.name}</Text>
                        <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>{item.type}</Text>
                        <Text style={[styles.tableCell, isDark && styles.tableCellDark]}>🔗</Text>
                    </View>
                ))}
            </ScrollView>


            {/* Paginación */}
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
    )
}
