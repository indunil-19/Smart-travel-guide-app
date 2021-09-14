import React ,{useContext, useState} from 'react';
import {  View , TouchableOpacity, Picker, Alert} from 'react-native';
import { RadioButton ,Text, Title , Button,Checkbox } from 'react-native-paper';
import { AppContext } from '../context/AppContext';


export function UserPreferences(props) {
    const [climate, setClimate] =useState('dry');
    const [provinces, setProvinces] = useState([]);
    const [days, setDays] = useState("1");
    const [religion, setReligion] = useState("");
    const [placesLike, setPlacesLike] = useState([]);
    const [thingsLike, setThingsLike] = useState([]);

    const {state, dispatch}=useContext(AppContext)


    const [q1, setQ1]=useState("flex")
    const [q2, setQ2]=useState("none")
    const [q3, setQ3]=useState("none")
    const [q4, setQ4]=useState("none")
    const [q5, setQ5]=useState("none")
    const [q6, setQ6]=useState("none")

    

    const provincesSelect=(text)=>{
        if(provinces.includes(text)) return setProvinces(provinces.filter(item=>{ item !==text}));

        if(provinces.length>=3) return;

        if(!provinces.includes(text)) return setProvinces([...provinces, text]) 

         
    }


    const thingsSelect=(text)=>{
        if(thingsLike.includes(text)) return setThingsLike(thingsLike.filter(item=>{ item !==text}));

        if(thingsLike.length>=3) return;

        if(!thingsLike.includes(text)) return setThingsLike([...thingsLike, text]) 

         
    }


    const placesSelect=(text)=>{
        if(placesLike.includes(text)) return setPlacesLike(placesLike.filter(item=>{ item !==text}));

        if(placesLike.length>=3) return;

        if(!placesLike.includes(text)) return setPlacesLike([...placesLike, text]) 

         
    }






    return (
      <View style={{flex:1,justifyContent:"center", alignItems:"center", margin:40 }}>

      <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:"#E6DBD0", borderColor:"#5D4954", borderRadius:20, borderWidth:2,display:q1}}>
                    <Title style={{padding:20,}}>1.Climate Condition would you expect while travelling?</Title>
            <RadioButton.Group onValueChange={newValue => setClimate(newValue)} value={climate}>
                <View style={{flexDirection:"row" ,padding:20, justifyContent:"flex-start", alignItems:"center"}}>
                
                <RadioButton value="dry" />
                <Text>Dry</Text>
                </View>
                <View style={{flexDirection:"row" ,padding:20, justifyContent:"center", alignItems:"center"}}>
                
                <RadioButton value="intermediate" />
                <Text>Intermediate</Text>
                </View>
                <View style={{flexDirection:"row" ,padding:20, justifyContent:"flex-start", alignItems:"center"}}>
                
                <RadioButton value="wet" />
                <Text>Wet</Text>
                </View>
            </RadioButton.Group>
            <Button icon="" mode="outlined" onPress={() => {setQ1("none"); setQ2("flex")}} style={{marginLeft:"40%", marginTop:"15%"}}>
                    Next
            </Button>
      </View>



      <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:"#E6DBD0", borderColor:"#5D4954", borderRadius:20, borderWidth:2,display:q2}}>
                    <Title style={{padding:5,}}>2.Select at most 3 Provinces you like to visit in Sri Lanka?</Title>
                    <View  style={{marginLeft:10}}>
                    <Text>If you don't know about Sri Lanka's provinces.</Text>
                    <TouchableOpacity 
                    onPress={() => props.navigation.navigate('Provinces')}
                    >
                    <Text style={{color:"red"}} >click Here to refer</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={provinces.includes("Northern")? 'checked' : 'unchecked'}
                        onPress={() => {
                            provincesSelect("Northern")  
                        }}
                        />
                        <Text>Northern</Text>

                    </View>
                    <View style={{flexDirection:"row" ,justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={provinces.includes("North Western")? 'checked' : 'unchecked'}
                        onPress={() => {
                            provincesSelect("North Western")  
                        }}
                        />
                        <Text>North Western</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={provinces.includes("Western")? 'checked' : 'unchecked'}
                        onPress={() => {
                            provincesSelect("Western")  
                        }}
                        />
                        <Text>Western</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={provinces.includes("North Central")? 'checked' : 'unchecked'}
                        onPress={() => {
                            provincesSelect("North Central")  
                        }}
                        />
                        <Text>North Central</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={provinces.includes("Central")? 'checked' : 'unchecked'}
                        onPress={() => {
                            provincesSelect("Central")  
                        }}
                        />
                        <Text>Central</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={provinces.includes("Sabaragamuwa")? 'checked' : 'unchecked'}
                        onPress={() => {
                            provincesSelect("Sabaragamuwa")  
                        }}
                        />
                        <Text>Sabaragamuwa</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={provinces.includes("Eastern")? 'checked' : 'unchecked'}
                        onPress={() => {
                            provincesSelect("Eastern")  
                        }}
                        />
                        <Text>Eastern</Text>

                    </View><View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={provinces.includes("Uva")? 'checked' : 'unchecked'}
                        onPress={() => {
                            provincesSelect("Uva")  
                        }}
                        />
                        <Text>Uva</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={provinces.includes("Southern")? 'checked' : 'unchecked'}
                        onPress={() => {
                            provincesSelect("Southern")  
                        }}
                        />
                        <Text>Southern</Text>

                    </View>

                  
      
            <Button icon="" mode="outlined" onPress={() =>{ setQ2("none"); setQ3("flex");}} style={{marginLeft:"40%", marginTop:0, marginBottom:5}}>
                    Next
            </Button>
      </View>



      <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:"#E6DBD0", borderColor:"#5D4954", borderRadius:20, borderWidth:2,display:q3}}>
                    <Title style={{padding:20,}}>3.Number of Days , you hope to travel?</Title>

                    <View style={{borderColor:"black", borderWidth:2}} >
                    <Picker
                        selectedValue={days}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) => setDays(itemValue)}
                        
                    >
                        <Picker.Item label="1 Days" value="1" />
                        <Picker.Item label="2 Days" value="2" />
                        <Picker.Item label="3 Days" value="3" />
                    </Picker>
                    </View>
            
            <Button icon="" mode="outlined" onPress={() => {setQ3("none"); setQ4("flex")}} style={{marginLeft:"40%", marginTop:"15%"}}>
                    Next
            </Button>
      </View>

      <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:"#E6DBD0", borderColor:"#5D4954", borderRadius:20, borderWidth:2,display:q4}}>
                    <Title style={{padding:20,}}>4.Any religion you would like to see in your travel?</Title>

                    <View style={{borderColor:"black", borderWidth:2}} >
                    <Picker
                        selectedValue={religion}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) => setReligion(itemValue)}
                        
                    >
                        <Picker.Item label="Buddhism" value="buddhist" />
                        <Picker.Item label="Hindu" value="hindu" />
                        <Picker.Item label="Islam" value="islam" />
                        <Picker.Item label="Catholic" value="catholic" />
                        <Picker.Item label="None" value="catholic" />
                    </Picker>
                    </View>
            
            <Button icon="" mode="outlined" onPress={() => {setQ4("none"); setQ5("flex")}} style={{marginLeft:"40%", marginTop:"15%"}}>
                    Next
            </Button>
      </View>


      <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:"#E6DBD0", borderColor:"#5D4954", borderRadius:20, borderWidth:2,display:q5}}>
                    <Title style={{padding:5,}}>5.Select at most 3 places you like to visit in Sri Lanka?</Title>
                    

                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={placesLike.includes("Natural")? 'checked' : 'unchecked'}
                        onPress={() => {
                            placesSelect("Natural")  
                        }}
                        />
                        <Text>Natural</Text>

                    </View>
                    <View style={{flexDirection:"row" ,justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={placesLike.includes("animal")? 'checked' : 'unchecked'}
                        onPress={() => {
                            placesSelect("animal")  
                        }}
                        />
                        <Text>Animals</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={placesLike.includes("botenical gardens")? 'checked' : 'unchecked'}
                        onPress={() => {
                            placesSelect("botenical gardens")  
                        }}
                        />
                        <Text>Botenical gardens</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={placesLike.includes("parks")? 'checked' : 'unchecked'}
                        onPress={() => {
                            placesSelect("parks")  
                        }}
                        />
                        <Text>Parks</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={placesLike.includes("beaches")? 'checked' : 'unchecked'}
                        onPress={() => {
                            placesSelect("beaches")  
                        }}
                        />
                        <Text>Beaches</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={placesLike.includes("ancient")? 'checked' : 'unchecked'}
                        onPress={() => {
                            placesSelect("ancient")  
                        }}
                        />
                        <Text>Ancient</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={placesLike.includes("reliogous")? 'checked' : 'unchecked'}
                        onPress={() => {
                            placesSelect("reliogous")  
                        }}
                        />
                        <Text>Reliogous</Text>

                    </View>

                  
      
            <Button icon="" mode="outlined" onPress={() =>{ if(placesLike.length<3){ Alert.alert("Select 3 place you like"); return;};setQ5("none"); setQ6("flex");}} style={{marginLeft:"40%", marginTop:0, marginBottom:5}}>
                    Next
            </Button>
      </View>

      <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:"#E6DBD0", borderColor:"#5D4954", borderRadius:20, borderWidth:2,display:q6}}>
                    <Title style={{padding:5,}}>6.Select things you like to do in Sri Lanka?</Title>
                    
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={thingsLike.includes("hiking")? 'checked' : 'unchecked'}
                        onPress={() => {
                            thingsSelect("hiking")  
                        }}
                        />
                        <Text>Hiking</Text>

                    </View>
                    <View style={{flexDirection:"row" ,justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={thingsLike.includes("surfing")? 'checked' : 'unchecked'}
                        onPress={() => {
                            thingsSelect("surfing")  
                        }}
                        />
                        <Text>Surfings</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={thingsLike.includes("camping")? 'checked' : 'unchecked'}
                        onPress={() => {
                            thingsSelect("camping")  
                        }}
                        />
                        <Text>Camping</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={thingsLike.includes("swimming")? 'checked' : 'unchecked'}
                        onPress={() => {
                            thingsSelect("swimming")  
                        }}
                        />
                        <Text>Swimming</Text>

                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"flex-start", alignItems:"center"}}>

                        <Checkbox
                        status={thingsLike.includes("riding boats")? 'checked' : 'unchecked'}
                        onPress={() => {
                            thingsSelect("riding boats")  
                        }}
                        />
                        <Text>Riding boats</Text>

                    </View>
                   
                    

                  
      
            <Button icon="" mode="outlined" onPress={() =>{         dispatch({type:"USER_PREFERENCES",payload:{userPreferences:{
                                                                                                climate:climate,
                                                                                                provinces:provinces,
                                                                                                days:days,
                                                                                                religion:religion,
                                                                                                placesLike:placesLike,
                                                                                                thingsLike:thingsLike
                                                                    }}}) ; props.navigation.navigate("TravelPlan")}} style={{marginLeft:"40%", marginTop:0, marginBottom:5}}>
                                                                            Next
                                                                    </Button>
      </View>


      
        




      </View>
    );
  }
  