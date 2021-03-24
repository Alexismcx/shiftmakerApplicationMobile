import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

function Activites(props) {

    const [fiches, setFiches] = useState([]);

    useEffect(() => {
        const getFiches = async () => {
            const raw = await fetch('http://192.168.1.100:3000/activities/get-activities');
            const response = await raw.json();
            const ficheList = response.fiches;
            setFiches(ficheList);
        };
        const getFichesLiked = async () => {
            const raw = await fetch(`http://192.168.1.100:3000/activities/get-liked/${props.idUser}`);
            const response = await raw.json();
            const ficheLikedList = response.fichesLiked;
            props.saveFav(ficheLikedList);
        };
        getFiches();
        getFichesLiked();
    }, []);

    const allFiches = fiches.map((fiche, i) => {

        // Redirection si pas de user connecté
        if (!props.idUser) {
            return props.navigation.navigate('Home')
        };

        // Couleur du coeur
        let coeur;
        if (props.myFavorisList.some(e => e._id === fiche._id)) {
            coeur = faHeartFull;
        } else {
            coeur = faHeart;
        };


        // Fonction de like/unlike
        const handleLiked = async (fiche) => {
            if (coeur === faHeart) {
                await fetch('http://192.168.1.100:3000/activities/add-fav', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `ficheId=${fiche._id}&id=${props.idUser}`
                });
                props.addToFavoris(fiche);
            } else {
                await fetch('http://192.168.1.100:3000/dashboard/favoris/delete', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `idFavoris=${fiche._id}&idUser=${props.idUser}`
                });
                props.deleteToFavoris(fiche._id);
            }
        };

        // Conditions pour couleur keywords
        let keyword;
        let code1;
        let code2;
        if (fiche.inclusion) {
            keyword = 'inclusion';
            code1 = <Text style={{ color: '#4ebdb4' }} >#{keyword}</Text>
        } else if (fiche.déclusion) {
            keyword = 'déclusion';
            code1 = <Text style={{ color: '#ba8688' }} >#{keyword}</Text>
        } else if (fiche.émergence) {
            keyword = 'émergence';
            code1 = <Text style={{ color: '#f6b134' }} >#{keyword}</Text>
        } else if (fiche.convergence) {
            keyword = 'convergence';
            code1 = <Text style={{ color: '#827af4' }} >#{keyword}</Text>
        };

        if (fiche.inclusion && keyword !== 'inclusion') {
            code2 = <Text style={{ color: '#4ebdb4' }} >#inclusion</Text>
        } else if (fiche.déclusion && keyword !== 'déclusion') {
            code2 = <Text style={{ color: '#ba8688' }} >#déclusion</Text>
        } else if (fiche.émergence && keyword !== 'émergence') {
            code2 = <Text style={{ color: '#f6b134' }} >#émergence</Text>
        } else if (fiche.convergence && keyword !== 'convergence') {
            code2 = <Text style={{ color: '#827af4' }} >#convergence</Text>
        };



        return (
            <View key={i} style={{ backgroundColor: "white", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
                <View style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%", marginTop: 20 }}>
                    <View style={{ marginLeft: 0 }}>
                        <View style={styles.avatar}>
                            <Icon name="desktop" size={20} color="#ffffff" />
                        </View>
                    </View>
                    <View style={{ width: 255 }}>
                        <Text style={styles.titreActivite}>{fiche.title}</Text>
                    </View>
                </View>
                <Text style={styles.description}>{fiche.description}</Text>
                <View style={styles.blockTagLove}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <FontAwesomeIcon icon={faClock} size={20} color="#FED200" />
                        <Text style={{ marginLeft: 5 }}>{fiche.duration} min</Text>
                    </View>
                    <View>
                        {code1}
                        {code2}
                    </View>
                    <FontAwesomeIcon icon={coeur} size={25} color="#e74c3c" onPress={() => handleLiked(fiche)} />
                </View>
            </View>
        )
    });



    return (
        <ScrollView style={{ marginTop: 60 }}>
            <Card>
                {allFiches}
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
        marginTop: 20
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
        marginTop: 20
    }
})

function mapStateToProps(state) {
    return { myFavorisList: state.favorisList, idUser: state.idUser }
};

function mapDispatchToProps(dispatch) {
    return {
        addToFavoris: function (fiche) {
            dispatch({
                type: 'addToFav',
                fiche: fiche
            })
        },
        saveFav: function (ficheList) {
            dispatch({
                type: 'saveFavoris',
                favorisActivites: ficheList
            })
        },
        deleteToFavoris: function (favorisId) {
            dispatch({
                type: 'deleteFavoris',
                idFavoris: favorisId
            })
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Activites);