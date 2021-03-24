import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';


function Cadrage(props) {

    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [q5, setQ5] = useState("");
    const [q6, setQ6] = useState("");
    const [q7, setQ7] = useState("");

    console.log(q1);

    return (
        <ScrollView style={{ marginTop: 60 }}>
            <Text style={{ fontWeight: "bold", fontSize: 25, textAlign: "center", marginTop: 50 }}>{props.name}, prenon un moment pour cadrer ton atelier :</Text>
            <View style={styles.contenairQuestion}>
                <Text style={styles.styleQuestion}>* Quel nom pour ton atelier ?:</Text>
                <Input
                    containerStyle={styles.inputContainerStyle}
                    inputStyle={{ marginLeft: 10, textAlign: "center" }}
                    placeholder='titre'
                    onChangeText={(val) => setQ1(val)}
                />
                <Text style={styles.styleQuestion}>Quels sont les enjeux ?:</Text>
                <Input
                    containerStyle={styles.inputContainerStyle}
                    inputStyle={{ marginLeft: 10, textAlign: "center" }}
                    placeholder='enjeux'
                    onChangeText={(val) => setQ2(val)}
                />
                <Text style={styles.styleQuestion}>Quels sont les livrables attendus ?:</Text>
                <Input
                    containerStyle={styles.inputContainerStyle}
                    inputStyle={{ marginLeft: 10, textAlign: "center" }}
                    placeholder='livrables'
                    onChangeText={(val) => setQ3(val)}
                />
                <Text style={styles.styleQuestion}>Quels apprentissages collectifs souhaitez-vous produire ?:</Text>
                <Input
                    containerStyle={styles.inputContainerStyle}
                    inputStyle={{ marginLeft: 10, textAlign: "center" }}
                    placeholder="L'ambiance, les modes de fonctionnements..."
                    onChangeText={(val) => setQ4(val)}
                />
                <Text style={styles.styleQuestion}>Où cela va se dérouler ?:</Text>
                <Input
                    containerStyle={styles.inputContainerStyle}
                    inputStyle={{ marginLeft: 10, textAlign: "center" }}
                    placeholder='Visio ? Présentiel ? Extérieur ?...'
                    onChangeText={(val) => setQ5(val)}
                />
                <Text style={styles.styleQuestion}>Combien de personnes seront présentes ?:</Text>
                <Input
                    containerStyle={styles.inputContainerStyle}
                    inputStyle={{ marginLeft: 10, textAlign: "center" }}
                    placeholder='Nombre'
                    onChangeText={(val) => setQ6(val)}
                />
                <Text style={styles.styleQuestion}>Combien de temps au total va durer l'atelier ?:</Text>
                <Input
                    containerStyle={styles.inputContainerStyle}
                    inputStyle={{ marginLeft: 10, textAlign: "center" }}
                    placeholder='En minutes'
                    onChangeText={(val) => setQ7(val)}
                />
            </View>
            <View style={{ width: "100%", height: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                    title="Enregistrer"
                    type="solid"
                    buttonStyle={{ width: 150, marginTop: 30, marginBottom: 50 }}
                    icon={
                        <IconFontAwesome
                            name="save"
                            size={20}
                            color="#ffffff"
                            style={{ marginRight: 10 }}
                        />
                    }
                    onPress={() => { props.navigation.navigate('Atelier'); props.saveCadrage(q1, q2, q3, q4, q5, q6, q7) }}

                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    styleQuestion: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 25,
    },
    contenairQuestion: {
        backgroundColor: "white",
        width: "100%",
        marginTop: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    inputContainerStyle: {
        marginTop: 13,
        width: '70%'
    }
})

function mapStateToProps(state) {
    return { idUser: state.idUser, name: state.nameUser }
}

function mapDispatchToProps(dispatch) {
    return {
        saveCadrage: function (q1, q2, q3, q4, q5, q6, q7) {
            dispatch({ type: "saveCadrage", q1: q1, q2: q2, q3: q3, q4: q4, q5: q5, q6: q6, q7: q7 });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cadrage);