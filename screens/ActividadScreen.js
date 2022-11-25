import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, Pressable, ImageBackground} from "react-native" ;
import { StatusBar } from "expo-status-bar";
import actividades from "../assets/actividades";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

const ActividadScreen = () => { 
    const [ratio, setRatio] = useState(1);

    const navigation = useNavigation();
    const route = useRoute()
    
    const actividadId = route.params?.id;

    const actividad = actividades.find((p) => p.id === actividadId )

    useEffect(() =>{
        if (actividad?.image){
            Image.getSize(actividad.image, (width, height) => setRatio(width/height))
        }
    }, [actividad]);

    const goBack = () =>{
        navigation.goBack();
    }

    if(!actividad){
        return(
        <Text>¡Actividad no encontrada!</Text>
        );
    }

    return(
        <SafeAreaView style={{backgroundColor:'black'}}>
        <StatusBar style="light"/>
        <View style={styles.root}>
            <ImageBackground source={{uri: actividad.image}} style={[styles.image, { aspectRatio: ratio}]}/>
            <View style={{backgroundColor: 'white', borderRadius:20, bottom: 15 }}>
             <Text style={styles.title}>{actividad.title}</Text>
             <View style={{flexDirection: 'row', padding:8}}>
                <Ionicons name="location-sharp" size={28} color="#EF662F" style={{padding: 10}} />
                <Text style={{fontSize: 18, marginTop: 15}}>{actividad.location}</Text>
             </View>
             <View style={{ padding:8, marginLeft: 8, marginTop: 10}}>
                <Text style={styles.etiquetas}>Descripción:</Text>
                <Text style={styles.descripcion}>{actividad.texto}</Text>
             </View>
             <View style={{flexDirection: 'row', padding:8, marginLeft: 8, marginTop: 10}}>
                <Text style={styles.etiquetas}>Duración:</Text>
                <Text style={styles.descripcion}>{actividad.duracion}</Text>
             </View>
             <View style={{flexDirection: 'row', padding:8, marginLeft: 8, marginTop: 10}}>
                <Text style={styles.etiquetas}>Precio:</Text>
                <Text style={styles.descripcion}>{actividad.precio}</Text>
             </View>
             <View style={{padding:8, marginLeft: 8, marginTop: 10}}>
                <Text style={styles.etiquetas}>Toma en cuenta que:</Text>
                <Text style={{fontSize:18}}>{actividad.detalle}</Text>
             </View>
             <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Agregar a mi itinerario</Text>
                </Pressable>
            </View>
        </View>
        <Pressable onPress={goBack} style={styles.backBtn}>
            <View style={styles.backBtnView}>
                <Ionicons name="chevron-back" size={28} color="black" />
            </View>
        </Pressable>
   
        </SafeAreaView>
    )
}
 
 const styles = StyleSheet.create({
    root:{
        height: '100%',
        backgroundColor:'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius:  50,
    },
    image:{
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    }, 
    title:{
        margin:10,
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EF662F'
    },
    detallesactividad:{
        position: 'absolute',
        borderRadius: 40,
        marginBottom: 40
    },
    backBtn:{
        position: 'absolute',
        top: 70,
        left: 11
    },
    etiquetas:{
        fontWeight: 'bold',
        fontSize: 18,
    },
    descripcion:{
        fontSize: 18,
        marginLeft: 6
    },
    backBtnView:{
        backgroundColor:'white',
        borderRadius: 20,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        backgroundColor: '#EF662F',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 71,
        marginTop: 50,
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText:{
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5,
    }
 });



export default ActividadScreen