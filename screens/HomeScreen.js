// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   View,
//   Platform
// } from 'react-native';
// import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';

// export default class HomeScreen extends Component {

//   static navigationOptions = {
//     title: 'New York',
//   };

//   state = {
//     initialPosition: {
//       latitude: 40.7143,
//       longitude: -74.0042,
//       latitudeDelta: 0.09,
//       longitudeDelta: 0.035
//     }
//   }

//   points = [
//     { latitude: 40.7828, longitude: -74.0065, weight: 1 },
//     { latitude: 41.7121, longitude: -74.0042, weight: 1 },
//     { latitude: 40.7102, longitude: -75.0060, weight: 1 },
//     { latitude: 40.7123, longitude: -74.0052, weight: 1 },
//     { latitude: 40.7032, longitude: -74.0042, weight: 1 },
//     { latitude: 40.7198, longitude: -74.0024, weight: 1 },
//     { latitude: 41.7223, longitude: -74.0053, weight: 1 },
//     { latitude: 40.7181, longitude: -74.0042, weight: 1 },
//     { latitude: 40.7124, longitude: -74.0023, weight: 1 },
//     { latitude: 40.7648, longitude: -74.0012, weight: 1 },
//     { latitude: 41.7128, longitude: -74.0027, weight: 1 },
//     { latitude: 40.7223, longitude: -74.0153, weight: 1 },
//     { latitude: 40.7193, longitude: -74.0052, weight: 1 },
//     { latitude: 40.7241, longitude: -75.0013, weight: 1 },
//     { latitude: 41.7518, longitude: -74.0085, weight: 1 },
//     { latitude: 40.7599, longitude: -74.0093, weight: 1 },
//     { latitude: 41.7523, longitude: -74.0021, weight: 1 },
//     { latitude: 40.7342, longitude: -74.0152, weight: 1 },
//     { latitude: 40.7484, longitude: -75.0042, weight: 1 },
//     { latitude: 40.7929, longitude: -75.0023, weight: 1 },
//     { latitude: 40.7292, longitude: -74.0013, weight: 1 },
//     { latitude: 40.7940, longitude: -74.0048, weight: 1 },
//     { latitude: 40.7874, longitude: -74.0052, weight: 1 },
//     { latitude: 40.7824, longitude: -74.0024, weight: 1 },
//     { latitude: 40.7232, longitude: -74.0094, weight: 1 },
//     { latitude: 41.7342, longitude: -74.0152, weight: 1 },
//     { latitude: 41.7484, longitude: -74.0012, weight: 1 },
//     { latitude: 41.7929, longitude: -74.0073, weight: 1 },
//     { latitude: 41.7292, longitude: -74.0013, weight: 1 },
//     { latitude: 41.7940, longitude: -74.0058, weight: 1 },
//     { latitude: 41.7874, longitude: -74.0352, weight: 1 },
//     { latitude: 41.7824, longitude: -74.0024, weight: 1 },
//     { latitude: 41.7232, longitude: -74.0094, weight: 1 },
//     { latitude: 41.0342, longitude: -75.0152, weight: 1 },
//     { latitude: 41.0484, longitude: -75.0012, weight: 1 },
//     { latitude: 41.0929, longitude: -75.0073, weight: 1 },
//     { latitude: 41.0292, longitude: -74.0013, weight: 1 },
//     { latitude: 41.0940, longitude: -74.0068, weight: 1 },
//     { latitude: 41.0874, longitude: -74.0052, weight: 1 },
//     { latitude: 41.0824, longitude: -74.0024, weight: 1 },
//     { latitude: 41.0232, longitude: -74.0014, weight: 1 }
//   ];

//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           provider={PROVIDER_GOOGLE}
//           ref={map => this._map = map}
//           style={styles.map}
//           initialRegion={this.state.initialPosition}>
//           <Heatmap
//             points={this.points}
//             radius={40}
//             opacity={1}
//             gradient={{
//               colors: ["black", "purple", "red", "orange", "white"],
//               startPoints: Platform.OS === 'ios' ? [0.01, 0.04, 0.1, 0.45, 0.5] :
//                 [0.1, 0.25, 0.5, 0.75, 1],
//               colorMapSize: 2000
//             }}
//           >
//           </Heatmap>
//         </MapView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject
//   }
// });


import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Platform,
  Dimensions
} from 'react-native';
import * as firebase from "firebase";
import 'firebase/firestore';
import { config, settings } from "../config/firestore";
import MapView,
{ PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle }
  from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';

firebase.initializeApp(config);
const firestore = firebase.firestore();
firestore.settings(settings);

export default class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Barcelona',
  };

  generateIconCache = {};

  generateIcon(number, callback) {
    if (generateIconCache[number] !== undefined) {
      callback(generateIconCache[number]);
    }

    var fontSize = 16,
      imageWidth = imageHeight = 35;

    if (number >= 1000) {
      fontSize = 10;
      imageWidth = imageHeight = 55;
    } else if (number < 1000 && number > 100) {
      fontSize = 14;
      imageWidth = imageHeight = 45;
    }

    var svg = d3.select(document.createElement('div')).append('svg')
      .attr('viewBox', '0 0 54.4 54.4')
      .append('g')

    var circles = svg.append('circle')
      .attr('cx', '27.2')
      .attr('cy', '27.2')
      .attr('r', '21.2')
      .style('fill', '#2063C6');

    var path = svg.append('path')
      .attr('d', 'M27.2,0C12.2,0,0,12.2,0,27.2s12.2,27.2,27.2,27.2s27.2-12.2,27.2-27.2S42.2,0,27.2,0z M6,27.2 C6,15.5,15.5,6,27.2,6s21.2,9.5,21.2,21.2c0,11.7-9.5,21.2-21.2,21.2S6,38.9,6,27.2z')
      .attr('fill', '#FFFFFF');

    var text = svg.append('text')
      .attr('dx', 27)
      .attr('dy', 32)
      .attr('text-anchor', 'middle')
      .attr('style', 'font-size:' + fontSize + 'px; fill: #FFFFFF; font-family: Arial, Verdana; font-weight: bold')
      .text(number);

    var svgNode = svg.node().parentNode.cloneNode(true),
      image = new Image();

    d3.select(svgNode).select('clippath').remove();

    var xmlSource = (new XMLSerializer()).serializeToString(svgNode);

    image.onload = (function (imageWidth, imageHeight) {
      var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        dataURL;

      d3.select(canvas)
        .attr('width', imageWidth)
        .attr('height', imageHeight);

      context.drawImage(image, 0, 0, imageWidth, imageHeight);

      dataURL = canvas.toDataURL();
      generateIconCache[number] = dataURL;

      callback(dataURL);
    }).bind(this, imageWidth, imageHeight);

    image.src = 'data:image/svg+xml;base64,' + btoa(encodeURIComponent(xmlSource).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }


  _getNormalData = () => {


    const normalDatabseRef = firestore.collection("markers").doc("lBulS2oSNrpFPiH7wcIe").collection("Barcelona");

    console.log('Is entering here??', normalDatabseRef)

    normalDatabseRef.get().then(snapshot => {

      snapshot.forEach(doc => {
        if (typeof doc.data().name && typeof doc.data().name === "string") {
          if (doc.exists) {
            console.log('THE DATA IS--->', doc.data())
            let coordinatesFirebase = {
              name: doc.data().name,
              latitude: doc.data().location.latitude,
              longitude: doc.data().location.longitude,
              image: doc.data().image,
              type: doc.data().type
            };
            this.setState({ coordinates: [...this.state.coordinates, coordinatesFirebase] })
          }
          else console.log('El documento no existe');
          console.log('-----------------------------------------------');
        }
      });

    });


  }


  state = {
    markers: [],
    coordinates: [
      // { name: 'Catedral de la santa cruz', latitude: 41.3841522663854, longitude: 2.175972757426706, image: require('../assets/burger.jpg') },
      // { name: 'casa del arcediano', latitude: 41.384040430254366, longitude: 2.1758317650066337, image: require('../assets/pizza.jpg') },
      // { name: 'plaça nova', latitude: 41.384194494284216, longitude: 2.175414626315999, image: require('../assets/soup.jpg') },
      // { name: 'capilla de santa lucía', latitude: 41.38386442752312, longitude: 2.1756805635722087, image: require('../assets/sushi.jpg') },
      // { name: 'plaza de sant felip neri', latitude: 41.38332577451091, longitude: 2.1751691578184262, image: require('../assets/curry.jpg') },
      // { name: 'carrer de sant sever', latitude: 41.382919450903074, longitude: 2.1751407017976625, image: require('../assets/curry.jpg') },
      // { name: 'plaza del pi', latitude: 41.38248889075456, longitude: 2.1740765775006734, image: require('../assets/curry.jpg') },
      // { name: 'placeta del pi', latitude: 41.38182200153946, longitude: 2.174273942077211, image: require('../assets/curry.jpg') },
      // { name: 'carrer dels cecs de la boqueria', latitude: 41.38188214086193, longitude: 2.1747088450947296, image: require('../assets/curry.jpg') },

    ]
  }

  componentDidMount() {
    this.requestLocationPermission();
    this._getNormalData();
  }

  showWelcomeMessage = () =>
    Alert.alert(
      'Welcome to San Francisco',
      'The food is amazing',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Ok'
        }
      ]
    )

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  }

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));

        // let initialPosition = {
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   latitudeDelta: 0.09,
        //   longitudeDelta: 0.035
        // }

        let initialPosition = {
          latitude: 41.3851,
          longitude: 2.1734,
          latitudeDelta: 0.001,
          longitudeDelta: 0.01
        }

        this.setState({ initialPosition });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }

  onCarouselItemChange = (index) => {
    let location = this.state.coordinates[index];

    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    })

    this.state.markers[index].showCallout()
  }



  onMarkerPressed = (location, index) => {
    console.log('what is index and location???', index, location )
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    });

    this._carousel.snapToItem(index);
  }

  renderCarouselItem = ({ item }) =>
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Image
        style={styles.logo}
        source={{ uri: item.image }}
        style={{ height: 35, width: 35 }}
      />
    </View>

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this._map = map}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={this.state.initialPosition}>

          {/* <Polygon
            coordinates={this.state.coordinates}
            fillColor={'rgba(100, 100, 200, 0.3)'}
          /> */}
          {/* <Circle
            center={{ latitude: 41.3841522663854, longitude: 2.175972757426706 }}
            radius={100}
            fillColor={'rgba(200, 300, 200, 0.5)'}
          /> */}
          {this.state.coordinates.map((marker, index) => (
            <>
              <Marker
                key={marker.name}
                ref={ref => this.state.markers[index] = ref}
                onPress={() => this.onMarkerPressed(marker, index)}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              >
                {/* <Callout>
                    <Text>{this.state.nameMarker}</Text>
                  </Callout> */}

                <Image
                  style={styles.logo}
                  source={{ uri: marker.image }}
                  style={{ height: 35, width: 25 }}
                />
              </Marker>
            </>
          ))
          }


        </MapView>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.coordinates}
          containerCustomStyle={styles.carousel}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
          removeClippedSubviews={false}
          onSnapToItem={(index) => this.onCarouselItemChange(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 200,
    width: 300,
    padding: 24,
    borderRadius: 24
  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center'
  }
});