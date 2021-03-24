import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useIsFocused } from "@react-navigation/native";

import { connect } from 'react-redux';

function Dashboard(props) {

    const isFocused = useIsFocused()

    const [userInfos, setUserInfos] = useState({})
    const [checkFavorisList, setCheckFavorisList] = useState(false);
    const [checkNotesList, setCheckNotesList] = useState(false)

    useEffect(() => {
        const findUser = async () => {
            console.log(props.idUser);
            const data = await fetch(`http://192.168.1.100:3000/dashboard?id=${props.idUser}`)
            const body = await data.json()
            setUserInfos(body.user)


            if (body.user.favorisActivites.length > 0) {
                setCheckFavorisList(true)
            }
            if (body.user.notes.length > 0) {
                setCheckNotesList(true)
            }
        }
        findUser()
    }, [isFocused])

    if (!props.idUser) {
        return props.navigation.navigate('Home')
    };

    var fiches;

    if (checkFavorisList === false) {
        fiches = <Text style={styles.messageSiVide}>Pas de favoris</Text>
    } else {
        fiches = userInfos.favorisActivites.slice(0, 2).map((favoris, i) => {
            var picto;
            if (favoris.digital === true) {
                picto = "desktop"
            } else {
                picto = "users"
            }

            var resumeDesc = favoris.description

            if (resumeDesc.length > 40) {
                resumeDesc = resumeDesc.slice(0, 80) + '...'
            }

            return (
                <View style={{ backgroundColor: "#FAFAFA", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 30 }} key={i}>
                    <View style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%" }}>
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
                            <Text style={{ marginLeft: 5, marginBottom: 30 }}>{favoris.duration} min</Text>
                        </View>


                    </View>
                </View>
            )
        });
    }

    var listNote;

    if (checkNotesList === false) {
      listNote = <Text style={styles.messageSiVide}>Pas de notes</Text>
    } else {
      listNote = userInfos.notes.slice(0, 2).map((notes, i) => {
        return (<View  key={i} style={{ marginBottom: 3, marginTop: 20}}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>{notes.title}</Text>
            <Text style={{ textAlign: "center", marginTop: 5}} >{notes.content}</Text>
        </View>
        )
      })
    }

    var historiqueList;

    if (historiqueList === false) {
        historiqueList = <Text style={styles.messageSiVide}>Pas de notes</Text>
    } else {
        historiqueList = props.atelierList.slice(0, 2).map((historique, i) => {
        return (
        <Text key={i} style={{ textAlign: "center" }}>{historique.dateSession} {historique.cadrage.title}</Text>
        )
      })
    }




    return (
        <ScrollView style={{ marginTop: 60 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", marginTop: 50 }}>Mes Favoris</Text>
            <Card>
                {fiches}

            </Card>
            <View style={{ width: "100%", height: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                    title="Regarder tous mes favoris"
                    type="solid"
                    buttonStyle={{ marginBottom: 50, width: 250, marginBottom: 20 }}
                    onPress={() => props.navigation.navigate('DashboardFavoris')}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", marginTop: 50 }}>Mes Notes</Text>
            <Card>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: 250}}>
                    {listNote}
                    </View>
                </View>
            </Card>
            <View style={{ width: "100%", height: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                    title="Regarder toutes mes notes"
                    type="solid"
                    buttonStyle={{ marginBottom: 50, width: 250, marginBottom: 20 }}
                    onPress={() => props.navigation.navigate('DashboardNotes')}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", marginTop: 50 }}>Mon Historique</Text>
            <Card>
                <Card.Title>Tous mes ateliers créers</Card.Title>
                <Card.Divider />
                <View>
                {historiqueList}

                </View>
            </Card>
            <View style={{ width: "100%", height: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                    title="Regarder tout mon historique"
                    type="solid"
                    buttonStyle={{ marginBottom: 50, width: 250, marginBottom: 20 }}
                    onPress={() => props.navigation.navigate('DashboardHistorique')}
                />
            </View>


        </ScrollView>

    )
}

const styles = StyleSheet.create({
    historique: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        width: 250,
        marginBottom: 30
    },
    titreActivite: {
        textAlign: "center",

        fontWeight: "bold",
        fontSize: 18,
    },
    messageSiVide: {
        fontStyle: "italic",
        fontWeight: "bold"

    },
    blockAvatarTitre: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "red",
        marginTop: 20,
        width: "100%",
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
    console.log(state.idUser);
    return { idUser: state.idUser, atelierList: state.historiqueList }
}

export default connect(
    mapStateToProps,
    null
)(Dashboard);

