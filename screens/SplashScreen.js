import React, {useState, useEffect, useRef} from "react";
import { View, StyleSheet, ImageBackground, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default () =>{
    const navigation = useNavigation();
    // Este hoook se utiliza para que cuando 5 segundos hayan pasado se actualice la variable time que es la que mide el tiempo
    const[time, setTime]= useState(false)
    // Este otro hook se utiliza para contar los 5 segundos que dura la pantalla Splash y luego actulizar
    // la varible time
    useEffect(() => { 
        async function inicia(){
            try{
                await new Promise( (resolve) =>{
                    setTimeout(resolve, 5000); })
            } 
            catch(e)
            {
                console.log(e)
            }
            finally{
                setTime(true)
            }
        }   
        inicia();
    });

    // Este hook se utiliza para pasar a la pantalla de Login y register una vez que time sea true osea que ya
    // hayan pasado los 5 segundos
    useEffect(() =>{
        if(time){
            navigation.replace('Login')
        }
    }, [time])
    
    // Este código es para hacer la animación de la aguja dando vueltas
    const translation = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
        Animated.timing(translation, {
            toValue: 1000,
            duration: 4500,
            useNativeDriver: true,
        }).start();
    }, []);

    return(
        // Se renderiza primero el fondo con el primer View luego el logo como tal en forma de imagen de fondo(BackGroundImage)
        // Y por último se se pone la imagen de la aguja pero envuelta en un animated view que es el contiene el estilo y la animación de dar vueltas
        <View style={styles.container}>
            <ImageBackground style={{height: 120, width: 445}} source={require('../assets/TuringoLogo-01-01.png')}>
                <Animated.View style={{ marginLeft: 365,
                     marginTop: 44, 
                     height: 15,
                     width: 25,
                     opacity: translation.interpolate({ inputRange:[0,100,300,400], outputRange:[0,0.25,0.50,2], extrapolate:'clamp'}),
                     transform: [{rotate: translation.interpolate({inputRange: [0,100], outputRange:['0deg', '360deg'], })},]}}>
                    <Image source={require('../assets/Aguja.png')}/>
                </Animated.View>
            </ImageBackground>
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EF662F',
        alignItems: 'center',
        justifyContent: 'center',
    },
})