import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useState } from 'react';
import { styles } from './LoginStyles';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/AuthService.ts';

export default function LoginScreen() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await login({ nombreUsuario: username });
            console.log(response.usuario.nombre);
            localStorage.setItem("user", JSON.stringify(response.usuario));
            navigate('/morning');
        } catch (err: unknown) {
            if (
                typeof err === 'object' &&
                err !== null &&
                'message' in err &&
                typeof (err as { message: unknown }).message === 'string'
            ) {
                Alert.alert('Error', (err as { message: string }).message);
            } else {
                Alert.alert('Error', 'Error desconocido al iniciar sesión.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={[styles.root, isDark && styles.rootDark]}>
            <View style={styles.themeSwitch}>
                <Pressable onPress={toggleTheme}>
                    <Text style={styles.switchIcon}>{isDark ? '🌞' : '🌙'}</Text>
                </Pressable>
            </View>

            <View style={[styles.loginBox, isDark && styles.darkBox]}>
                <Image
                    source={{ uri: '/chedraui.png' }}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={[styles.title, isDark && styles.titleDark]}>
                    Inicia Sesión
                </Text>

                <TextInput
                    placeholder="user"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#958888"
                    style={[styles.input, isDark && styles.inputDark]}
                />

                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#958888"
                    secureTextEntry
                    style={[styles.input, isDark && styles.inputDark]}
                />

                <Pressable
                    style={[styles.button, isDark && styles.buttonDark]}
                    onPress={handleLogin}
                    disabled={isLoading || !username.trim()}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
}
