import { Text, View, StyleSheet, Pressable} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Linking } from 'react-native';

export default () => {
    return(
        <View style={styles.container}>
            <View style={{marginTop: -300,}}>
                <Text style={styles.text}>Encuentranos en:</Text>
            </View>
            <Pressable onPress={() => Linking.openURL('https://www.facebook.com/TurinGoAppNicaragua?mibextid=ZbWKwL')} style={{marginTop:150, borderColor:"#EF662F", borderWidth:0.5, borderRadius:15} }>
            <View style={{flexDirection: 'row', padding: 10}} >
                <FontAwesome name="facebook-square" size={24} color="blue" />
                <Text style={{color: '#EF662F', fontSize: 18, textAlign:'center', marginLeft:10}}>TurinGO App Nicaragua</Text>
            
            </View>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('https://instagram.com/turingoappnicaragua?igshid=YmMyMTA2M2Y=')} style={{marginTop:10, borderColor:'#EF662F', borderWidth: 0.5, borderRadius:15}}>
            <View style={{flexDirection: 'row', padding: 10}} >
                <FontAwesome name="instagram" size={24} color="brown" />
                <Text style={{color: '#EF662F', fontSize: 18, textAlign:'center', marginLeft: 10}}>turingoappnicaragua</Text>
            </View>
            </Pressable>
        </View>
        )
    }
    
    const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent:'center'
        },
        text:{
            color:'#EF662F', 
            fontSize: 26, 
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