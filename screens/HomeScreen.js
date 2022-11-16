import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
  Pressable,
  Modal
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const imagenes = [
    //En este arreglo se cargan las imagenes a utilizar en el carrusel
  {
    image : "https://www.nicaraguadisena.com/wp-content/uploads/2022/09/Calle-La-Calzada.jpg", 
    title:'Visitar la Calzada de noche',
    text: ''
  },
  {
    image : "https://www.flyingfourchette.com/wp-content/uploads/2018/05/Granada-The-Garden-Cafe.jpg", 
    title: 'Intercambiar un libro',
    text: 'Intercambia un libro en el Garden Café de Granada\n\nDuración:Libre\n\nPrecio: 1 libro\n\nNo incluye transporte desde Managua\n\nPet Friendly'
  },
  {
    image : "https://lh3.googleusercontent.com/p/AF1QipOAvzQdgXCQBK3htiyI7pHnlF3QkvtBiDtbOJi9=s1360-w1360-h1020", 
    title: 'Comer',
    text: 'Hola Mundo 2'
  },
  {
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdNMg0jFW8hMPvBYgPQAc_Cbv8g5iUH32lZv9EBw7hdd4UEUwFa1khQNJWHHt3DI_fy98&usqp=CAU", 
    title: 'Comer Vigorón',
    text: 'Hola mundo 3'
  }
];


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;



function Backdrop({ scrollX }) {
    // En esta función se hace la animación para se haga el efecto de de que deslizan las imagenes
  return (
    <View
      style={[
        {
          position: "absolute",
          height: ALTURA_BACKDROP,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 2) * ANCHO_CONTENEDOR,
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
            source={{ uri: imagenes.image }}
            style={[
              { width: width, height: ALTURA_BACKDROP, opacity },
              StyleSheet.absoluteFillObject,
            ]}
          />
        );
      })}
      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          width,
          height: ALTURA_BACKDROP,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
}

export default function App() {
    // En esta función se renderizan todos los componentes a los que anteriormente se les creeo una animación
const [modal, setModal] = useState(false)
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
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
          paddingTop: 200,
          paddingHorizontal: ESPACIO_CONTENEDOR,
        }}
        snapToInterval={ANCHO_CONTENEDOR}
        decelerationRate={0}
        scrollEventThrottle={16}
        data={imagenes}
        keyExtractor={(item) => item}
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
          return (
            <View style={{ width: ANCHO_CONTENEDOR }}>
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
                <Image source={{ uri: item.image }} style={styles.posterImage} />
                <Pressable onPress={() => setModal(!modal)}>
                    <Text style={{fontWeight: 'bold',fontSize: 22, color: '#EF662F'}} > { item.title } </Text>
                </Pressable>
              </Animated.View>
            </View>
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
  posterImage: {
    width: "100%",
    height: ANCHO_CONTENEDOR * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  modalimage:{
    width: "100%",
    height: 400,
  },
  contentModal:{
    backgroundColor: '#eeee',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
  },
  centerModal:{
    flex:1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalView:{
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 40,
    shadowColor: '#000',
    shadowOffset:{
        width: 0,
        height: 3,
    }
  },
  cerraModal:{
    backgroundColor: '#EF662F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'white',
    shadowOffset: {
        width: 10,
        height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textModal:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcerrar:{
    color: '#fff',
    padding: 20,
  },
});