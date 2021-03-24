import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

import { connect } from 'react-redux';



function DashboardHistorique(props) {

    const [userInfos, setUserInfos] = useState({})

    useEffect(() => {

        const findUser = async () => {
            const data = await fetch(`http://192.168.1.100:3000/dashboard?id=${props.idUser}`)
            const body = await data.json()
            setUserInfos(body.user)
            props.saveHistorique(body.user.tousLesAteliersCréer)
        }
        findUser()

    }, [])

    if (!props.idUser) {
        return props.navigation.navigate('Home')
    };

    var listHistorique;

    console.log(userInfos);

    if (userInfos === undefined) {

        listHistorique = <Text>pas d'atelier créers</Text>

    } else {
        listHistorique = props.atelierList.map((atelier, i) => {
            return (
                <View key={i}>
                    <View style={{ backgroundColor: "#FAFAFA", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 15 }}>
                        <View style={styles.blockAvatarTitre}>
                            <Text style={styles.titreNote}>{atelier.dateSession} <Text style={{ fontSize: 15 }}>{atelier.cadrage.title}</Text></Text>
                        </View>
                    </View>     
                </View>
            )
        });
    }

    return (
        <ScrollView style={{ marginTop: 60 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", marginTop: 50 }}>Mon Historique</Text>
            <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card>
                {listHistorique}
                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    titreNote: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20
    },
})

function mapStateToProps(state) {
    return { idUser: state.idUser, atelierList: state.historiqueList }
}

function mapDispatchToProps(dispatch) {
    return {

        saveHistorique: function (listHistorique) {
            dispatch({
                type: 'saveAllAtelier',
                allAtelier: listHistorique
            })
        },
        deleteToFavoris: function (favorisId) {
            dispatch({
                type: 'deleteFavoris',
                idFavoris: favorisId
            })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardHistorique);