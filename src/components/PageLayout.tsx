import React from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import NavBar from './NavBar'
import ThemeSwitch from './ThemeSwitch'
import { useTheme } from '../context/ThemeContext'

type Props = {
    children: React.ReactNode
    overlay?: React.ReactNode // aquí irán modales, toasts, etc.
    padding?: number
}

export default function PageLayout({ children, padding = 20, overlay }: Props) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const screenHeight = Dimensions.get('window').height

    return (
        <View style={[
            styles.container,
            { height: screenHeight, backgroundColor: isDark ? '#1e1e1e' : '#F1F9F5' }
        ]}>
            <NavBar />

            <ScrollView contentContainerStyle={{ padding, paddingBottom: 120 }}>
                {children}
            </ScrollView>

            <ThemeSwitch />

            {overlay && overlay} {/* <- renderiza el modal al final del layout */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
    },
})
