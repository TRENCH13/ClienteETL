import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import NavBar from './NavBar';
import NavBarConsultant from './NavBarConsultant';
import ThemeSwitch from './ThemeSwitch';
import { useTheme } from '../context/ThemeContext';

type Props = {
    children: React.ReactNode;
    overlay?: React.ReactNode;
    padding?: number;
};

export default function PageLayout({ children, padding = 20, overlay }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const screenHeight = Dimensions.get('window').height;
    const [rol, setRol] = useState<string | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setRol(user.rol);
        }
    }, []);

    return (
        <View style={[
            styles.container,
            { height: screenHeight, backgroundColor: isDark ? '#1e1e1e' : '#F1F9F5' }
        ]}>
            {rol === 'Administrador' && <NavBar />}
            {rol === 'Consultor' && <NavBarConsultant />}

            <ScrollView contentContainerStyle={{ padding, paddingBottom: 120 }}>
                {children}
            </ScrollView>

            <ThemeSwitch />
            {overlay && overlay}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
    },
});
