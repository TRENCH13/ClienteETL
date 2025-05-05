import {
    View,
} from 'react-native'
import {styles} from "./NewUserStyles.ts";
import ThemeSwitch from "../../components/ThemeSwitch.tsx";
import Navbar from "../../components/NavBar.tsx";
import {useTheme} from "../../context/ThemeContext.tsx";

export default function NewUserScreen() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return(
        <View style={[styles.root, isDark && styles.rootDark]}>
            <ThemeSwitch />
            <Navbar />

        </View>
    )
}