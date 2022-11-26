import { Text, View, StyleSheet, Image} from "react-native";

export default () => {
    return(
    <View style={styles.container}>
        <Image 
      style={{ height: 370, width: "100%", resizeMode: "contain", marginTop: -200}}
      source={{
        uri: "https://i.ibb.co/tKf5FGH/Acerca-Nosotros-03.png"
      }}/>

    <View style={{padding:10}}>

            <View style={{padding:10, backgroundColor:"#fff",borderRadius:6, marginTop:-100, borderColor:'#EF662F', borderWidth:0.5}}>
                <View style={{flexDirection:"row",alignItems:"center",marginVertical:5}}>
                    <Text 
                        style={{
                            marginLeft:4,
                            color:"#092040",
                            fontSize:15,
                            fontWeight:"500",
                            textAlign: 'justify'
                            
                            }}
                        >
                            El 80% de los turistas en nuestro estudio de mercado, afirmaron que no encuentran
                            información ni fotografías confiables sobre el lugar que van a visitar, por lo tanto sus viajes
                            se convierten en malas experiencias. Cada lugar tiene diferentes actividades y diferentes
                            precios, pero para los turistas resulta difícil encontrar información completa y confiable, y como consecuencia, no quieren volver a viajar o lo dejan en manos de alguien mas.
                        </Text>
                </View>

                <View style={{flexDirection:"row",alignItems:"center",marginVertical:5}}>
                    <Text style={{marginLeft:4,color:"#092040",fontSize:15,fontWeight:"500", textAlign: 'justify' }}>Es por esto que hemos creado ésta nueva experiencia de viaje a través de "TurinGO", tu nuevo guía turístico virtual</Text>
                </View>
            </View>
            <View style={{marginTop: 40, padding: 20}}>
                <Text style={{color:'#EF662F', fontWeight:'bold', fontSize: 16, textAlign: 'justify'}}>¡Gracias por ser parte de esta comunidad de Turingueros! Esperamos que disfrutes mucho más tus viajes con ésta herramienta que hemos creado para que tus aventuras sean las más memorables! ¡Departe del todo el team en TurinGO te deseamos una feliz aventura!</Text>
            </View>
        </View>
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