import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList, Alert, SafeAreaView } from 'react-native'
import PostCard from '../components/PostCard';
import firestore from '@react-native-firebase/firestore';
import { Container } from '../styles/FeedStyles'
import storage from '@react-native-firebase/storage';




const HomeScreen = ({navigation}) => {
  
  
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleted, setDeleted] = useState(false)


  const fetchPosts=async ()=>{
    try{
      const list=[];

      await firestore()
      .collection('posts')
      .orderBy('postTime','desc')
      .get()
      .then((querySnapshot)=>{
        //  console.log('Total Posts:',querySnapshot.size);
        querySnapshot.forEach((doc)=>{
          const {userId,post,postImg,postTime,likes,comments} = doc.data();
          list.push({
            id: doc.id,
            userId,
            userName: 'Test Name',
            userImg: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' ,
            postTime: postTime,
            post,
            postImg,
            liked: false,
            likes,
            comments,
          })
        })
      })

      
      setPosts(list);

      if(loading){
        setLoading(false);
      }
      console.log('Posts :',posts);

    } catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    fetchPosts();
    setLoading(true)
  }, [loading]) ;
  
  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete=(postId)=>{
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text:'Cancel',
          onPress:()=>console.log('Cancel Pressed'),
          style:'cancel'
        },
        {
          text:'Confirm',
          onPress:()=>deletePost(postId),
        },
      ],
      {cancelable:false},
    )
  }

  const deletePost =(postId)=>{
    console.log('Current Post Id: ',postId);

    firestore()
    .collection('posts')
    .doc(postId)
    .get()
    .then(documentSnapshot =>{
      if(documentSnapshot.exists){
        const {postImg}=documentSnapshot.data();

        if(postImg!=null){
          const storageRef=storage().refFromURL(postImg);
          const imageRef =storage().ref(storageRef.fullPath);

          imageRef
          .delete()
          .then(()=>{
            console.log(`${postImg} has been deleted succesfully.`);
            deleteFirestoreData(postId);
          })
          .catch((e)=>{
            console.log('Error while deleting the image',e);
          })
          //eğer post ta image yoksa
        }else{
            deleteFirestoreData(postId);
        }
      }
    })
  }

  const deleteFirestoreData =(postId)=>{
    firestore()
    .collection('posts')
    .doc(postId)
    .delete()
    .then(()=>{
      Alert.alert(
        'İlan Silindi'
        
      )
      setDeleted(true);
    })
    .catch(e=>console.log('İlan silinirken hata oluştu!',e))
  }


  const ListHeader=()=>{
    return null;
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <Container>
        <FlatList 
          data={posts}
          renderItem={({item}) => <PostCard item={item} onDelete={handleDelete} onPress={()=>navigation.navigate('Profile',{userId:item.userId})}/>}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListHeader}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </SafeAreaView>
  )
}

export default HomeScreen


