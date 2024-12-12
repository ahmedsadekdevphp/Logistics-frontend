// styles.js
import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
        flexGrow: 1,
        alignItems: 'center',
        overflowY: 'auto',
        maxHeight: '100vh',
    },
    FormCard: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
        flexGrow: 1,
        maxWidth: 600,
        margin: 'auto',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    }, RequestCard: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
        flexGrow: 1,
        maxWidth: 1700,
        margin: 'auto',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    }, IndexCard: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
        flexGrow: 1,
        Width: 2000,
        margin: 'auto',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,

    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonText: {
        padding: 20,
        margin: 20,
        color: 'white'
    },
    registerText: {
        color: '#764abc'
    },
    button: {
        backgroundColor: '#764abc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        margin: 10
    },
    errorText: {
        color: 'red',
        paddingLeft: 10,
        paddingRight: 10
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'blue',
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
        color: '#555',
        padding: 5,
        margin: 5
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        padding: 5,
        margin: 10
    },
    datePicker: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 600,
        margin: 'auto',
        height: 'auto'

    },
    modalText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 15,
    },
    closeButton: {
        backgroundColor: '#764abc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    }, row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    halfWidth: {
        width: '48%',
    },
    orderItem: {
        padding: 10,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    idText: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    badge: {
        marginTop: 8,
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    pageNumber: {
        alignSelf: 'center',
    }, cardContainer: {
        flex: 1,
        padding: 25,
        margin: 10,
        backgroundColor: '#fff',
    },

    paginationButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f8f9fb',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    disabledButton: {
        opacity: 0.5,
    },
    meuetitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
    },
    menueCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        margin: 10,
        width: '40%',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    menueCardText: {
        color: 'rgb(118, 74, 188)',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

