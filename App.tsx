import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const App = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);


  // variables
  const snapPoints = useMemo(() => ["0%", '100%'], []);

  const [snapPointIndex, setSnapPointIndex] = useState(0);
  const toggleSheet = () => {
    const otherSnapPoint = snapPointIndex === 0 ? 1 : 0;
    // console.warn('toggleSheet from: ', snapPointIndex, "to: ", otherSnapPoint)
    setSnapPointIndex(otherSnapPoint);
  }

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.warn('handleSheetChanges', index, snapPointIndex);
    if (index === 0) {
      setSnapPointIndex(index);
    }
  }, [snapPointIndex]);

  bottomSheetRef.current?.snapTo(snapPointIndex);

  // renders
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={toggleSheet}
      >
        <Text>Toggle Sheet</Text>
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
          <TouchableOpacity
            style={styles.button}
            onPress={toggleSheet}
          >
            <Text>Toggle Sheet</Text>
          </TouchableOpacity>
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
