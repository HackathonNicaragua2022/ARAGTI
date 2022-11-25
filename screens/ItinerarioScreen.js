import React from "react";
import { View, StyleSheet, Text, Image, Dimensions, FlatList } from "react-native";

export default () =>{

    return(
        <View style={styles.container}>
            <Text style={{color:'#EF662F', fontSize: 20, fontWeight: 'bold'}}>Aquí estará tu itinerario{"\n"}        ¡Esperalo Pronto!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent:'center'
    },
})