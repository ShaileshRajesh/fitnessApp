import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HomePage from '../screens/HomePage';
import Profile from '../screens/Profile';
import Message from '../screens/Message';
import Info from '../screens/Info';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}: any) => (
  <TouchableOpacity style={styles.tabBarButton} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const CustomTabBar = ({state, descriptors, navigation}: any) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, {paddingBottom: bottom}]}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconSource = '';
        if (route.name === 'Home') {
          iconSource = require('../images/home.png');
        } else if (route.name === 'Profile') {
          iconSource = require('../images/profile.png');
        } else if (route.name === 'Message') {
          iconSource = require('../images/message.png');
        } else if (route.name === 'Info') {
          iconSource = require('../images/info.png');
        }

        return (
          <CustomTabBarButton key={index} onPress={onPress}>
            <View style={styles.tabItem}>
              <Image
                source={iconSource}
                style={[styles.tabIcon, isFocused && styles.tabIconActive]}
              />
              {/* <Text style={styles.tabLabel}>{label}</Text> */}
            </View>
          </CustomTabBarButton>
        );
      })}
    </View>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Info" component={Info} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#020810',
    borderTopWidth: 1,
    height: 60,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    borderRadius: 18,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    shadowColor: '#000',
    marginHorizontal: 20,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    alignSelf: 'center',
  },
  tabLabelActive: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  tabIcon: {
    width: 24,
    height: 24,
    tintColor: '#888',
  },
  tabIconActive: {
    tintColor: '#fff',
  },
});

export default BottomTabs;
