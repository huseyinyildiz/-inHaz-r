import React,{useContext,useState,useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Card,UserName, Divider, Interaction, InteractionText, InteractionWrapper, PostImg, PostText, PostTime, UserImg, UserInfo, UserInfoText } from '../styles/FeedStyles'
import {AuthContext} from '../navigation/AuthProvider'
import moment from 'moment'
import ProgressiveImage from './ProgressiveImage'
import firestore from '@react-native-firebase/firestore'

const PostCard = ({item,onDelete,onPress}) => {
    const {user,logout}=useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [like, setLike] = useState(0)
    let likeText=item.likes;
    let commentText=item.comments;
    if(like==1){
        likeText='1 Like';
    }else if(like>1){
        likeText=like + ' Likes';
    }else{
        likeText='Like'
    }

    if(item.comments==1){
        commentText='1 Commnet';
    }else if(item.comments>1){
        commentText=item.comments + ' Comments';
    }else{
        commentText='Comment'
    }

    const getUser = async() => {
        await firestore()
        .collection('users')
        .doc(item.userId)
        .get()
        .then((documentSnapshot) => {
        if( documentSnapshot.exists ) {
            console.log('User Data', documentSnapshot.data());
            setUserData(documentSnapshot.data());
        }
        })
    }

    useEffect(() => {
    getUser();
    }, [])


    return (
        <Card>
               <UserInfo>
                   <UserImg source={{uri: userData ? userData.userImg||
                    'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' 
                    : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}/>
                    <UserInfoText>
                        <TouchableOpacity onPress={onPress}>
                            <UserName>{userData ? userData.fname || 'Test' : 'Test'} {userData ? userData.lname || 'User' : 'User'}</UserName>
                        </TouchableOpacity>
                        <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                    </UserInfoText>
               </UserInfo>
               <PostText>{item.post}</PostText>
               {item.postImg != null ? <PostImg source={{uri:item.postImg}} />:<Divider/>}
               


                <InteractionWrapper>
                  
                    {user.uid == item.userId ?
                    <Interaction onPress={()=>onDelete(item.id)}>
                        <InteractionText>Sil</InteractionText>
                    </Interaction>
                    :null
                    }
                </InteractionWrapper>
            </Card>
    )
}

export default PostCard
