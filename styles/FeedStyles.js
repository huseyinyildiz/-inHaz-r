import styled from 'styled-components'

export const Container= styled.View`
    flex:1;
    background-color:#000000;
    padding:20px;
`;

export const Card=styled.View`
    background-color:#E7CD1B;
    width:100%;
    margin-bottom:20px;
    border-radius:10px;
`;

export const UserInfo=styled.View`
    flex-direction:row;
    justify-content:flex-start;
    padding:15px;
`;

export const UserImg = styled.Image`
    width:50px;
    height:50px;
    border-radius:25px;
`;

export const UserInfoText=styled.View`
    flex-direction:column;
    justify-content:center;
    margin-left:10px;
`;

export const UserName=styled.Text`
    font-size:14px;
    font-weight:bold;
    
`;


export const PostTime=styled.Text`
    font-size:12px;
    color:#666;
`;

export const PostText=styled.Text`
    font-size:14px;
    padding-left:15px;
    padding-right:15px;
`;

export const PostImg=styled.Image`
   width:100%;
   height:250px;
   margin-top:15px;
`;

export const Divider=styled.View`
    border-bottom-color:#ddd;
    border-bottom-width:1px;
    width:90%;
    align-self:center;
    margin-top:15px;
`;

export const InteractionWrapper=styled.View`
    flex-direction:row;
    justify-content:space-around;
    padding:15px;
`;

export const Interaction = styled.TouchableOpacity`
flex-direction:row;
justify-content:center;
border-radius:5px;
padding:2px 5px;
background-color: ${props=>props.active ? '#ddd': 'transparent'}
`;

export const InteractionText=styled.Text`
   font-size:12px;
   font-weight:bold;
   color:#333;
   color: ${props=>props.active ? '#2e64e5':'#333'}
   margin-top: 5px;
   margin-left:5px;
`;