import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { connect } from "react-redux";

function ChoixActivites(props) {

    const [fichesByKey, setFichesByKey] = useState([]);
    var etapeSelected = "inclusion";

    useEffect(() => {
        const addActivities = async (keyword) => {
            /* variable pour distinction filtre recherche sur mot clé dans DB poussée depuis le Onclick*/
            const addActivities = await fetch(`http://192.168.1.100:3000/addactivities?keyword=${keyword}`);
            const response = await addActivities.json();
            if (response) {
                setFichesByKey(response.fichesByKeyword);
            }
        };
        addActivities(etapeSelected);
    }, []);

    const addtoEtape = (fiche) => {
        if ((etapeSelected == "inclusion")) {
            props.addActivitiesToInclusion(fiche);
        }
    };

    const fiches = fichesByKey.map((fiche, i) => {
        /* ligne 72 dynamiser le link par conditions link */

        if (fiche.digital) { var redirection = "murstart" } else { var redirection = "atelier" }
        console.log(fiche.content);
        return (
            <Card key={i}>
                <View style={{ backgroundColor: "white", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
                    <View style={styles.blockAvatarTitre}>
                        <View style={styles.avatar}>
                            <Icon name="desktop" size={20} color="#ffffff" />

                        </View>
                        <Text style={styles.titreActivite}>{fiche.title}</Text>
                    </View>
                    <Text style={styles.description}>{fiche.description}</Text>
                    <View style={styles.blockTagLove}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <FontAwesomeIcon icon={faClock} size={20} color="#FED200" />
                            <Text style={{ marginLeft: 5 }}>{fiche.duration}</Text>
                        </View>
                        <Button

                            title="Ajouter"

                            buttonStyle={{ marginBottom: 5, marginRight: 90, backgroundColor: "#827af4", borderRadius: 10, width: 70 }}
                            type="solid"
                            onPress={() => { props.navigation.navigate('Atelier'); addtoEtape(fiche) }}
                        />
                    </View>
                </View>
            </Card>
        );
    });


    return (
        <ScrollView style={{ marginTop: 60 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", marginTop: 50 }}>Choix des Activités</Text>
            {fiches}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    titreActivite: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 40
    },
    blockAvatarTitre: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20
    },
    avatar: {
        width: 40,
        height: 40,
        backgroundColor: "#BDBDBD",
        marginLeft: -60,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    description: {
        marginLeft: 20,
        marginTop: 15
    },
    blockTagLove: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: 280,
        marginTop: 30
    }
})

function mapStateToProps(state) {
    return { etape: state.etapeSelected, idUser: state.idUser };
}

function mapDispatchToProps(dispatch) {
    return {
        addActivitiesToInclusion: function (fiche) {
            dispatch({
                type: "addActivitiesToInclusion",
                fiche: fiche,
            });
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChoixActivites);
