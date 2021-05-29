import React,{useState,useContext} from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import SocialButton from '../components/SocialButton'
import { AuthContext } from '../navigation/AuthProvider'


const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    
    const {register}= useContext(AuthContext)
    
    return (
        <View style={styles.container}>
            
            <Text style={styles.text}>Hesap Oluştur</Text>
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
                placeholderText="Şifre giriniz"
                secureTextEntry={true}
            />
            <FormInput 
                labelValue={confirmPassword}
                onChangeText={(userPassword)=>setPassword(userPassword)}
                placeholderText="Şifrenizi tekrar giriniz."
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle="Kayıt Ol"
                onPress={()=>register(email,password)}
            />
             
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>Kayıt olduğunuzda, kullanım koşullarımızı kabul etmiş sayılırsınız.</Text>
                <TouchableOpacity onPress={()=>alert('Terms clicked')}>
                    <Text style={[styles.color_textPrivate,{color:'#e88832'}]}>Kullanım Koşulları</Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}>and</Text>
                <Text style={[styles.color_textPrivate,{color:'#e88832'}]}>Gizlilik Politikası</Text>
            </View>

           

            <TouchableOpacity style={styles.navButton} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Hesabınız var mı? Giriş yapın!</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignupScreen

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
    },
    navButton:{
        marginTop:15
    },
    navButtonText:{
        fontSize:18,
        fontWeight:'500',
        color:'#2e64e5'
    },
    textPrivate:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginVertical:35,
        justifyContent:'center'
    },
    color_textPrivate:{
        fontSize:13,
        fontWeight:'400',
        color:'grey'
    }
})
/* <SocialButton 
                buttonTitle="Sign Up with Facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={()=>{}}
            />
             <SocialButton 
                buttonTitle="Sign Up with Google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={()=>{}}
            />*/