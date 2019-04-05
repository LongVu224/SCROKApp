import React, {Component} from 'react';
import {Linking, Button, TouchableOpacity, Image, ScrollView, View, Text } from'react-native';
import style from '../style/style';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Expo, { Permissions, Notifications } from 'expo';

async function register() {
    try {
        let token = await Notifications.getExpoPushTokenAsync();
      
        firebase.firestore().collection("group").doc("MQy9WzZDPBfM10iz0d82").update({token: token});
        }
        catch(error) {
          console.log(error);
    }
}

sendPushNotificationGroup = () => {
    let response = fetch('https://exp.host/--/api/v2/push/send', {
       method: 'POST',
       headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
       } ,
       body: JSON.stringify({
           to:'ExponentPushToken[JOL-UnPK5FJrivGxqV8M0b]',
           sound:'default',
           title: 'SCROK App',
           body:'Group Activities have a news! Check it now.'
       })
    });
};


export default class Grouppage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            content: ''
        };

        handleChange = (newTitle, newImage, newContent) => {
            return this.setState({
                title: newTitle,
                image: newImage,
                content: newContent,
            })
        }
    }
    
    
        componentDidMount() {
            const config = {
                apiKey: "AIzaSyCkRzVwEj3M5Zd1O1LYSGDgKZ6YDPrQ4aI",
                authDomain: "scrok-e9cdc.firebaseapp.com",
                databaseURL: "https://scrok-e9cdc.firebaseio.com",
                projectId: "scrok-e9cdc",
                storageBucket: "scrok-e9cdc.appspot.com",
                messagingSenderId: "229863456822"
              };
              if (!firebase.apps.length) {
                firebase.initializeApp(config);
            } 
    
            const db = firebase.firestore();
            var docRef = db.collection("group").doc("MQy9WzZDPBfM10iz0d82");
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
