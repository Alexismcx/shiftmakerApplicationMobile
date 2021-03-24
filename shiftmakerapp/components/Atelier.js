import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Card, Overlay } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare, faClock } from '@fortawesome/free-regular-svg-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'

function Atelier(props) {

    const [etape, setEtape] = useState();
    const [codeSession, setCodeSession] = useState('')
    const [visible, setVisible] = useState(false);
    const [disabledButtonSave, setDisabledButtonSave] = useState(false)
    const [isDisabledLaunchButton, setIsdisableLaunchButton] = useState(true)

    const toggleOverlay = () => {
        setVisible(!visible);
    };


    var atelierName = props.dataCadrageList[0]

    var activitiesInclusion = props.activitiesInclusion;

    const handleClickSave = async () => {
        const ladate = new Date();
        const options = {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
        };
        var date = ladate.toLocaleDateString("fr-FR", options);
        const data = await fetch(
            `http://192.168.1.100:3000/atelier/save?atelierName=${atelierName}&atelierDate=${date}&idUser=${props.idUser}`
        );

        const body = await data.json()

        setCodeSession(body.codeSession.code)
        props.addCodeSession(body.codeSession.code)

        toggleOverlay()

    };

    const handleClickCode = () => {
        setVisible(false)
        setIsdisableLaunchButton(false)

    }

    if (activitiesInclusion[0] === undefined) {
        var displayActivitiesInclusion = (
            <Text className="nochoice">Aucune Activité Choisie</Text>
        );
    } else {

        var displayActivitiesInclusion = activitiesInclusion.map((fiche, i) => {
            if (fiche.title === "Mur d'humeur") {
            }
            return (
                <Card key={i}>
                    <View style={{ backgroundColor: "white", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                        <View style={styles.blockAvatarTitre}>
                            <View style={styles.avatar}>
                                <Icon name="desktop" size={20} color="#ffffff" />

                            </View>
                            <Text style={styles.titreActivite}>{fiche.title}</Text>
                        </View>
                        <View style={styles.blockTagLove}>
                            <View style={{ display: "flex", flexDirection: "row", marginBottom: 20, marginTop: 20 }}>
                                <FontAwesomeIcon icon={faClock} size={20} color="#FED200" />
                                <Text style={{ marginLeft: 5 }}>10min</Text>
                            </View>
                            <Button

                                title="Lancer"

                                buttonStyle={{ backgroundColor: "#70C047", borderRadius: 30 }}
                                type="solid"
                                onPress={() => props.navigation.navigate('MurCoach')}
                                disabled={isDisabledLaunchButton}
                                ghost={isDisabledLaunchButton}
                            />
                        </View>
                    </View>
                </Card>
            );
        });
    }


    return (
        <ScrollView style={{ marginTop: 60 }}>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <View style={styles.cardInclusion}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30, color: "white" }}>INCLUSION</Text>

                    <Button
                        icon={
                            <FontAwesomeIcon icon={faPlusSquare} size={25} color="white" style={{ marginRight: 13 }} />
                        }
                        title="Ajouter activité"

                        buttonStyle={{ marginTop: 20, marginBottom: 35, backgroundColor: "#495057", borderRadius: 30 }}
                        type="solid"
                        onPress={() => { props.navigation.navigate('ChoixActivites'); props.selectEtape("inclusion") }}
                    />
                    {displayActivitiesInclusion}


                </View>

            </View>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <View style={styles.cardEmergence}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30, color: "white" }}>EMERGENCE</Text>

                    <Button
                        icon={
                            <FontAwesomeIcon icon={faPlusSquare} size={25} color="white" style={{ marginRight: 13 }} />
                        }
                        title="Ajouter activité"

                        buttonStyle={{ marginTop: 20, marginBottom: 35, backgroundColor: "#495057", borderRadius: 30 }}
                        type="solid"
                    />

                </View>
            </View>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <View style={styles.cardConvergence}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30, color: "white" }}>CONVERGENCE</Text>

                    <Button
                        icon={
                            <FontAwesomeIcon icon={faPlusSquare} size={25} color="white" style={{ marginRight: 13 }} />
                        }
                        title="Ajouter activité"

                        buttonStyle={{ marginTop: 20, marginBottom: 35, backgroundColor: "#495057", borderRadius: 30 }}
                        type="solid"
                    />
                </View>
            </View>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <View style={styles.cardDeclusion}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30, color: "white" }}>DECLUSION</Text>

                    <Button
                        icon={
                            <FontAwesomeIcon icon={faPlusSquare} size={25} color="white" style={{ marginRight: 13 }} />
                        }
                        title="Ajouter activité"

                        buttonStyle={{ marginTop: 20, marginBottom: 35, backgroundColor: "#495057", borderRadius: 30 }}
                        type="solid"
                    />
                </View>
            </View>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <View style={styles.cardCadrage}>
                    <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button
                            title="Enregistrer"
                            type="solid"
                            buttonStyle={{ width: 150, marginTop: 30, marginBottom: 20, backgroundColor: "green" }}
                            icon={
                                <IconFontAwesome
                                    name="save"
                                    size={20}
                                    color="#ffffff"
                                    style={{ marginRight: 10 }}
                                />
                            }
                            onPress={() => handleClickSave()}
                        />

                    </View>

                </View>
            </View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Votre code session: {codeSession}</Text>
                <Button
                    title="OK"
                    buttonStyle={{ backgroundColor: "#2D89C9", marginTop: 20 }}
                    onPress={() => handleClickCode()}
                    type="solid"
                />

            </Overlay>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardInclusion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3,
        backgroundColor: "#2182C6",
        marginBottom: 20,
        marginTop: 20
    },
    cardEmergence: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3,
        backgroundColor: "#70C047",
        marginBottom: 20
    },
    cardConvergence: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3,
        backgroundColor: "#F5A81C",
        marginBottom: 20
    },
    cardDeclusion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3,
        backgroundColor: "#ED2D6E",
        marginBottom: 20
    },
    cardCadrage: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3,
        backgroundColor: "white",
        marginBottom: 20
    },
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
        marginTop: 10
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
        justifyContent: "center",

        alignItems: "center",
        flexDirection: "row",
        width: 280,
        marginTop: 8,
        flexDirection: 'column'
    },
    cardCadrage: {
        backgroundColor: "white",
        width: 300,
    },
    paramTitre: {
        width: "100%",
        marginTop: 10,
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "bold",
        paddingLeft: 10
    },
    paramDesc: {
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 10,
        marginRight: 20
    },
})


function mapDispatchToProps(dispatch) {
    return {
        selectEtape: function (etape) {
            dispatch({
                type: "selectEtape",
                etape: etape,

            });
        },

        addCodeSession: function (code) {
            dispatch({
                type: "saveCode",
                code: code
            })
        }
    };
}

function mapStateToProps(state) {
    return {
        dataCadrageList: state.dataCadrage,
        fiche: state.activitieAdded,
        selectedEtape: state,
        idUser: state.idUser,
        activitiesDeclusion: state.activitiesDeclusion,
        activitiesInclusion: state.activitiesInclusion,
        activitiesEmergence: state.activitiesEmergence,
        activitiesConvergence: state.activitiesConvergence,
        params: state.paramsMur
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Atelier)