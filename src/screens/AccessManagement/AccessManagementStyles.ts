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
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 4,
        marginTop: 30,
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
        fontWeight: '500',
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
    addBtn:{
        alignSelf: "center",
        backgroundColor: '#555',
        paddingHorizontal: 12,
        borderRadius: 20,
        fontWeight: '600',
        width: '15%',
        height: 40,
        marginTop: 30,
        marginBottom: 30,
        justifyContent: 'center',
    },
    addBtnTxt:{
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
    },
    addBtnDark:{
        backgroundColor: '#555',
    },

    searchContainer:{
        marginTop: 23,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        gap: 20,
        marginBottom: 25
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
        color: '#fff',
    },
})