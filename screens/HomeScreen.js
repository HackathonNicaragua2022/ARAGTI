import { StatusBar } from "expo-status-bar";
import React, { cloneElement, useEffect, useState } from "react";
import {StyleSheet, Text, View, Image, Dimensions, SafeAreaView, Animated, Modal, Pressable, TouchableOpacity, Touchable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { auth, db } from "../firebaseConfig";
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, onSnapshot} from 'firebase/firestore'


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

function Backdrop({ scrollX }) {
  // En esta función se crea la animación de la imagen de fondo
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const eventosQuery = collection(db, 'actividades')
    onSnapshot(eventosQuery, (snapshot) => {
      let eventoslist = []
      snapshot.docs.map((doc) => eventoslist.push({...doc.data(), id: doc.id}))
      setEventos(eventoslist)
      setLoading(false)
    })
  }, [])
  return (
    <View
      style={[
        {
          position: "absolute",
          height: ALTURA_BACKDROP,
          top: '60%',
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {eventos.map(({image}, index) => {
        const inputRange = [
          (index - 1) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 1) * ANCHO_CONTENEDOR,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.Image
            key={index}
            source={{ uri: image }}
            style={[
              { width: width, height: ALTURA_BACKDROP, opacity, position:'absolute', top:'100%'},
            ]}
          />
        );
      })}
      <LinearGradient
        colors={["white", "transparent"]}
        style={{
          width,
          height: ALTURA_BACKDROP,
          position: "absolute",
          top: '100%',
        }}
      />
    </View>
  );
}

export default function App() { 

  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const eventosQuery = collection(db, 'actividades')
    onSnapshot(eventosQuery, (snapshot) => {
      let eventoslist = []
      snapshot.docs.map((doc) => eventoslist.push({...doc.data(), id: doc.id}))
      setEventos(eventoslist)
      setLoading(false)
    })
  }, [])



  const navigation = useNavigation()
  const scrollX = React.useRef(new Animated.Value(0)).current;
  // Cargando la tipografía a usar en la app
  const [fontsLoaded] = useFonts({
    Creato: require('../assets/fonts/CreatoDisplay-Medium.otf'),
    Light: require('../assets/fonts/CreatoDisplay-Regular.otf'),
    Bold: require('../assets/fonts/CreatoDisplay-Bold.otf')
  })

  if(!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.usuarioview}>
          <Image source={require('../assets/correo.png')} style={{height:50, width:50, marginLeft:10 }}/>
          <Text style={styles.bienvenidatext}>Bienvenid@</Text>
          <Text style={styles.usuariotext}>{"\n"}{auth.currentUser?.email}</Text>
        </View>
        <Text style={[styles.preguntatext, {fontFamily: "Creato"}]}>¿Dónde quieres ir hoy?</Text>
        <Text style={[styles.sugerenciastext, {fontFamily: "Light"}]}>Aquí algunas Sugerencias</Text>
      </View>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingTop: 100,
          paddingHorizontal: ESPACIO_CONTENEDOR,
        }}
        snapToInterval={ANCHO_CONTENEDOR}
        decelerationRate={0}
        scrollEventThrottle={16}
        data={eventos}
        //keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ANCHO_CONTENEDOR,
            index * ANCHO_CONTENEDOR,
            (index + 1) * ANCHO_CONTENEDOR,
          ];

          const scrollY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });
          const goToActividadPage = () =>{
            navigation.navigate('Actividad', {id: item.id, image: item.image, title: item.title, texto: item.texto, location: item.location, duracion: item.duracion, precio: item.precio, detalle: item.detalle});
          }
          return (
            <Pressable onPress={goToActividadPage} style={{ width: ANCHO_CONTENEDOR }}>
              <Animated.View
                style={{
                  marginHorizontal: ESPACIO,
                  padding: ESPACIO,
                  borderRadius: 34,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  transform: [{ translateY: scrollY }],
                }}
              >
                <Image source={{ uri: item.image}} style={styles.posterImage} />
                <Text style={{ fontFamily: "Bold",fontWeight:'400', fontSize: 18, color:'#005EB8'}}>
                  {item.title}
                </Text>
              </Animated.View>
            </Pressable>
          );
        }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  usuarioview:{
    flexDirection: 'row',
    marginTop: 20,
  },
  bienvenidatext:{
    color:  '#005EB8',
    marginLeft:10,
    fontSize: 20,
    marginTop: 4,
  },
  usuariotext:{
    color:'#005EB8',
    fontWeight: 'bold',
    fontSize:18,
    marginLeft:-100,
    marginTop: 4,
  },
  preguntatext:{
    color:'#EF662F',
    fontSize: 26,
    padding: 20,
    marginTop: 10,
  },
  sugerenciastext:{
    color:'#092040',
    fontWeight: '300',
    padding:16,
    fontSize:17,
    marginLeft: 10,
  },
  posterImage: {
    width: "100%",
    height: ANCHO_CONTENEDOR * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});