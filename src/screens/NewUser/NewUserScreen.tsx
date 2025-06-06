import {
    View,
    Text,
    TextInput,
} from 'react-native'
import {styles} from "../AccessManagement/AccessManagementStyles.ts";
import ETLAccessCard from "../../components/EtlAccessCard.tsx";
import {useTheme} from "../../context/ThemeContext.tsx";
import PageLayout from "../../components/PageLayout.tsx";
import BackButton from "../../components/BackButton.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import {useState, useEffect} from "react";
import { getTodosLosEtls } from "../../services/EtlService.ts";
import { crearNuevoUsuario } from "../../services/UsuarioService.ts";
import { useNavigate } from "react-router-dom";


export default function NewUserScreen() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate();


    const [searchETLQuery, setSearchETLQuery] = useState('');
    const [etlStates, setEtlStates] = useState<{ id: string, name: string, enabled: boolean }[]>([]);
    const [allEnabled, setAllEnabled] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const cargarETLs = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const etls = await getTodosLosEtls(token);
                const transformed = etls.map(etl => ({
                    id: String(etl.id),
                    name: etl.nombre,
                    enabled: false
                }));
                setEtlStates(transformed);
            } catch (error) {
                console.error("Error al cargar los ETLs:", error);
            }
        };

        void cargarETLs();
    }, []);


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
            if (userName.trim() === "") {
                alert('El nombre de usuario no puede estar vacío.');
                return;
            }

            const selectedETLIds = etlStates
                .filter(e => e.enabled)
                .map(e => parseInt(e.id)); // Convertimos de string a number

            if (selectedETLIds.length === 0) {
                alert('Debes seleccionar al menos un ETL.');
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                alert('Token de autenticación no encontrado.');
                return;
            }

            const response = await crearNuevoUsuario({
                nombreUsuario: userName.trim(),
                etlIds: selectedETLIds
            }, token);

            alert(`✅ ${response.mensaje}\nID: ${response.idUsuario}\nETLs asignados: ${response.etlIdsAsignados.join(', ')}`);
            navigate(-1)
        } catch (error) {
            console.error(error);
            alert('❌ Error al guardar el usuario.');
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
                    placeholder="Usuario del directorio activo"
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

            {/* Botón para guardar */}
            <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 20}}>
                <Text
                     onPress={handleSave}
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
                    Guardar Usuario
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
        </PageLayout>
    )
}