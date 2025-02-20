import React,{ useState,useEffect,useContext } from 'react'
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'
import PostCard from '../components/PostCard'


const ProfileScreen = ({navigation,route}) => {
    const {user,logout}=useContext(AuthContext)

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const fetchPosts=async ()=>{
        try{
        const list=[];

        await firestore()
        .collection('posts')
        .where('userId','==' ,route.params ? route.params.userId : user.uid)
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

    const getUser = async() => {
        await firestore()
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
        fetchPosts();
        navigation.addListener('focus',()=>setLoading(!loading))
    }, [navigation,loading]) ;

    useEffect(() => {
        fetchPosts();
        setDeleted(false);
      }, [deleted]);
    
      const handleDelete=(postId)=>{
        Alert.alert(
          'İlan silinecek ',
          'Emin misin?',
          [
            {
              text:'İptal',
              onPress:()=>console.log('Cancel Pressed'),
              style:'cancel'
            },
            {
              text:'Onayla',
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

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
                showsVerticalScrollIndicator={false}
            >
                <Image style={styles.userImg} source={{uri: userData ? userData.userImg || 
                    'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' 
                    :'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}/>
                <Text style={styles.userName}>{userData ? userData.fname||'Test' : 'Test'} {userData ? userData.lname||'User' : 'User'}</Text>
                <Text style={styles.aboutUser}>{userData ? userData.about || 'No details added': 'Test' }</Text>
                <View style={styles.userBtnWrapper}>
                    {route.params ? (
                        <>
                            <TouchableOpacity style={styles.userBtn} onPress={()=>{navigation.navigate('Chat')}}>
                                <Text style={styles.userBtnTxt}>Hemen Mesaj At!</Text>
                            </TouchableOpacity>
                        </>
                    ): (
                        <>
                        <TouchableOpacity style={styles.userBtn} onPress={()=>{navigation.navigate('EditProfile')}}>
                            <Text style={styles.userBtnTxt}>Profili Düzenle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.userBtn} onPress={()=>logout()}>
                            <Text style={styles.userBtnTxt}>Çıkış Yap</Text>
                        </TouchableOpacity>
                    </>
                    )}
                   
                </View>
                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>{posts.length}</Text>
                        <Text style={styles.userInfoSubTitle}>İlan</Text>
                    </View>
                </View>
                {posts.map((item)=>(
                    <PostCard key={item.id} item={item} onDelete={handleDelete} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
      },
      userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
      },
      userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#C70039',
        marginTop: 10,
        marginBottom: 10,
      },
      aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color:'#C70039',
        textAlign: 'center',
        marginBottom: 10,
      },
      userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
      },
      userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
      },
      userBtnTxt: {
        color:'#C70039',
      },
      userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
      },
      userInfoItem: {
        justifyContent: 'center',
      },
      userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#C70039',
        marginBottom: 5,
        textAlign: 'center',
      },
      userInfoSubTitle: {
        fontSize: 12,
        color:'#C70039',
        textAlign: 'center',
      },
})