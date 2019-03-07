import React from 'react';
import { Button, View, Text, Picker } from 'react-native';

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: 'Categories'
        }
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
            <Picker.Item label="Categories" />
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