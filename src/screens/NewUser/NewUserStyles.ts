import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F1F9F5',
        padding: 30,
    },
    rootDark: {
        backgroundColor: '#1e1e1e',
    },
    themeSwitch: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        zIndex: 100,
    },
    themeIcon: {
        fontSize: 24,
    },
    logoutBtn:{
        position: 'absolute',
        bottom: 10,
        right: 20,
        zIndex: 100,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    navItem: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    navItemDark: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },
    active: {
        color: '#ffffff',
        backgroundColor: '#555',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    logo: {
        width: 120,
        height: 90,
        alignItems: "center",
    },
})