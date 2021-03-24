import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

function Welcome(props) {

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);

    const toggleOverlay1 = () => {
        setVisible1(!visible1);
    };
    const toggleOverlay2 = () => {
        setVisible2(!visible2);
    };
    const toggleOverlay3 = () => {
        setVisible3(!visible3);
    };
    const toggleOverlay4 = () => {
        setVisible4(!visible4);
    };

    return (
        <ScrollView style={{ marginTop: 25 }}>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                    icon={
                        <FontAwesomeIcon icon={faCog} size={25} color="black" />
                    }
                    type="Clear"
                    buttonStyle={{ marginTop: 20, marginLeft: 280 }}
                    onPress={() => props.navigation.navigate('Settings')}

                />

                <View style={styles.container}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Bienvenue {props.name} !</Text>
                    <Text style={{ fontSize: 15, textAlign: "center", marginBottom: 20 }}>Nous allons pouvoir ensemble créer des ateliers en Intelligence
            Collective.</Text>
                    <Text style={{ fontSize: 15, textAlign: "center", marginBottom: 20 }}>Nous créerons toujours des ateliers en 4 grandes étapes :</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>INCLUSION, EMERGENCE, CONVERGENCE, DECLUSION</Text>
                </View>
                <Button
                    title="SKIP"

                    style={{
                        backgroundColor: "#1A6499",
                        borderRadius: 50,
                        border: "none",
                        color: "#F9F9F9",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 50
                    }}
                    onPress={() => props.navigation.navigate('BottomNavigator', { screen: 'Dashboard' })}
                />
                <View style={styles.cardInclusion}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30 }}>INCLUSION</Text>
                    <Text style={{ textAlign: "center", marginBottom: 20 }} >L'inclusion est un moment clé de la réussite de ton atelier.</Text>
                    <Button
                        title="PLus d'informations"

                        style={{
                            backgroundColor: "#1A6499",
                            borderRadius: 50,
                            border: "none",
                            color: "#F9F9F9",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onPress={toggleOverlay1}
                    />
                    <Overlay isVisible={visible1} onBackdropPress={toggleOverlay1}>
                        <Text>L'inclusion a plusieurs fonctions :</Text>
                        <Text>Dans une partie plus liée au travail à réaliser, Répondre
                      à 4 questions pour le groupe</Text>
                        <Text>quels objectifs ?</Text>
                        <Text>combien de temps cela va durer ?</Text>
                        <Text>qu'est ce qui est attendu de moi ?</Text>
                        <Text>comment cela va se passer ?</Text>
                        <Text> Cette étape doit prendre au minimum 15% de ton temps total
                  d'atelier</Text>
                        <Text>Tu pourras choisir entre différentes activités, notamment pour
              créer la dynamique de groupe nécessaire.</Text>
                    </Overlay>
                    <Text> Toutes les activités de cette étape avec : </Text>
                    <Text> #inclusion</Text>

                </View>
                <View style={styles.cardEmergence}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30 }}>EMERGENCE</Text>
                    <Text style={{ textAlign: "center", marginBottom: 20 }} >L'émergence est l'étape de ton atelier dans lequel ton groupe produit
                    de grandes quantités d'informations et d'idées pour atteindre ton
            objectif</Text>
                    <Button
                        title="PLus d'informations"

                        style={{
                            backgroundColor: "#1A6499",
                            borderRadius: 50,
                            border: "none",
                            color: "#F9F9F9",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onPress={toggleOverlay2}
                    />
                    <Overlay isVisible={visible2} onBackdropPress={toggleOverlay2}>
                        <Text>Dans un premier temps, vous pourrez produire un maximum
                        d’idées. Cette phase est plus particulièrement la phase de
                  divergence de créativité.</Text>
                        <Text>Dans cette étape, vous pourrez aussi créer une phase
                        d'incubation. C'est une phase pendant laquelle, les idées sont
                        "malaxées", croisées afin de créer des idées plus puissantes
                  encore.</Text>
                    </Overlay>
                    <Text>Toutes les activités de cette étape avec :</Text>
                    <Text>#emergence</Text>
                </View>
                <View style={styles.cardConvergence}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30 }}>CONVERGENCE</Text>
                    <Text style={{ textAlign: "center", marginBottom: 20 }} >L'étape de convergence va permettre de réduire le nombre d’idées et
            d'aller vers la prise de décisions.</Text>
                    <Button
                        title="PLus d'informations"

                        style={{
                            backgroundColor: "#1A6499",
                            borderRadius: 50,
                            border: "none",
                            color: "#F9F9F9",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onPress={toggleOverlay3}
                    />
                    <Overlay isVisible={visible3} onBackdropPress={toggleOverlay3}>
                        <Text>Cette étape a pour but de se rapprocher progressivement des
                  pistes que le groupe souhaite retenir.</Text>
                        <Text>C’est lors de cette étape que tu devras faire fructifier les
                        oppositions entre participants. Ces tensions sont
                        essentielles au processus créatif pour produire de nouvelles
                    idées, fruit de l’association improbable d’idées.</Text>
                        <Text>En phase de convergence, on se réfère aux objectifs, on
                        améliore les idées, on juge constructivement, on cherche
                  l’inédit et on est déterminé.</Text>
                        <Text>C'est une étape difficile à animer car elle amène parfois
                    beaucoup d'inconfort entre les participants.</Text>
                    </Overlay>
                    <Text>Toutes les activités de cette étape avec :</Text>
                    <Text>#convergence</Text>
                </View>
                <View style={styles.cardDeclusion}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30 }}>DECLUSION</Text>
                    <Text style={{ textAlign: "center", marginBottom: 20 }} > L'étape de déclusion marque à son tour la fin de l’espace-temps du
            collectif.</Text>
                    <Button
                        title="PLus d'informations"

                        style={{
                            backgroundColor: "#1A6499",
                            borderRadius: 50,
                            border: "none",
                            color: "#F9F9F9",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onPress={toggleOverlay4}
                    />
                    <Overlay isVisible={visible4} onBackdropPress={toggleOverlay4}>
                        <Text>Le temps de déclusion agit sur la dynamique de groupe, et sur la place de chacun. Ainsi, elle peut se réaliser en
                    deux temps : expression individuelle et activité collective.</Text>
                        <Text>La phase de déclusion favorise l’ancrage des connaissances
                        acquises pendant le travail collectif. L’activité consiste
                        à proposer une narration des différentes étapes franchies
                        puis de consacrer un temps individuel pour que chacun
                        puisse imaginer des applications possibles avant de les
                      partager en collectif.</Text>
                        <Text>La déclusion peut être l’occasion d’exprimer trois aspects :
                        ce que je retiens/mon coup de cœur, ce qui serait à
                        améliorer et expression libre. Ce temps peut être suivi
                        d’une courte activité collective pour prendre en compte
                    l’énergie du groupe.</Text>

                    </Overlay>
                    <Text>Toutes les activités de cette étape avec :</Text>
                    <Text>#declusion</Text>
                </View>
                <View style={styles.cardCadrage}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30 }}>Cadrage</Text>
                    <Text style={{ textAlign: "center", marginBottom: 20 }} > Pour assurer la réussite d'un atelier, un cadrage est nécessaire.</Text>
                    <Text style={{ textAlign: "center", marginBottom: 20 }} > Nous t'aiderons à réaliser ce cadrage à l'aide d'une série de
              questions.</Text>
                    <Text style={{ textAlign: "center", marginBottom: 20 }} > Ainsi lors de la création des ateliers tu pourras toujours
                    garder en vue toutes les informations nécessaires afin de choisir
              les bonnes activités</Text>

                </View>
            </View>

        </ScrollView>


    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        marginTop: 50
    },
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
        marginBottom: 30,
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
        marginBottom: 30
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
        marginBottom: 30
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
        marginBottom: 30
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
        marginBottom: 30
    }

})

function mapStateToProps(state) {
    console.log(state.idUser);
    return { idUser: state.idUser, name: state.nameUser }
}

export default connect(
    mapStateToProps,
    null
)(Welcome);


