import React, {Component} from 'react';
import {Linking, Button, TouchableOpacity, Image, ScrollView, View, Text } from'react-native';
import style from '../style/style';

export default class Grouppage extends Component {
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
                    <Text style={style.title}>Title</Text>
                    <Image 
                    style={style.imageContent}
                    source={require('./logo.jpg')}
                    />
                    <Text
                    style={style.textContent}
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare fringilla eros, ac venenatis risus ullamcorper at. Mauris congue sagittis vulputate. Nam sem sem, interdum sed luctus vitae, aliquet in quam. Ut pulvinar enim in leo bibendum laoreet. Quisque rhoncus a quam eu molestie. Ut interdum pretium nisi a molestie. Nunc non mollis nisi. Maecenas consectetur sapien quis leo bibendum sagittis. Nunc cursus massa et gravida hendrerit. Praesent molestie erat et pretium placerat. Nunc id varius orci. Proin pellentesque ex felis, sagittis pellentesque massa lobortis quis. Sed vel lacus blandit, semper metus et, vehicula tellus. Quisque ut nibh risus</Text>
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
