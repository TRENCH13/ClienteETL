import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F1F9F5',
        padding: 30,
    },
    themeSwitch: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        zIndex: 100,
    },
    logoutBtn:{
        position: 'absolute',
        bottom: 10,
        right: 20,
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
    title: {
        fontSize: 64,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 4,
        marginTop: 10,
    },
    subtitle: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
        color: '#333',
    },
    table: {
        marginVertical: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F1F9F5',
        paddingVertical: 10,
        borderRadius: 6,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: '#F1F9F5',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 5
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
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
    containerDark: {
        backgroundColor: '#1e1e1e',
    },
    navItemDark: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },
    activeDark: {
        color: '#ffffff',
        backgroundColor: '#333',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    tableHeaderDark: {
        backgroundColor: '#1e1e1e',
    },
    tableRowDark: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: '#F1F9F5',
        backgroundColor: '#132623',
        borderRadius: 10,
        marginBottom: 5
    },
    tableCellDark: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
    },
    titleDark: {
        fontSize: 64,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    subtitleDark: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
        color: '#fff',
    },
    criticalBtnCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 135,
        right: 140,
        zIndex: 10
    },
    criticalRed: {
        backgroundColor: 'red',
    },
    criticalGray: {
        backgroundColor: 'gray',
    },
    criticalBtnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },

    modalContent: {
        backgroundColor: 'white',
        paddingVertical: 30,
        paddingHorizontal: 25,
        borderRadius: 12,
        alignItems: 'center',
        width: '95%',
        maxWidth: 700,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: 'red',
        textAlign: 'center'
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    closeButton: {
        backgroundColor: '#555',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 6,
        marginTop: 20
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }


})
