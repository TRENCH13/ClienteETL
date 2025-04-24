import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f5fdf7',
        padding: 24,
    },
    containerDark: {
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
    active: {
        color: '#ffffff',
        backgroundColor: '#047857',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 12,
        color: '#ff6a00',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    table: {
        marginVertical: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#dcfce7',
        paddingVertical: 10,
        borderRadius: 6,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#e5e5e5',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: '#000',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 40
    },
    pageBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        fontWeight: '600',
    },

    // DARK MODE
    tableHeaderDark: {
        backgroundColor: '#14532d',
    },
    tableRowDark: {
        borderColor: '#333',
    },
    tableCellDark: {
        color: '#eee',
    },
    titleDark: {
        color: '#fff',
    },
    subtitleDark: {
        color: '#ccc',
    },
})
