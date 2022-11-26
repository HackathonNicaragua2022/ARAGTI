import { StyleSheet, Text, SafeAreaView, View, Pressable, FlatList } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';


const ResultsScreen = () => {
    const route = useRoute();
    // console.log(route.params);
  return (
    <SafeAreaView style={{margin:10}}>
      <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between"}}>
        <Text>Your Results</Text>
        </View>

        <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between", marginVertical:10}}>
            <Text>Question Answered</Text>
            <Text>(5/5)</Text>
        </View>

        <Pressable style={{backgroundColor:"white", height:200,borderRadius:7,marginTop:20}}>
            <Text style={{color:"#FF7E00",fontSizez:15,textAling:"center",marginTop:8}}>Scored Card</Text>
            <FlatList numColumns={2} data={route.params.answer} renderItem={({item, i}) => (
                <View style={{alignItems:"center",justifyContent:"center",margin:10,flexDirection:"row",alignItems:"center",marginLeft:"auto",marginRight:"auto"}}>
                    <Text>{item.question}</Text>
                    {item.answer === true ? (
                        <AntDesign style={{marginLeft:5}} name="checkcircle" size={20} color="green" />
                    ):(
                        <AntDesign style={{marginLeft:5}} name="closecircle" size={20} color="red" />
                    )}
                </View>
            )} />

          <Pressable style={{backgroundColor:"#FF7E00",padding:8,marginLeft:"auto",marginRight:"auto",marginBottom:20,borderRadius:5}}>
            <Text style={{color:"white",textAlign:"center"}}>¡Juego Finalizado!</Text>
          </Pressable>
        </Pressable>
    </SafeAreaView>
  )
}

export default ResultsScreen

const styles = StyleSheet.create({})