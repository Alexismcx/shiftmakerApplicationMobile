import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";


function MurCoach(props) {

    const socket = socketIOClient("http://192.168.1.100:3000");

    const [disableButton, setDisableButton] = useState(false);
    const [titre, setTitre] = useState(`Mur d'humeur`);
    const [totalVotes, setTotalVotes] = useState(0);

    console.log(props.paramsMur.titre);

    useEffect(() => {
        socket.on('titre', (titre) => {
            setTitre(titre);
        })
    }, [titre]);

    if (!props.idUser) {
        socket.emit('TitreMurParticipant');
    };

    if (props.idUser) {
        socket.emit('titreMur', ("Titre mur d'humeur"));
    };

    const childCallback = (value) => {
        setTotalVotes(value)
    };

    let imageNumber = 1;
    const choiceFeel = () => {

        if (imageNumber === 1) {
            socket.emit('IncrementImg1');
        } else if (imageNumber === 2) {
            socket.emit('IncrementImg2');
        } else if (imageNumber === 3) {
            socket.emit('IncrementImg3');
        } else if (imageNumber === 4) {
            socket.emit('IncrementImg4');
        } else if (imageNumber === 5) {
            socket.emit('IncrementImg5');
        } else if (imageNumber === 6) {
            socket.emit('IncrementImg6');
        } else if (imageNumber === 7) {
            socket.emit('IncrementImg7');
        } else if (imageNumber === 8) {
            socket.emit('IncrementImg8');
        } else if (imageNumber === 9) {
            socket.emit('IncrementImg9');
        } else if (imageNumber === 10) {
            socket.emit('IncrementImg10');
        } else if (imageNumber === 11) {
            socket.emit('IncrementImg11');
        } else if (imageNumber === 12) {
            socket.emit('IncrementImg12');
        } else if (imageNumber === 13) {
            socket.emit('IncrementImg13');
        } else if (imageNumber === 14) {
            socket.emit('IncrementImg14');
        };

        setDisableButton(true);
    };

    const onChange = (picture) => {
        imageNumber = picture + 1;
        console.log(imageNumber);
    };

    var PhotoArray = [];
    for (var i = 1; i < 15; i++) {
        var picture = `${i}_MrFrite.png`;
        PhotoArray.push(picture);
    };

    var carroussel = PhotoArray.map((image) => {
        var src = "../assets/mrFrite/" + image

        console.log(src);
        return (

                <View key={i}>
                    <Image
                        width={"40vh"}
                        source={src}
                        preview={false}
                    />
                </View>

        );

    })


    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <View>
                <Text style={{ textAlign: "center", marginTop: 30, fontWeight: "bold", fontSize: 30 }}>{titre}</Text>
                <Text style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}>Code Session: {props.codeSession} </Text>
            </View>

            <View style={styles.containairImage}>

                <Image source={require('../assets/mrFrite/mur.png')} style={{ width: "100%", height: 350 }} />
                <Text style={{ fontSize: 20, marginTop: 30, textAlign: "center" }}>Nombre total de participants: 0</Text>
                
            </View>
            <View>
                <Text>Quel est ton humeur du moment ?</Text>
                {carroussel}

            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    containairImage: {
        backgroundColor: "white",
        width: 350,
        height: 400,
        marginTop: 60

    }
})

function mapStateToProps(state) {
    return { idUser: state.idUser, paramsMur: state.paramsMur, codeSession: state.codeSession }
};

export default connect(
    mapStateToProps,
    null
)(MurCoach);