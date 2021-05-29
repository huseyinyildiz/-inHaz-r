import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Button, StyleSheet, View } from 'react-native'
import AddPostScreen from '../screens/AddPostScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChatScreen from '../screens/ChatScreen'
import FontAwesome, {parseIconFromClassName} from 'react-native-fontawesome';
import MessagesScreen from '../screens/MessagesScreen'
import EditProfileScreen from '../screens/EditProfileScreen'

const plusicon = parseIconFromClassName('fas fa-plus')
const Stack=createStackNavigator()
const Tab=createBottomTabNavigator()

const FeedStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
        name="ISINHAZIR"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#C70039',
            marginTop:15,
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor:'#000000',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerRight:()=>(
              <View style={{marginRight:15}}>
                  <FontAwesome
                    style={styles.iconStyle}
                    icon={plusicon}
                    onPress={() => navigation.navigate('AddPost')}
                    />
              </View>
          )
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#2e64e515',
            shadowColor: '#2e64e515',
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
  
  const MessageStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={ChatScreen} />
     
    </Stack.Navigator>
  );

  const ProfileStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: 'Profili Düzenle',
          headerTitleStyle: {
            color: '#C70039',
            marginTop:1,
            fontSize: 19,
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#000000',
           
            shadowColor: '#fff',
            elevation: 0,
          },

        }}
      />
    </Stack.Navigator>
  );

  const AppStack = () => {
    
    const homeicon = parseIconFromClassName('fas fa-home');
    const messageicon = parseIconFromClassName('fas fa-comment-alt');
    const profileicon = parseIconFromClassName('fas fa-user');
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#2e64e5',
          activeBackgroundColor:'#000000',
          inactiveBackgroundColor:'#000000',
}}>
        <Tab.Screen
          name="Home"
          component={FeedStack}
          options={{
            tabBarLabel: 'Anasayfa',
            tabBarIcon:()=>(
              <FontAwesome
                style={styles.iconStyle}
                icon={homeicon}
              />
            )
          }}
        />
        <Tab.Screen
          name="Chat"
          component={MessageStack}
          options={{
            tabBarIcon:()=>(
              <FontAwesome
                style={styles.iconStyle}
                icon={messageicon}
              />
            )
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfileStack}
          options={{
           
            tabBarIcon:()=>(
              <FontAwesome
                style={styles.iconStyle}
                icon={profileicon}
              />
            )
          }}
        />
      </Tab.Navigator>
    );
  };

export default AppStack


const styles = StyleSheet.create({
  iconStyle: {
       fontSize: 20,
    marginTop: 5,
    color: '#C70039',
  },
});