import React, {Component} from 'react';
import {Linking, Button, TouchableOpacity, Image, ScrollView, View, Text } from'react-native';
import style from '../style/style';
import * as firebase from 'firebase';
import 'firebase/firestore';



export default class Grouppage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        };

        handleChange = (newTitle, newContent) => {
            return this.setState({
                title: newTitle,
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
        var docRef = db.collection("gym").doc("BfMrKFL270yFqljpiqaN");

        docRef.get().then(function(doc) {
            console.log("Document data:", doc.data().content);
            const newContent = doc.data().content;
            const newTitle = doc.data().title;
            handleChange(newTitle, newContent);
        });

        docRef.onSnapshot(function(doc) {
            console.log("Current data: ", doc.data());
            let newContent = doc.data().content;
            let newTitle = doc.data().title;
            handleChange(newTitle, newContent);
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
                    <Text style={{color: 'white', marginLeft: 10}}>Gym Activities</Text>
                </View>
                <View style={style.content}>
                    <Text style={style.title}>{this.state.title}</Text>
                    <Image 
                    style={style.imageContent}
                    source={require('./logo.jpg')}
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

