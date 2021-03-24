import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Image, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowAltCircleDown, faEye } from "@fortawesome/free-regular-svg-icons";
import Pdf from 'react-native-pdf';
import { connect } from 'react-redux';



function Theorie(props) {

    const [fiches, setFiches] = useState([]);
    const [pdf, setPdf] = useState(null)

    useEffect(() => {
        const getFiches = async () => {
            const raw = await fetch('http://192.168.1.100:3000/activities/get-theory');
            const response = await raw.json();
            const ficheList = response.fiches;
            setFiches(ficheList);
        };
        getFiches();
    }, []);

    if (!props.idUser) {
        return props.navigation.navigate('"Home')
    };

    var test;


    const allFiches = fiches.map((fiche, i) => {
        return (
            <View key={i} style={styles.blockFiche}>
                <View style={styles.blockAvatarTitre}>
                    <View style={styles.avatar}>
                        <Icon name="desktop" size={20} color="#ffffff" />

                    </View>
                    <Text style={styles.titreTheorie}>{fiche.title}</Text>
                </View>
                <View style={{ width: 300, display: "flex", flexDirection: "row", marginTop: 14 }}>
                    <Image source={{ uri: fiche.picto }} style={{ width: 80, height: 80 }} />
                    <Text style={styles.description}>{fiche.description}</Text>

                </View>
                <View style={{ width: 160, display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 20 }}>
                    
                </View>
                {test}
            </View>
        );
    });




    return (
        <ScrollView style={{ marginTop: 60 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", marginTop: 50 }}>{props.name}, quel concept souhaites-tu revoir ?</Text>
            {allFiches}


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    blockFiche: {
        backgroundColor: "#FAFAFA",
        width: "100%", display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 7,
        borderRadius: 40,
        marginTop: 20,
    },
    titreTheorie: {
        fontWeight: "bold",
        fontSize: 18
    },
    description: {
        textAlign: "center",
        marginTop: 10,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 10

    }
})

function mapStateToProps(state) {
    return { idUser: state.idUser, name: state.nameUser }
}

export default connect(
    mapStateToProps,
    null
)(Theorie);
