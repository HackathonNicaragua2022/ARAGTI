import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const TriviahomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Image 
      style={{ height: 370, width: "100%", resizeMode: "contain"}}
      source={{
        uri: "https://i.ibb.co/KznFPV9/Trivia.png"
      }}/>

      <View style={{padding:10}}>
        <Text style={{textAlign:"center",color:"#FF7E00",fontSize:20,fontWeight:"600"}}>REGLAS</Text>

        <View style={{padding:10, backgroundColor:"#F88379",borderRadius:6, marginTop:15}}>
            <View style={{flexDirection:"row",alignItems:"center",marginVertical:5}}>
                <Text style={{color:"black",}}>.</Text>
                <Text 
                    style={{
                        marginLeft:4,
                        color:"#722F37",
                        fontSize:15,
                        fontWeight:"500",
                        }}
                    >
                        Por cada respuesta correcta obtendras 5 puntos
                    </Text>
            </View>

            <View style={{flexDirection:"row",alignItems:"center",marginVertical:5}}>
                <Text style={{color:"black",}}>.</Text>
                <Text style={{marginLeft:4,color:"#722F37",fontSize:15,fontWeight:"500"}}>Estos puntos podran ser canjeados en restaurantes</Text>
            </View>

            <View style={{flexDirection:"row",alignItems:"center",marginVertical:5}}>
                <Text style={{color:"black",}}>.</Text>
                <Text style={{marginLeft:4,color:"#722F37",fontSize:15,fontWeight:"500"}}>Solo podras podras hacer un maximo de 1 quiz al dia</Text>
            </View>   
        </View>
      </View>
      
        <Pressable
        onPress={() => navigation.replace("Quiz")} 
            style={{
                backgroundColor:"#FF7E00",
                padding:15,
                width:120,
                borderRadius:25,
                marginLeft:"auto",
                marginRight:"auto",
                marginTop:30,
            }}
        >
            <Text style={{color:"white",fontWeight:"600",textAlign:"center"}}>Comenzar Quiz</Text>
        </Pressable>
    </View>
  )
}

export default TriviahomeScreen

const styles = StyleSheet.create({})