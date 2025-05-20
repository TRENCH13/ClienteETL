import { TextInput, View, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SearchBarProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: TextStyle;
}

export default function SearchBar({ placeholder, value, onChangeText, style }: SearchBarProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <View style={{ alignItems: 'center', marginVertical: 16 }}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={isDark ? '#aaa' : '#888'}
                style={[
                    styles.input,
                    isDark ? styles.inputDark : styles.inputLight,
                    style
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        fontSize: 16,
    },
    inputLight: {
        borderColor: '#ccc',
        backgroundColor: '#fff',
        color: '#000',
    },
    inputDark: {
        borderColor: '#ccc',
        backgroundColor: '#2C2C2C',
        color: '#fff',
    },
});
