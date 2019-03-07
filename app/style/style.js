import {StyleSheet} from'react-native';


const style = StyleSheet.create({
    header: {
        backgroundColor: 'black',
        height: 215
    },
    logo: {
        width: '100%',
        height: undefined,
        aspectRatio: 170 / 70,
        marginBottom: 10,
        marginTop: 10
    },
    content: {
        backgroundColor:'#81bad8',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        padding: 20,
        fontSize: 20
    },
    imageContent: {
        width: '70%',
        aspectRatio: 178 / 70,
        height: 150,
        paddingBottom: 20
    },
    textContent: {
        margin: 15
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 150
    }
});

export default style;