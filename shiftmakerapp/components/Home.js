import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';


function Home(props) {

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstTime, setFirstTime] = useState(false);
    const [logParticipant, setLogParticipant] = useState('');
    const [isParticipant, setIsParticipant] = useState(false);
    const [userInfos, setUserInfos] = useState({})



    const handleSignIn = async () => {

        if (signInEmail !== '' && signInPassword !== '') {
            const raw = await fetch('http://192.168.1.100:3000/users/sign-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `email=${signInEmail}&password=${signInPassword}`
            });
            const response = await raw.json();
            const checkUser = response.userFound;
            console.log(`First time or not ? ${response.firstTime}`);
            setFirstTime(response.firstTime);
            setUserInfos(response.user)
            console.log(response.user);
            if (checkUser) {
                setIsLoggedIn(true);
                props.userLoggedIn(response.user._id);
                props.addName(response.user.firstname)
            } else {
                console.log('Email ou mot de passe incorrect')
            };

        } else {

            console.log('Merci de renseigner les deux champs de connexion')

        }

        setSignInEmail("")
        setSignInPassword("")





        props.navigation.navigate('BottomNavigator', { screen: 'Welcome' })
    };


    return (
        <View style={styles.container}>
            <Image source={require('../assets/Background_Login.png')} style={{ width: 100, height: 150, marginBottom: 20, marginTop: -50 }} />
            <Text style={styles.titre}>Connexion</Text>

            <Input
                containerStyle={{ marginBottom: 5, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Email'
                onChangeText={(val) => setSignInEmail(val)}

            />
            <Input
                containerStyle={{ marginBottom: 5, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Mot de passe'
                onChangeText={(val) => setSignInPassword(val)}

            />
            <Button
                title="Se connecter"
                type="solid"
                buttonStyle={{ marginBottom: 50 }}
                onPress={() => handleSignIn()}
            />
            <Text style={styles.titre}>Participant ? Rejoins Ta session</Text>
            <Input
                containerStyle={{ marginBottom: 5, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Mot de passe'

            />
            <Button
                title="Rejoindre Session"
                type="solid"
                onPress={() => { props.navigation.navigate('MurParticipant') }}
            />


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    titre: {
        fontSize: 20, marginBottom: 20
    }
})

function mapDispatchToProps(dispatch) {
    return {
        userLoggedIn: function (userId) {
            dispatch({ type: 'addIdUser', user: userId })
        },
        addName: function (name) {
            console.log(name);
            dispatch({ type: 'saveName', name: name })
        }
    }
};

export default connect(
    null,
    mapDispatchToProps
)(Home);