import React, { useEffect, useState } from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/OnboardingScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

const Stack=createStackNavigator()

const AuthStack = () => {
    const [isFirstLaunch,setIsFirstLaunch]=useState(null);
    let routName;  
    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched')
        .then(value=>{
            if(value==null){
                AsyncStorage.setItem('alreadyLaunched','true')
                setIsFirstLaunch(true)
            }
            else{
                setIsFirstLaunch(false)
            }
            })
    }, [])

    if(isFirstLaunch===null){
        return null
    }
    else if(isFirstLaunch==true){
        routName='Onboarding'
    }else{
        routName='Login'
    }


    return (
        <Stack.Navigator initialRouteName={routName}>
            <Stack.Screen 
                name="Onboarding"
                component={OnboardingScreen}
                options={{header: ()=>null}}/>
            <Stack.Screen 
                name="Login"
                component={LoginScreen}
                options={{header: ()=>null}}/> 
            <Stack.Screen name="Signup" component={SignupScreen} 
            options={({navigation})=>({
                title:'',
                headerStyle:{
                    backgroundColor:'#f9fafd',
                    shadowColor:'#f9fafd',
                    elevation:0
                },
                
            })} /> 
        </Stack.Navigator>
    )
  
}

export default AuthStack


