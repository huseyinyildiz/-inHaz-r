import React,{useState,useContext} from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import SocialButton from '../components/SocialButton'
import { AuthContext } from '../navigation/AuthProvider'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    
    const {login}=useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/indir.jpg')}
                style={styles.logo}
            />
            <Text style={styles.text}>ISINHAZIR</Text>
            <FormInput 
                labelValue={email}
                onChangeText={(userEmail)=>setEmail(userEmail)}
                placeholderText="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput 
                labelValue={password}
                onChangeText={(userPassword)=>setPassword(userPassword)}
                placeholderText="Sifre"
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle="Giris Yap"
                onPress={()=> login(email,password)}
            />
            <TouchableOpacity style={styles.forgotButton} onPress={()=>{}}>
                <Text style={styles.navButtonText}>Sifrenizi mi unuttunuz?</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.forgotButton} onPress={()=>navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>Hemen Kayıt Ol!</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f9fafd',
        padding:20
       
    },text:{
        fontSize:28,
        marginBottom:10,
        color:'#051d5f'
    },logo:{
        height:150,
        width:150,
        resizeMode:'cover'
    },
    navButton:{
        marginTop:15
    },
    forgotButton:{
        marginVertical:15
    },
    navButtonText:{
        fontSize:18,
        fontWeight:'500',
        color:'#2e64e5'
    },
})


/*<SocialButton 
                buttonTitle="Sign in with Facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={()=>{}}
            />
             <SocialButton 
                buttonTitle="Sign in with Google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={()=>{}}
            />*/