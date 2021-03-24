import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Button, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

function DashboardFavoris(props) {

    const [favorisEmpty, setFavorisEmpty] = useState(false)

    useEffect(() => {
        const findUser = async () => {
            const data = await fetch(`http://192.168.1.100:3000/dashboard?id=${props.idUser}`)
            const body = await data.json()
            if (body.user.favorisActivites === undefined) {
                setFavorisEmpty(true)
            } else {
                props.saveFavoris(body.user.favorisActivites)
            }
        }
        findUser()
    }, [])

    if (!props.idUser) {
        return props.navigation.navigate('Home')
    };

    const handleClickDelete = async (favorisId) => {
        props.deleteToFavoris(favorisId)
    
        const deleteReq = await fetch('http://192.168.1.100:3000/dashboard/favoris/delete', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `idUser=${props.idUser}&idFavoris=${favorisId}`
        })
    }

    var fiches;

    if (favorisEmpty === undefined) {
        fiches = <Text>pas de favoris</Text>
    } else {
        fiches = props.myFavorisList.map((favoris, i) => {

            var picto;

            var picto;
            if (favoris.digital === true) {
                picto = "desktop"
            } else {
                picto = "users"
            }

            var resumeDesc = favoris.description

            if (favoris.description.length > 40) {
                resumeDesc = resumeDesc.slice(0, 80) + '...'
            }

            return (
                <View key={i}>
                    <View style={{ backgroundColor: "#FAFAFA", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%", marginTop: 20 }}>
                            <View style={{ marginLeft: 0 }}>
                                <View style={styles.avatar}>
                                    <Icon name={picto} size={20} color="#ffffff" />
                                </View>
                            </View>
                            <View style={{ width: 255 }}>
                                <Text style={styles.titreActivite}>{favoris.title}</Text>
                            </View>
                        </View>
                        <Text style={styles.description}>{resumeDesc}</Text>
                        <View style={styles.blockTagLove}>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <FontAwesomeIcon icon={faClock} size={20} color="#FED200" />
                                <Text style={{ marginLeft: 5 }}>{favoris.duration} min</Text>
                            </View>
                            <View>
                                <Text>#Inclucion</Text>
                                <Text>#Déclusion</Text>
                            </View>
                            
                        </View>
                    </View>
                    <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                        <FontAwesomeIcon icon={faTrashAlt} size={25} onPress={() => handleClickDelete(favoris._id)} />

                    </View>
                </View>

            )

        });
    }







    return (
        <ScrollView style={{ marginTop: 60 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", marginTop: 50 }}>Mes Favoris</Text>
            <Card>
                {fiches}

            </Card>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    titreActivite: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 20
    },
    blockAvatarTitre: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: "red", 
    },
    avatar: {
        width: 40,
        height: 40,
        backgroundColor: "#BDBDBD",
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        marginTop: 20,
        marginBottom: 20
    }
})

function mapStateToProps(state) {
    return { myFavorisList: state.favorisList, idUser: state.idUser }
}

function mapDispatchToProps(dispatch) {
    return {

        saveFavoris: function (favoris) {
            dispatch({
                type: 'saveFavoris',
                favorisActivites: favoris
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
)(DashboardFavoris);

