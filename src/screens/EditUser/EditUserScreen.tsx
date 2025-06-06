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
import { getTodosLosEtls } from "../../services/EtlService.ts";
import { getPermisosDeUsuario, actualizarPermisosUsuario } from "../../services/UsuarioService.ts";
import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

export default function EditUserScreen() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('id') || '';
    const userNameParam = searchParams.get('name') || '';

    const userName = decodeURIComponent(userNameParam);
    const [searchETLQuery, setSearchETLQuery] = useState('');
    const [etlStates, setEtlStates] = useState<{ id: string, name: string, enabled: boolean }[]>([]);
    const [allEnabled, setAllEnabled] = useState(false);

    useEffect(() => {
        const cargarETLsConPermisos = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const [todosLosEtls, permisosUsuario] = await Promise.all([
                    getTodosLosEtls(token),
                    getPermisosDeUsuario(Number(userId), token)
                ]);

                const etlIdsConPermiso = new Set(permisosUsuario.permisos.map(p => p.idEtl));

                const resultado = todosLosEtls.map(etl => ({
                    id: String(etl.id),
                    name: etl.nombre,
                    enabled: etlIdsConPermiso.has(etl.id)
                }));

                setEtlStates(resultado);
            } catch (error) {
                console.error("Error al cargar ETLs o permisos:", error);
            }
        };

        void cargarETLsConPermisos();
    }, [userId]);

    useEffect(() => {
        const allEnabled = etlStates.length > 0 && etlStates.every(etl => etl.enabled);
        setAllEnabled(allEnabled);
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
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token no encontrado.');

            const selectedETLIds = etlStates
                .filter(etl => etl.enabled)
                .map(etl => Number(etl.id));

            const res = await actualizarPermisosUsuario(Number(userId), selectedETLIds, token);

            alert(res.mensaje);
        } catch (error) {
            console.error("Error al actualizar permisos:", error);
            alert('❌ No se pudo actualizar los permisos del usuario.');
        }
    };


    const enabledETLs = etlStates.filter(e => e.enabled);
    const availableETLs = etlStates.filter(e =>
        !e.enabled &&
        (e.id.includes(searchETLQuery.trim()) ||
            e.name.toLowerCase().includes(searchETLQuery.trim().toLowerCase()))
    );

    return (
        <PageLayout>
            <BackButton />

            <Text style={[styles.title, isDark && styles.titleDark]}>
                Gestión de Permisos de
            </Text>

            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                {userName}
            </Text>

            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TextInput
                    value={userName}
                    editable={false} // Puedes cambiar esto a true si quieres que se edite
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
                    Guardar Cambios
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

            <Text style={[styles.subtitle, isDark && styles.subtitleDark, { marginTop: 40 }]}>
                ETL Disponibles:
            </Text>

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
