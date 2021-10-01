import { Flex,VStack,HStack } from '@chakra-ui/layout';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import {useState,useEffect,useContext} from "react";
import Autocomplete from "react-google-autocomplete";
import { TravelContext } from "../../context/TravelContext"
import { Button, Heading,Image   } from "@chakra-ui/react"
import { MdDeleteForever } from "react-icons/md";

export const CustomPlan=()=>{
  const [open,setOpen]=useState(false);
  const {state, dispatch}=useContext(TravelContext)
  const [display,setDisplay]=useState({})

  const [p,setP]=useState([])
  const places=new Array()

  

    
    
    return(
        <>
       <Flex width="100%" alignItems="center" flexDirection="column" justifyContent="center">

        
                  
        <Autocomplete style={{width:"40%" ,height:"30px", padding:"5px", margin:"15px",background:"grey", borderRadius:"5px", color:"white"}}
        apiKey={"AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY"}

        onPlaceSelected={(place) => {
          // await new Promise(r => setTimeout(r, 1000));
          

          places.push(place)
          setP(places)
          dispatch({type:"set_pois" , payload:{allpois:places}})


        }}

        options={{
            types: ['geocode' , 'establishment'],
            componentRestrictions: { country: "LK" },
            fields:["ALL"]
        }}
        >
        


        </Autocomplete>


        {state.allpois &&
          p.map((item,index)=>{
            return(
              <>
              
              <Flex flexDirection="row" m={3} >
                 {index+1}
                 <Button  size="sm" p={2} onClick={()=>{

                   setDisplay(places[index])

                 }}>
                  
                  {item.name}
                 </Button>


                 <Button onClick={()=>{
                   console.log(places)
                   places.forEach(element => {
                     console.log(element)
                   });
                    
                    // setP(places)
                    // dispatch({type:"set_pois" , payload:{allpois:places}})
                 }}>
                 <MdDeleteForever />
                 </Button>
              </Flex>
              
              </>
            )
          })
        }


        <Button onClick={()=>{
          console.log(p)
        }}>


        {
          display ? <>
          
          
          <Flex>
          {display.name}
          <Image   src={display.photos ? display.photos[0].getUrl() : ""}/>

          </Flex>
          
          
          
          
          
          
          </> : 
          <></>
        }

        </Button>
            

      </Flex>
        
    
        
        </>
    )
}










// export const Map=()=>{
//   const {state, dispatch}=useContext(TravelContext)
//   const [open,setOpen]=useState(false);
//   const [p,setP]=useState([])
//   const [placeID,setPlaceID]=useState(0)
  
//   const places=new Array()

  
  
//     return(
//         <>
       

//           <GoogleMap style={{}}
//             defaultZoom={8}
//             defaultCenter={{ lat: 7.691418, lng:80.636696}}
//             // defaultOptions={{ styles: mapStyles }}
//           >


             

//               {/* {places && places.map((item,index)=>{
//                     return(
//                       <>

//                        <Marker key={index} position={item.geometry.location} onClick={()=>{setOpen(true); setPlaceID(index)}} />
                      
//                       </>
//                     )
                     

//               })} */}


//               {/* { open && <InfoWindow  onCloseClick={()=>setOpen(false)}
//               position={
//                 place[placeID].geometry.location
//               }
//               >
//                 <>
//                 <h1>{place[placeID].name}</h1>

//                 <img src={place[placeID].photos[0].getUrl()} ></img>

//                 <p>{place[placeID].formatted_address}</p>
//                 </>
                
//                 </InfoWindow>
                
//               } */}

          



//           </GoogleMap>


       


          
//         <Autocomplete style={{width:"40%" ,height:"30px", padding:"5px", margin:"15px",background:"grey", borderRadius:"5px", color:"white"}}
//         apiKey={"AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY"}

//         onPlaceSelected={(poi) => {
//           places.push(poi)

//           dispatch({type:"set_pois" , payload:{allpois:places}})

//           console.log(state)
            
//         }}

//         options={{
//             types: ['geocode' , 'establishment'],
//             componentRestrictions: { country: "LK" },
//             fields:["ALL"]
//         }}
//         >

//         </Autocomplete>

//         {/* <Flex>
//           {p && p.map((item,index)=>{
//             return(
//               <>
              
//               <Flex>
//                 <HStack>
//                   <h1>{index+1}</h1>
//                   <h1>{item.name} </h1>
                  
//                 </HStack>
//               </Flex>
              
//               </>
//             )
//           })}
//         </Flex> */}
        
//         </>
//     )
// }

// const MapWrapped = withScriptjs(withGoogleMap(Map));


// export  function GMAP() {
//     return (
//         <Flex height="150vh"  boxShadow="dark-lg" justifyContent="center" alignItems="center" width="80%">
//         <MapWrapped
//           googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY`}
//           loadingElement={<div style={{ height: `100%` }} />}
//           containerElement={<div style={{ height: `100%` ,width:"100%" }} />}
//           mapElement={<div style={{ width: `50%`, height:"80%" }} />}
//         />
//       </Flex>
//     );
//   }