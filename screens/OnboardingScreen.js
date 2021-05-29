import React from 'react'
import { StyleSheet,Image} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'



const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        onSkip={()=>navigation.replace('Login')}
        onDone={()=>navigation.navigate('Login')}
        pages={[
          {
            
            backgroundColor: '#A92C9A',
            image: <Image source={require('../assets/1.gif')} style={{height:300,width:'100%'}} />,
            title: 'İş bulmanın en kolay yolu!',
            subtitle:''
            
          },
          {
            backgroundColor: '#fdeb93',
            image: <Image source={require('../assets/2.gif')} style={{height:300,width:'100%'}} />,
            title: 'İşveren ve İşçi için anlık iletişim!',
            subtitle:''
          },
          {
            backgroundColor: '#2C60A9',
            image: <Image source={require('../assets/3.jpeg')} style={{height:300,width:'100%'}} />,
            title: 'Hemen Sağa Kaydır! Ve tadını çıkar!',
            subtitle:''

          },
        ]}
      />
    )
}

export default OnboardingScreen