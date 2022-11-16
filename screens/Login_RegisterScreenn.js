import React, {useState} from "react";
import { View, StyleSheet, Text, Dimensions, TextInput, Pressable, Alert} from "react-native";
import Svg, {Image, Ellipse, ClipPath} from "react-native-svg";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withSpring} from "react-native-reanimated";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../firebase-config";

const {height, width} = Dimensions.get('window')
export default ({navigation}) =>{
    // Esto es para guardar el email y la contraseña del usuario
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    //Esto es para crear una cuenta nueva
    const handleCreateAccount = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log('Cuenta creada')
            const user = userCredential.user;
            console.log(user)
        })
        .catch(error =>{
            console.log(error)
            Alert.alert(error.message)
        })
    }

    // Esto es para el login
    const handleSignIn = () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log('Sesión Iniciada con éxito')
            const user = userCredential.user
            console.log(user)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    //Esta parte es para hacer la amnimación del despliegue de los menú
    const imagePosition = useSharedValue(1); 
    const formButtonScale = useSharedValue(1);
    const [isregistering, setIsregistering] = useState(false)

    const imageAnimatedStyle = useAnimatedStyle(() =>{
        const interpolation = interpolate(imagePosition.value, [0,1], [-height / 2, 0])
        return {
            transform:[{ translateY: withTiming(interpolation, {duration: 1000})}]
        }
    })
    
    const buttonAnimatedStyle = useAnimatedStyle(() =>{
        const interpolation = interpolate(imagePosition.value, [0,1], [250, 0]);
        return{
            opacity: withTiming(imagePosition.value, {duration: 500}),
            transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
        };
    })

    const closeButtonAnimatedStyle = useAnimatedStyle(() =>{
        const interpolation = interpolate(imagePosition.value, [0,1], [180, 360])
        return{
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 800}),
            transform: [{rotate: withTiming(interpolation + 'deg', {duration: 1000})}]
        }
    })
    
    const formAnimatedStyle = useAnimatedStyle(() =>{
        return{
            opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, {duration: 800})) : withTiming(0,{duration: 300})
        }
    })

    const formButtonAnimatedStyle = useAnimatedStyle(() =>{
        return{ 
            transform: [{ scale : formButtonScale.value }]
        }
    })


    const loginHandler = () =>{
        imagePosition.value = 0
        if(isregistering){
            setIsregistering(false)
        }
    }
    const registerHandler = () =>{
        imagePosition.value = 0
        if(!isregistering){
            setIsregistering(true)
        }
    }
    return(
        // Aquí se renderizan los componentes de la pantalla de login y registro
        <Animated.View style={styles.container}>
            <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
                <Svg height={height + 100} width={width}>
                    <ClipPath id= 'clipPathId' >
                        <Ellipse cx={width / 2} rx={height} ry={height + 100}  />
                    </ClipPath>
                    <Image href={require('../assets/Collage.png')}
                    width={width + 100} 
                    height={height + 100}
                    preserveAspectRatio='xMidYMid slice'
                    clipPath="url(#clipPathId)"
                    />
                </Svg>
                <Animated.View style={[styles.closeButtonContainer, closeButtonAnimatedStyle]}>
                    <Text onPress={() => imagePosition.value = 1}>X</Text>
                </Animated.View>
            </Animated.View>
            <View style={styles.buttonContainer}>
              <Animated.View style={buttonAnimatedStyle}>
                <Pressable style={styles.button} onPress={loginHandler}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                </Pressable>
              </Animated.View>
              <Animated.View style={buttonAnimatedStyle}>
                    <Pressable style={styles.button} onPress={registerHandler}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </Pressable> 
              </Animated.View>
                <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
                    <TextInput onChange={(text) => setEmail(text)} placeholder="Email" placeholderTextColor='black' style={styles.textInput}/>
                    <TextInput onChange={(text) => setPassword(text)} placeholder="Contraseña" placeholderTextColor='black' style={styles.textInput}/>
                    
                    <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
                        <Pressable onPress={() =>navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>{isregistering ? 'REGISTER': 'LOG IN'}</Text>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    closeButtonContainer:{
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
        top: -20,

    },
    buttonContainer:{
        justifyContent: 'center',
        height: height/3,

    },
    button:{
        backgroundColor: '#EF662F',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText:{
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5,
    },
    formInputContainer:{
       marginBottom: 70,
       ...StyleSheet.absoluteFill,
       zIndex: -1,
       justifyContent: 'center',
    },
    textInput:{
        height: 50,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        paddingLeft: 10,
    },
    formButton:{
        backgroundColor: '#EF662F',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})