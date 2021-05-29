import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {windowHeight,windowWidth} from '../utils/Dimentions'


const FormButton = ({buttonTitle, ...rest}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}

export default FormButton

const styles = StyleSheet.create({
    buttonContainer:{
        marginTop:10,
        width:'100%',
        height:windowHeight/15,
        backgroundColor:'#C70039',
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',

    }
})
