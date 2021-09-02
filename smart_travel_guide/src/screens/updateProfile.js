import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert,ScrollView,Modal } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
// import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';
import { AppContext } from '../context/AppContext';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";


export const  UpdateProfile=(props)=> {



  const {state, dispatch}=useContext(AppContext)



  const [firstName, setFirstName] = useState({ value: state.firstname, error: '' });
  const [lastName, setLastName] = useState({ value: state.lastname, error: '' });
  const [DOB, setDOB] = useState(state.dob);
  const [email, setEmail] = useState({ value: state.email, error: '' });
  // const [password, setPassword] = useState({ value: state.password, error: '' });
  const [country, setCountry]=useState(state.country)
  const [religion, setReligion]=useState(state.religion)
  const [modal, setModal]=useState(false)
  const [Picture, setPicture]=useState("")
  const [pic,setPic]=useState(state.pic)
 
  const [countries, setCountries]=useState([])

  const findCountry=(text)=>{
    setCountry(text)
    
    // fetch(`https://restcountries.eu/rest/v2/name/`+text,
    //  {
    //   "method": "GET",
    //   })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     // console.error(err);
    //   });
  }

  const _onUpdatePressed = () => {
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(lastName.value);

    const emailError = emailValidator(email.value);
    // const passwordError = passwordValidator(password.value);

    if (emailError || firstNameError|| lastNameError) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setEmail({ ...email, error: emailError });
      // setPassword({ ...password, error: passwordError });
      return;
    } 
    fetch("http://f470-103-21-165-206.ngrok.io/updateUser",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              _id:state._id,
              firstname:firstName.value,
              lastname:lastName.value,
              dob:DOB,
              country:country,
              religion:religion,
              // password:password.value,
              email:email.value,
              pic:pic


          })
      }).then(res=>res.json())
      .then(data=>{
          console.log(data)
        if(data.error){
            // M.toast({html: data.error,classes:"#c62828 red darken-3"})
            console.log(data.error)
            Alert.alert(`${data.error}`)

        }
        else{
            // localStorage.setItem("jwt",data.token)
            // localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"UPDATE",payload:data})
            // M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
            // history.push('/')
            console.log("sign up sucess")
            Alert.alert(`profile update successful`)
            props.navigation.navigate('Profile')
        }
      }).catch(err=>{
          console.log(err)
    })
  
  
  
  }



        const pickFromGallery=async ()=>{
          const {granted}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
          if(granted){
            let data= await ImagePicker.launchImageLibraryAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5,
                  
              })
              if(!data.cancelled){
                  let newFile ={uri:data.uri, type:`test/${data.uri.split(".")[1]}`, name:`test/${data.uri.split(".")[1]}`}
                  handleUpload(newFile)
              }
          }
          else{
              Alert.alert("you need to give permissions to upload an image")
          }
      }

      const pickFromCamera=async ()=>{
          const {granted}=await Permissions.askAsync(Permissions.CAMERA)
          if(granted){
            let data= await ImagePicker.launchCameraAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5,
                  
              })
              if(!data.cancelled){
                  let newFile ={uri:data.uri, type:`test/${data.uri.split(".")[1]}`, name:`test/${data.uri.split(".")[1]}`}
                  handleUpload(newFile)
              }
          }
          else{
              Alert.alert("you need to give permissions to upload an image")
          }
      }
      const handleUpload=(image)=>{
          const data= new FormData();
          data.append('file', image);
          data.append("upload_preset",'employeeApp');
          data.append("cloud_name", 'myimagcloud');
          fetch("https://api.cloudinary.com/v1_1/myimagcloud/image/upload",{
              method:"post",
              body:data
          }).then(res=>res.json()).then(data=>{
              setPicture(data.url)
              setPic(data.url)
              console.log(data)
              setModal(false);
          }).catch(error=>{
              Alert.alert("something went wrong")
          })
            
      }

    return (
        <ScrollView>
    
        <Background>    
          <TextInput
            label="First Name"
            returnKeyType="next"
            value={firstName.value}
            onChangeText={text => setFirstName({ value: text, error: '' })}
            error={!!firstName.error}
            errorText={firstName.error}
          />
          <TextInput
            label="Last Name"
            returnKeyType="next"
            value={lastName.value}
            onChangeText={text => setLastName({ value: text, error: '' })}
            error={!!lastName.error}
            errorText={lastName.error}
          />

          <TextInput
            label="Country"
            returnKeyType="next"
            value={country}
            onChangeText={text =>{findCountry(text)}}
            
          />
          <View style={{marginTop:15,marginBottom:15, borderColor:"black", borderWidth:1, borderRadius:5}}>
          <Text>Religion:</Text>
          <Picker
            selectedValue={religion}
            style={{ height: 50, width: 300, }}
            onValueChange={(itemValue, itemIndex) => setReligion(itemValue)}
          >
            <Picker.Item label="Buddhist" value="Buddhist" />
            <Picker.Item label="Catholic" value="Catholic" />
            <Picker.Item label="Hindu" value="Hindu" />
            <Picker.Item label="Islam" value="Islam" />
            <Picker.Item label="Another" value="Another" />
            <Picker.Item label="None" value="None" />


           </Picker>
          </View>


          <DatePicker
              style={{width: 300, marginTop:15,marginBottom:15, borderColor:"black", borderWidth:1, borderRadius:5}}
              date={DOB}
              mode="date"
              placeholder="select date of birth"
              format="YYYY-MM-DD"
              minDate="1970-05-01"
              // maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {setDOB(date)}}
            />
    
          
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <Button icon={Picture?"check-bold":"upload"} mode="contained"  style={{}} onPress={() => setModal(true)}>
                 Upload
          </Button>
    
          {/* <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          /> */}
    
          <Button mode="contained" onPress={_onUpdatePressed} style={styles.button}>
            update
          </Button>
    

          <Modal
            animationType='slide'
            transparent={true}
            visible={modal}
            onRequestClose={()=>{setModal(false)}}
            >
               <View  style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                                <Button icon="camera" mode="contained" theme={theme}  style={{width:150}} onPress={() =>pickFromCamera()}>
                                        camera
                                </Button>

                            <Button icon="image-area" mode="contained"  theme={theme}  style={{width:150}} onPress={() => pickFromGallery()}>
                                        gallery
                                </Button>
                        </View>



                        <Button theme={theme}  onPress={() => setModal(false)}>
                                        cancle
                        </Button>

               </View>
          </Modal>
        
        </Background>
        </ScrollView>
      );
  }


  const styles = StyleSheet.create({
    label: {
      color: theme.colors.secondary,
    },
    button: {
      marginTop: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    modalView:{
      position:'absolute',
      bottom:2,
      width:"100%",
      backgroundColor:'#b8e6ff'
    },
    modalButtonView:{
        flexDirection:'row',
        justifyContent:"space-around",
        padding:20
    }
  });