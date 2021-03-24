import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'


function Settings(props) {


    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            
            <TouchableOpacity style={{width: "100%", marginTop: 20, marginLeft: 10}} onPress={() => {props.navigation.navigate('Home'); props.logout }}>
                <Text style={styles.styleParamTitre}>Déconnexion</Text>
                <Text>Vous êtes connecté en tant que {props.name}</Text>
                
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    styleParamTitre: {
        fontSize: 25
    },
    styleParamDesc: {
        fontSize: 15
    }
})

function mapStateToProps(state) {
    return { idUser: state.idUser, name: state.nameUser }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      logout: function () {
        dispatch({ type: 'logout', user : "" })
      }
    }
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings);
