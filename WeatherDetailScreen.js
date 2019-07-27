import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';


export default class WeatherDetailScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
return {
   title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
};
  };


  constructor(props) {

    super(props);

    this.state = {

      isLoading: true,

    };

  }

  componentDidMount() {

    const { navigation } = this.props;
    const city = navigation.getParam('city', null);
    //const city = 'Daejeon';

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6be3be648c795ee8faadb5bf2e84b4d8`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let humidity = this.state.main.humidity;


    return (
      <View style={styles.container}>
        <Text> 온도: {celsius.toFixed(1)}℃</Text>
        <Text> 습도: {humidity.toFixed(1)}</Text>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
});