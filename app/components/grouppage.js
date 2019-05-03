import React, {Component} from 'react';
import {Linking, Button, TouchableOpacity, Image, ScrollView, View, Text } from'react-native';
import style from '../style/style';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Expo, { Permissions, Notifications } from 'expo';

async function register() {
    try {
        let token = await Notifications.getExpoPushTokenAsync();
      
        changeToken(token);
        }
        catch(error) {
          console.log(error);
        }
        
}




export default class Grouppage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            content: '',
            token: '',
        };

        handleChange = (newTitle, newImage, newContent) => {
            return this.setState({
                title: newTitle,
                image: newImage,
                content: newContent,
            })
        }

        changeToken = (newToken) => {
            return this.setState({
                token: newToken
            })
        }

        sendPushNotificationGroup = () => {
            let response = fetch('https://exp.host/--/api/v2/push/send', {
               method: 'POST',
               headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json'
               } ,
               body: JSON.stringify({
                   to: this.state.token,
                   sound:'default',
                   title: 'SCROK App',
                   body:'Group Activities have a news! Check it now.' 
               })
            });
        };
    }
    
    
        componentDidMount() {
            const config = {
                apiKey: "AIzaSyDxMy55b41dPdJde0MVjihciaSnF4Nqa5M",
                authDomain: "scrok-9db6b.firebaseapp.com",
                databaseURL: "https://scrok-9db6b.firebaseio.com",
                projectId: "scrok-9db6b",
                storageBucket: "scrok-9db6b.appspot.com",
                messagingSenderId: "362874821502"
              };
              if (!firebase.apps.length) {
                firebase.initializeApp(config);
            } 
    
            const db = firebase.firestore();
            var docRef = db.collection("group").doc("owAZuB0DK3t69vQIamMt");
            let firstRun = true;
            register();
    
            docRef.onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                let newContent = doc.data().content;
                let newImage = doc.data().image;
                let newTitle = doc.data().title;
                handleChange(newTitle, newImage, newContent);
                if (firstRun == false) {
                    sendPushNotificationGroup();
                }
                firstRun = false;
            });
        }
    render() {
        return (
            <ScrollView>
                <View style={style.header}>
                    <Image 
                    style={style.logo}
                    source={require('./logo.jpg')}
                    />
                    <Text style={{color: 'white', marginLeft: 10}}>Group Activities</Text>
                </View>
                <View style={style.content}>
                    <Text style={style.title}>{this.state.title}</Text>
                    <Image 
                    style={style.imageContent}
                    source={{uri: this.state.image}}
                    />
                    <Text
                    style={style.textContent}
                    >
                    {this.state.content}
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://scrok.fi/')}>
                        <Text style={{padding: 20, fontSize: 20, fontWeight: 'bold'}}>
                        https://scrok.fi/
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={style.footer}>
                <Button
                style={{height: 50, width: 200}}
                title="Back to Homepage"
                onPress={() => this.props.navigation.navigate('Homepage')}
                />
                </View>
            </ScrollView>
        );
    }
}
