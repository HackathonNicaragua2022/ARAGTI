import { Text, View, StyleSheet} from "react-native";

export default () => {
    return(
    <View style={styles.container}>
        <Text style={styles.text}>Síguenos en Nuestras Redes</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent:'center'
    },
    text:{
        color:'#EF662F', 
        fontSize: 20, 
        fontWeight: 'bold'
    }
})