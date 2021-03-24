import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Button, Overlay, Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';



function DashboardNotes(props) {

    const [isVisible, setIsVisible] = useState(false);
    const [notesEmpty, setNotesEmpty] = useState(false)
    const [titleNote, setTitleNote] = useState('');
    const [contentNote, setContentNote] = useState('');

    useEffect(() => {

        const findUser = async () => {
            const data = await fetch(`http://192.168.1.100:3000/dashboard?id=${props.idUser}`)
            const body = await data.json()
            if (body.user.notes === undefined) {
                setNotesEmpty(false)
            } else {
                props.saveNotes(body.user.notes)
                setNotesEmpty(true)
            }
        }
        findUser()

    }, [])

    if (!props.idUser) {
        return props.navigation.navigate('Home')
    };


    var handleSubmit = async () => {
        setIsVisible(false);
        const data = await fetch('http://192.168.1.100:3000/dashboard/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `titleFromFront=${titleNote}&contentFromFront=${contentNote}&idUser=${props.idUser}`
        })
        const body = await data.json()
        props.addToNotes({ title: titleNote, content: contentNote })

        setTitleNote('');
        setContentNote('');
    }

    const handleClickDelete = async (idNote) => {

        props.deleteToNotes(idNote)
    
        const deleteReq = await fetch('http://192.168.1.100:3000/dashboard/notes/delete', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `idUser=${props.idUser}&idNote=${idNote}`
        })
    
      }

    var notesDisplay;

    if (notesEmpty == false) {

        notesDisplay = <Text>Pas de notes</Text>

    } else {
        var notesDisplay = props.myNotesList.map((note, i) => {

            return (
                <View key={i}>
                    <View style={{ backgroundColor: "#FAFAFA", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 15 }}>
                        <View style={styles.blockAvatarTitre}>
                            <Text style={styles.titreNote}>{note.title}</Text>
                            <Text style={{ marginTop: 10, textAlign: "center", marginBottom: 10 }}>{note.content}</Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                        <FontAwesomeIcon icon={faTrashAlt} size={25} onPress={() => handleClickDelete(note._id) } />

                    </View>
                </View>
            )
        })
    }

    return (
        <ScrollView style={{ marginTop: 60 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", marginTop: 50 }}>Mes Notes</Text>
            <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                    title="Ajouter une note"
                    type="solid"
                    buttonStyle={{ marginBottom: 20, width: 150, marginTop: 20 }}
                    onPress={() => setIsVisible(true)}
                />
                <Overlay
                    isVisible={isVisible}
                    onBackdropPress={() => { setIsVisible(false) }}
                >
                    <View style={{ width: 300 }}>
                        <Input style={{ textAlign: "center" }}
                            containerStyle={{ marginBottom: 25 }}
                            placeholder='titre'
                            onChangeText={(val) => setTitleNote(val)}

                        />

                        <Input style={{ textAlign: "center" }}
                            containerStyle={{ marginBottom: 25 }}
                            placeholder='description'
                            onChangeText={(val) => setContentNote(val)}

                        />

                        <Button
                            title="Ajouter note"
                            buttonStyle={{ backgroundColor: "#2D89C9" }}
                            onPress={() => handleSubmit()}
                            type="solid"
                        />
                    </View>
                </Overlay>


            </View>


            <Card>
                {notesDisplay}
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    titreNote: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 20
    },
})

function mapStateToProps(state) {
    return { myNotesList: state.notesList, idUser: state.idUser }
}

function mapDispatchToProps(dispatch) {
    return {

        saveNotes: function (notesList) {
            dispatch({
                type: 'saveNotes',
                notes: notesList
            })
        },
        addToNotes: function (newNote) {
            dispatch({
                type: 'addNotes',
                noteInput: newNote
            })
        },
        deleteToNotes: function (IdNote) {
            dispatch({
                type: 'deleteNotes',
                idNote: IdNote
            })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardNotes);