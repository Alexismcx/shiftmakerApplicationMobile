import React, { useState } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';


function MurParticipant(props) {

    var PhotoArray = [];


    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <View>
                <Text style={{ textAlign: "center", marginTop: 30, fontWeight: "bold", fontSize: 30 }}>SEssion Capsule</Text>
            </View>
            <View style={styles.containairImage}>

                <Image source={require('../assets/mrFrite/mur.png')} style={{ width: "100%", height: 350 }} />
            </View>



        </View>

    )
}

const styles = StyleSheet.create({
    containairImage: {
        backgroundColor: "white",
        width: 350,
        height: 400,
        marginTop: 60

    },
    contentStyle: {
        height: "60vh",
        color: "#fff",
        textAlign: "center",
    }
})

export default MurParticipant