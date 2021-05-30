import React,{useState,useContext} from 'react'
import { ActivityIndicator, Alert, Button, FlatList, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import ImagePicker from 'react-native-image-crop-picker'
import { InputWrapper,InputField,AddImage,StatusWrapper,SubmitBtn,SubmitBtnText } from "../styles/AddPost";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider'


const actions = [
    {
      text: "Choose Photo",
      icon: require("../assets/icon/2.jpg"),
      name: "choosePhoto",
      position: 2
    },
    {
      text: "Take Photo",
      icon: require("../assets/icon/3.png"),
      name: "takePhoto",
      position: 1
    },
  ];

const AddPostScreen = () => {
    const {user,logout} = useContext(AuthContext)

    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)
    const [post, setPost] = useState(null)

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width:1200,
            height:780,
            cropping:true,
        }).then((image)=>{
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        })
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width:1200,
            height:780,
            cropping:true,
        }).then((image) => {
            console.log(image);
            const imageUri=Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        })
    }

    const submitPost= async () => {
        const imageUrl = await uploadImage();
        console.log('Image Url',imageUrl);
        console.log('Post: ',post );

        firestore()
        .collection('posts')
        .add({
            userId:user.uid,
            post:post,
            postImg:imageUrl,
            postTime:firestore.Timestamp.fromDate(new Date()),
            likes:null,
            comments:null,
        })
        .then(()=>{
            console.log('Post Added');
            Alert.alert(
                'İlanın Yayında!',
                'İlanınız başarıyla paylaşılmıştır!',
            )
            setPost(null);
        })
        .catch((e)=>{
            console.log('Veritabanına yüklerken ufak bir hata olustu',e)
        })
    }

    const uploadImage = async ()=>{
        if(image === null){
            return null;
        }
        const uploadUri =image;
        let filename=uploadUri.substring(uploadUri.lastIndexOf('/')+1);
        
        const extension=filename.split('.').pop();
        const name=filename.split('.').slice(0,-1).join('.');
        filename=name+Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);
        
        const storageRef=storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', (taskSnapshot) => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
         
            setTransferred(
               Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *100,
            );
        });

        try{
            await task;

            const url = await storageRef.getDownloadURL();

            setUploading(false);
            setImage(false);
            //Alert.alert(
            //    'Image uploaded',
             //   'Image has been uploaded to Firebase Cloud Storage Successfully!'
           // )
            return url;
        } catch(e){
            console.log(e);
            return null;
        }
        
    }

    return (
        <>
        <ScrollView style={styles.container}>
            <InputWrapper>
                {image != null ? <AddImage source={{uri : image}}/> : null}
                <InputField
                    placeholder="İlan vermek ister misin? (Şirket ve Adres bilgilerinizi yazmayı unutmayınız.) "
                    multiline
                    numberOfLines={4}
                    value={post}
                    onChangeText={(content)=>setPost(content)}
                />

                {uploading ? (
                    <StatusWrapper>
                        <Text>{transferred} % Tamamlandı!</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </StatusWrapper>
                ) : (
                    <SubmitBtn onPress={submitPost}>
                        <SubmitBtnText>Gönder</SubmitBtnText>
                    </SubmitBtn>
                )}
            </InputWrapper>
            
        </ScrollView>
        <FloatingAction
                
                actions={actions}
                onPressItem={takePhotoFromCamera} 
            />
            <FloatingAction
                actions={actions}
                onPressItem={choosePhotoFromLibrary} 
            />
        </>
    )
}

export default AddPostScreen

const styles = StyleSheet.create({
    container:{
        marginTop:70,
        flex:1,
        
       
    },
    
})
