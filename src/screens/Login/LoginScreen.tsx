import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    ActivityIndicator
} from 'react-native'
import { useState } from 'react'
import { styles } from './LoginStyles'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'



export default function LoginScreen() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

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
                    placeholderTextColor="#958888"
                    style={[styles.input, isDark && styles.inputDark]}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="#958888"
                    secureTextEntry
                    style={[styles.input, isDark && styles.inputDark]}
                />
                <Pressable
                    style={[styles.button, isDark && styles.buttonDark]}
                    onPress={() => {
                        setIsLoading(true)
                        setTimeout(() => {
                            setIsLoading(false)
                            navigate('/morning')
                        }, 2000)
                    }}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    )}
                </Pressable>
            </View>

        </View>
    )
}
