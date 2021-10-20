/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import Draggable from 'react-native-draggable';
import DropDownPicker from 'react-native-dropdown-picker';

global.loc = {};
const App = props => {
  const squareRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [viewLocation, setViewlocation] = useState({});
  const [value, setValue] = useState('square');
  const [items, setItems] = useState([
    {label: 'Square', value: 'square'},
    {label: 'Circle', value: 'circle'},
  ]);

  const doMeasure = () => {
    let temp = {};
    squareRef.current.measure((width, height, px, py, fx, fy) => {
      console.log('px', viewLocation.fx);
      const location = {
        fx: fx - viewLocation.fx,
        fy: fy - viewLocation.fy,
        rx: px + fx - viewLocation.fx,
        ry: fy - viewLocation.fy,
        qx: fx - viewLocation.fx,
        qy: py + fy - viewLocation.fy,
        px: px + fx - viewLocation.fx,
        py: py + fy - viewLocation.fy,
      };
      // setCoordinates(location);
      console.log('location', location);
      global.loc = location;
    });

    console.log(global.loc);
    // setCoords(temp);
  };
  const doMeasureView = () => {
    squareRef.current.measure((width, height, px, py, fx, fy) => {
      const location = {
        fx: fx,
        fy: fy,
        px: px,
        py: py,
      };
      setViewlocation(location);
      console.log('Image Location', location);
    });
  };
  const shape = value === 'square' ? styles.square : styles.circle;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 0.2,
          alignSelf: 'center',
          width: 300,
          marginRight: 50,
          marginTop: 50,
          zIndex: 10,
        }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          height: 300,
          width: 300,
          backgroundColor: 'blue',
          marginLeft: 50,
          marginTop: 70,
        }}
        onLayout={() => doMeasureView()}>
        <ImageBackground
          source={{
            uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20200711092856/lena.jpg',
          }}
          style={styles.tinyLogo}
          resizeMode="contain">
          <Draggable
            onDrag={() => doMeasure()}
            minX={0}
            minY={0}
            maxX={300}
            maxY={300}>
            <View
              {...props}
              ref={squareRef}
              // onLayout={() => doMeasure()}
              style={shape}
            />
          </Draggable>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  logo: {
    width: 66,
    height: 58,
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'red',
    position: 'relative',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 3,
    borderColor: 'black',
    position: 'relative',
  },
});

export default App;
