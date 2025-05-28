import {
    View,
    Text,
    TextInput,
    Button,
} from 'react-native'
import {styles} from "../AccessManagement/AccessManagementStyles.ts";
import ETLAccessCard from "../../components/EtlAccessCard.tsx";
import {useTheme} from "../../context/ThemeContext.tsx";
import PageLayout from "../../components/PageLayout.tsx";
import BackButton from "../../components/BackButton.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import {useState, useEffect} from "react";

export default function NewUserScreen() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [searchETLQuery, setSearchETLQuery] = useState('');
    const [etlStates, setEtlStates] = useState<{ id: string, name: string, enabled: boolean }[]>([]);
    const [allEnabled, setAllEnabled] = useState(false);
    const [userName, setUserName] = useState('');

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

    useEffect(() => {
        const everyEnabled = etlStates.length > 0 && etlStates.every(etl => etl.enabled);
        setAllEnabled(everyEnabled);
    }, [etlStates]);

    const toggleAllETLs = () => {
        const newState = !allEnabled;
        setEtlStates(prev => prev.map(etl => ({ ...etl, enabled: newState })));
    };

    const handleToggleETL = (id: string, value: boolean) => {
        setEtlStates(prev =>
            prev.map(etl =>
                etl.id === id ? { ...etl, enabled: value } : etl
            )
        )
    }

    const handleSave = async () => {
        try {
            // Simula el guardado (reemplaza por lógica real)
            if (userName.trim() === "") {
                alert('El nombre de usuario no puede estar vacío.');
                return;
            }

            const selectedETLs = etlStates.filter(e => e.enabled).map(e => e.id);

            // Simulación de guardado:
            console.log("Guardando usuario:", userName);
            console.log("ETLs seleccionados:", selectedETLs);

            // await fetch(...);

            alert('Usuario ${userName} correctamente.');
        } catch (error) {
            console.log(error);
            alert('No se pudo guardar el usuario.');
        }
    };

    const enabledETLs = etlStates.filter(e => e.enabled);
    const availableETLs = etlStates.filter(e =>
        !e.enabled &&
        (e.id.includes(searchETLQuery.trim()) ||
            e.name.toLowerCase().includes(searchETLQuery.trim().toLowerCase()))
    );

    return(
        <PageLayout>
            <BackButton />
            <Text style={[styles.title, isDark && styles.titleDark]}>
                Crea un Nuevo Usuario
            </Text>

            {/* Input de nombre de nuevo usuario */}
            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TextInput
                    placeholder="Nombre del usuario"
                    onChangeText={setUserName}
                    value={userName}
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
                Va a tener acceso a estos ETL:
            </Text>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text
                    onPress={toggleAllETLs}
                    style={{
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        borderRadius: 12,
                        backgroundColor: isDark ? '#333' : '#555',
                        color:'#fff',
                        fontSize: 14,
                        textAlign: 'center',
                        alignSelf: 'center',
                    }}
                >
                    {allEnabled ? 'Deshabilitar todos' : 'Habilitar todos'}
                </Text>
            </View>

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
            <SearchBar
                placeholder="Busca un ETL por ID o por nombre"
                value={searchETLQuery}
                onChangeText={setSearchETLQuery}
            />

            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 30
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

            {/* Botón para guardar */}
            <View style={{ alignItems: 'center', marginBottom: 40 }}>
                <Button title="Guardar usuario" onPress={handleSave} color={isDark ? "#4CAF50" : "#1976D2"} />
            </View>
        </PageLayout>
    )
}