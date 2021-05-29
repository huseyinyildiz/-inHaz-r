import React,{useState,useEffect,useContext,useLayoutEffect,useCallback} from 'react'
import { Button, StyleSheet,  View } from 'react-native'
import {  GiftedChat } from 'react-native-gifted-chat'
import db from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'

const ChatScreen = ({route}) => {
    const [messages, setMessages] = useState([]);
    const {user}=useContext(AuthContext)
    const [userData, setUserData] = useState(user);
  

    const getUser = async() => {
      await db()
      .collection('users')
      .doc(route.params ? route.params.userId:user.uid)
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
  }, []) ;

    useLayoutEffect(() => {
        const uns=db()
        .collection('chats')
        .orderBy('createdAt','desc')
        .onSnapshot(snapshot=>setMessages(
            snapshot.docs.map(doc=>({
            _id:doc.id,
            createdAt:doc.data().createdAt.toDate(),
            text:doc.data().text,
            user:doc.data().user
            }))
        ))
        return uns
    }, [])

  
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat
        .append(previousMessages, messages))
        const {
          _id,
          createdAt,
          text,
          user
        }=messages[0]
        db()
        .collection('chats')
        .add({
          _id,
          createdAt,
          text,
          user
        })
    }, [])
  

    

    return (
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.uid,
          name: userData.fname,
          avatar:userData.userImg
        }}
        alwaysShowSend
      />
    );
  };

export default ChatScreen


const styles=StyleSheet.create({
    iconStyle: {
        fontSize: 30,
        marginBottom:5,
        color: '#333',
      },
      gift:{
        color:'#333'
      }
})
