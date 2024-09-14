import React, {useRef, useMemo, useCallback, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import Card from '../components/card';
import AnimatedPieChart from '../components/pieChart';
import Timer from '../components/timer';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

function HomePage(): React.JSX.Element {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sheetIndex, setSheetIndex] = useState<number>(0);

  const data = [
    {
      id: '1',
      title: 'Calories(Kcal)',
      percentage: '500',
      fullNumber: '1000',
      metric1: 'steps',
      value1: '8645 Km',
      metric2: 'Distance',
      value2: '3.8 Km',
    },
    {
      id: '2',
      title: 'Timer',
    },
  ];

  const arrData = [
    {
      id: '1',
      img: require('../images/yoga.png'),
      title: 'Yoga',
    },
    {
      id: '2',
      img: require('../images/strength.png'),
      title: 'Strength',
    },
    {
      id: '3',
      img: require('../images/cardio.png'),
      title: 'Cardio',
    },
    {
      id: '4',
      img: require('../images/cycling.png'),
      title: 'Cycling',
    },
  ];

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['55%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const renderCard = ({item}: any) => {
    return (
      <Card isWidth>
        {item.title !== 'Timer' ? (
          <>
            <Text style={styles.titleText}>{item.title}</Text>
            <View style={styles.contentContainer}>
              <View style={styles.pieChartContainer}>
                <AnimatedPieChart
                  percentage={Number(item.percentage)}
                  fullNumber={Number(item.fullNumber)}
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.metricText}>{item.metric1}</Text>
                <Text style={styles.valueText}>{item.value1}</Text>
                <Text style={styles.metricText}>{item.metric2}</Text>
                <Text style={styles.valueText}>{item.value2}</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={{height: '100%'}}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Timer />
          </View>
        )}
      </Card>
    );
  };

  const handleCardPress = (id: string) => {
    // Update the selected item when a card is clicked
    setSelectedItem(id);
  };

  const renderCardDetails = ({item}: any) => {
    const isSelected = item.id === selectedItem;
    return (
      <Card cardStyle={styles.cardContainer} isWidth={false}>
        <Pressable onPress={() => handleCardPress(item.id)}>
          <View
            style={[
              styles.cardContentContainer,
              {backgroundColor: isSelected ? '#FFFFFF' : '#4A4A4A'},
            ]}>
            <Image source={item.img} style={styles.cardImage} />
            <Text style={styles.cardTitleText}>{item.title}</Text>
          </View>
        </Pressable>
      </Card>
    );
  };

  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <Image
          source={require('../images/Welcome.png')}
          style={styles.welcomeImage}
        />

        <FlatList
          data={data}
          renderItem={renderCard}
          keyExtractor={item => item.id}
          horizontal
          snapToInterval={width * 0.85}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          style={{marginTop: '5%'}}
        />

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{backgroundColor: '#020810'}}
          style={{borderTopRightRadius: 8, borderTopLeftRadius: 8}}
          onChange={handleSheetChanges}>
          <View style={styles.bottomSheetContent}>
            <Image
              source={
                sheetIndex === 0
                  ? require('../images/arrowUp.png')
                  : require('../images/arraowDown.png')
              }
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: '#fff',
                position: 'absolute',
                top: 0,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
              }}>
              <FlatList
                data={arrData}
                renderItem={renderCardDetails}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={{paddingVertical: 10}}
                showsHorizontalScrollIndicator={false}
                style={{marginTop: '5%'}}
              />
            </View>
            <View
              style={{
                backgroundColor: '#161B22',
                height: 250,
                width: '90%',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '15%',
              }}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  paddingHorizontal: '4%',
                  height: '100%',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    marginTop: '5%',
                    fontSize: 28,
                    fontWeight: '400',
                  }}>
                  Yoga
                </Text>
                <Text
                  style={{color: '#FFFFFF', fontSize: 28, fontWeight: '400'}}>
                  Session
                </Text>
                <Text
                  style={{
                    color: '#FFFFFF',
                    marginTop: '5%',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  30 <Text style={{fontSize: 15}}>mins</Text>
                </Text>
                <Text
                  style={{color: '#FFFFFF', fontSize: 15, fontWeight: '300'}}>
                  Duration
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column', width: '85%'}}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginTop: '5%',
                      }}>
                      250 <Text style={{fontSize: 15}}>kcal</Text>
                    </Text>

                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 15,
                        fontWeight: '300',
                      }}>
                      Calories
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                    }}>
                    <Image
                      source={require('../images/play.png')}
                      style={{
                        width: 64,
                        height: 64,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  titleText: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: '4%',
  },
  pieChartContainer: {
    flex: 0.5,
  },
  detailsContainer: {
    alignSelf: 'center',
    paddingHorizontal: '5%',
    flex: 0.5,
    lineHeight: 20,
  },
  metricText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  welcomeImage: {
    marginTop: '8%',
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetText: {
    fontSize: 20,
    color: '#000',
  },
  cardContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    // backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    // height: '100%',
    borderRadius: 28,
    paddingVertical: 6,
  },
  cardImage: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  cardContainer: {
    marginHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
});

export default HomePage;
