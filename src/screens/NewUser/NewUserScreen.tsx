import {
    View,
    Text,
    ScrollView,
    TextInput,
} from 'react-native'
import {styles} from "../AccessManagement/AccessManagementStyles.ts";
import ThemeSwitch from "../../components/ThemeSwitch.tsx";
import Navbar from "../../components/NavBar.tsx";
import ETLAccessCard from "../../components/EtlAccessCard.tsx";
import {useTheme} from "../../context/ThemeContext.tsx";
import BackButton from "../../components/BackButton.tsx";
import {useState, useEffect} from "react";

export default function NewUserScreen() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const [searchETLQuery, setSearchETLQuery] = useState('');

    const [etlStates, setEtlStates] = useState<{ id: string, name: string, enabled: boolean }[]>([])


    useEffect(() => {
        setEtlStates([
            { id: '001', name: 'ETL Ingresos', enabled: true },
            { id: '013', name: 'ETL Ventas', enabled: true },
            { id: '007', name: 'ETL Logística', enabled: false },
            { id: '042', name: 'ETL Finanzas', enabled: false },
            { id: '043', name: 'ETL Financiera', enabled: false },
            { id: '044', name: 'ETL Financiera', enabled: false },
            { id: '045', name: 'ETL Financiera', enabled: false },
            { id: '046', name: 'ETL Financiera', enabled: false },
        ])
    }, [])

    const handleToggleETL = (id: string, value: boolean) => {
        setEtlStates(prev =>
            prev.map(etl =>
                etl.id === id ? { ...etl, enabled: value } : etl
            )
        )
    }

    const enabledETLs = etlStates.filter(e => e.enabled)
    const availableETLs = etlStates.filter(e =>
        !e.enabled &&
        (e.id.includes(searchETLQuery.trim()) ||
            e.name.toLowerCase().includes(searchETLQuery.trim().toLowerCase()))
    )


    return(
        <ScrollView style={[styles.container, isDark && styles.containerDark]}>
            <ThemeSwitch />
            <Navbar />
            <BackButton />

            <Text style={[styles.title, isDark && styles.titleDark]}>
                Crea un Nuevo Usuario
            </Text>

            {/* Buscador de usuario */}
            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TextInput
                    placeholder="Buscar..."
                    onChangeText={(text) => console.log('Valor del input:', text)}
                    placeholderTextColor={isDark ? '#aaa' : '#888'}
                    style={{
                        textAlign: 'center',
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        width: 300,
                        fontSize: 16,
                        color: isDark ? '#fff' : '#000',
                        backgroundColor: isDark ? '#2C2C2C' : '#fff',
                    }}
                />

            </View>

            {/* ETLs activados */}
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                Tiene acceso a estos ETL:
            </Text>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 20
            }}>
                {enabledETLs.map(etl => (
                    <ETLAccessCard
                        key={`enabled-${etl.id}`}
                        id={etl.id}
                        name={etl.name}
                        enabled={etl.enabled}
                        onToggle={handleToggleETL}
                    />
                ))}
            </View>

            {/* ETLs disponibles */}
            <Text style={[styles.subtitle, isDark && styles.subtitleDark, { marginTop: 40 }]}>
                ETL Disponibles:
            </Text>

            {/* Buscador de ETLs disponibles */}
            <View style={{ alignItems: 'center', marginTop: 16 }}>
                <input
                    type="text"
                    placeholder="ej. Lorem ipsum dolor sit amet"
                    value={searchETLQuery}
                    onChange={(e) => setSearchETLQuery(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: 20,
                        border: '1px solid #ccc',
                        width: 300,
                        fontSize: 16,
                        textAlign: 'center',
                    }}
                />
                <Text style={{
                    fontSize: 14,
                    color: isDark ? '#ccc' : '#777',
                    marginTop: 4,
                    fontStyle: 'italic'
                }}>
                    Nombre de ETL
                </Text>
            </View>

            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 60
            }}>
                {availableETLs.map(etl => (
                    <ETLAccessCard
                        key={`available-${etl.id}`}
                        id={etl.id}
                        name={etl.name}
                        enabled={etl.enabled}
                        onToggle={handleToggleETL}
                    />
                ))}
            </View>
        </ScrollView>
    )
}