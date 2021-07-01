import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const App = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);


  // variables
  const snapPoints = useMemo(() => ['20%', '70%'], []);

  const [snapPointIndex, setSnapPointIndex] = useState(0);
  const toggleSheet = () => {
    console.log('toggleSheet')
    setSnapPointIndex(snapPointIndex === 0 ? 1 : 0);
  }

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index, snapPointIndex);
  }, [snapPointIndex]);

  bottomSheetRef.current?.snapTo(snapPointIndex);

  // renders
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={toggleSheet}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={snapPointIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animateOnMount
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <Text>{snapPointIndex === 0 ? "closed" : "open"}</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: 'gray',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#841584",
    padding: 10
  },
});

export default App;
