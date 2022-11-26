import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { setAuthState } from '../components/features/auth';
import { auth } from '../firebaseConfig';




const LoginScreen = () => {
  const navigation = useNavigation();

  // Estas variables son para guardar el correo y contraseña del usuario
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        navigation.replace('Home')
      }
    })
    return unsubscribe
  }, [])

  // Funcion para hacer el Login en Firebase
  const onlogin = () =>{
    if (email !== '' && password !== ''){
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Login success', user.email)
            alert('Signed in success', user.email)
        })
        .catch(error => Alert.alert('Login error', error.message))
    }
  }

  // Funcion para hacer el Registro de nuevas cuentas en Firebase
  const onSignup = () =>{
    if (email !== '' && password !== ''){
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            console.log('Sign up success', user.email)
            alert('Sign up in success', user.email)
        })
        .catch(error => Alert.alert('Sign up error', error.message))
    }
  }
   const imageBackground = require('../assets/Collage.png')
  return (
    <ImageBackground source={imageBackground} resizeMode='cover'  style={styles.container} imageStyle={{opacity:0.68}}>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onlogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={onSignup}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    borderColor: '#EF662F',
    borderWidth: 0.5,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#EF662F',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#EF662F',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#EF662F',
    fontWeight: '700',
    fontSize: 16,
  },
})