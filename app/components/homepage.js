import React from 'react';
import { Button, View, Text, Picker } from 'react-native';
import Expo, { Permissions, Notifications } from 'expo';

async function register() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }
}


export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: 'Categories'
        }
    }

    async componentWillMount() {
      await register();
    }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Choose category</Text>
        <Picker
            selectedValue={this.state.categories}
            style={{height: 50, width: 200}}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({categories: itemValue})
            }>
            <Picker.Item label="Categories" value="Categories"/>
            <Picker.Item label="Gym" value="Gympage" />
            <Picker.Item label="Group" value="Grouppage" />
        </Picker>
        <Button
          title="Go to Category Page"
          onPress={() => this.props.navigation.navigate(this.state.categories)}
        />
      </View>
    );
  }
}