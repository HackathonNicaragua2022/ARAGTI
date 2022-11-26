import { Text, View, StyleSheet} from "react-native";
import { Linking } from 'react-native';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default () => {
    return(
    <View style={styles.container}>
        <View style={{marginTop: -300,}}>
            <Text style={styles.text}>¡Gracias en tu interés en colaborar con nosotros!</Text>
        </View>
        <View style={{marginTop:150}}>
            <Text style={{color: '#fff', fontSize: 18, textAlign:'center'}}>LLena el siguiente formulario y pronto estaremos en contacto contigo</Text>
        </View>
        <Pressable  style={styles.button} onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScbSQMHmIJV4pekiEJ9T-tbit_osdTyDbPwfmayjMIl8mSUiQ/viewform?usp=sf_link')}>
        <Text style={styles.buttonText}>Formulario
        </Text>
        </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#EF662F',
        alignItems: 'center',
        justifyContent:'center'
    },
    text:{
        color:'#fff', 
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button:{
        backgroundColor: '#fff',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 80,
        marginTop: 50,
        borderWidth: 1,
        borderColor: '#EF662F',
    },
    buttonText:{
        fontSize: 20,
        fontWeight: '600',
        color: '#EF662F',
        letterSpacing: 0.5,
        margin: 5
    }
})