import React, { useState } from "react";
import {Text, View, ScrollView } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { connect } from "react-redux";


function MurStart(props) {

    const [titre, setTitre] = useState('');
    const [temp, setTemp] = useState('');
    const [logo, setLogo] = useState('');
    const [tempLogo, setTempLogo] = useState('');

    const handleSave = () => {
        setTitre(temp);
        setLogo(tempLogo);
        setTemp();
        setTempLogo();

        props.addParamsMur(temp)

        console.log({ titre: temp, logo: tempLogo });


    };


    return (
        <ScrollView style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", marginTop: 50 }}>Mur d'humeur</Text>
            <Image source={require('../assets/mrFrite/mur.png')} style={{ width: "100%", height: 200, marginTop: 30 }} />
            <View style={{ width: "100%", dispaly: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Input
                    containerStyle={{ marginTop: 20, width: '70%' }}
                    inputStyle={{ marginLeft: 10, textAlign: "center" }}
                    placeholder="Titre mur d'humeur"
                    onChange={(val) => setTemp(val)}
                />
                <Input
                    containerStyle={{ width: '70%' }}
                    inputStyle={{ marginLeft: 10, textAlign: "center" }}
                    placeholder="URL logo"
                    onChange={(val) => setTempLogo(val)}
                />
                <Button

                    title="Valider"
                    type="solid"
                    onPress={() => {props.navigation.navigate('Atelier'); handleSave()}}

                />

            </View>
        </ScrollView>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        addParamsMur: function (param) {
            dispatch({
                type: "addParams",
                settings: param,
            });
        },
    }
}

export default connect(null, mapDispatchToProps)(MurStart);