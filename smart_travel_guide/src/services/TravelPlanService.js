//  import { Loader } from "@googlemaps/js-api-loader"
const {Client} = require("@googlemaps/google-maps-services-js");

export const getTravelPlan=async(climate,provinces,days,religion,thingsLike,placesLike)=>{
  
  console.log(climate,provinces,days,religion,thingsLike,placesLike)
  const client = new Client({});
 
    
    var province=provinces
    
    
    var climate=climate
    // wet ->Western, Sabaragamuwa, Southern
    // intermediate ->Central, Uva
    // dry -> Northern,North Western, North Central,Eastern 
    
       
    var things_you_like_to_do=thingsLike
    // hiking, surfing, camping, swimming,riding boats, nothing_only_travelling ""
    
    var religion=religion
    //buddhist, hindu, islam, catholic, ""
    
    var placeslike=placesLike
    //Natural, animal, botenical gardens, parks, beaches, ancient, reliogous
    
    var number_of_days=parseInt(days)
    
    var provinceData={
      "Northern":[9.112945,80.477003],
      "North Western":[7.612998,80.180174],
      "Western":[6.904614,80.037256],
      "North Central":[8.331083,80.641908],
      "Central":[7.318882,80.696876],
      "Sabaragamuwa":[6.697343,80.509984],
      "Eastern":[7.602108,81.598357],
      "Uva":[6.751896,81.290534],
      "Southern":[6.058624,80.414907]
    }
    
    var climateData={
      "wet":["Western", "Sabaragamuwa", "Southern"],
      "intermediate":["Central", "Uva"],
       "dry":["Northern","North Western", "North Central","Eastern"]
    }
    
    var pois=new Array()
    
    // user preferences analysis
    function userPreferencesAnalysis(){
      let reqArr=[]
      let pro=[];
      if(climate){
        pro=climateData[climate].filter(x=>province.includes(x))
        if(pro.length==0){
          pro=climateData[climate]
    
        }
      }
      let R="50000"
      pro.forEach(ele => {
        if(ele=="Northern")  R="5000";
        things_you_like_to_do.forEach(x=>{
          let req={
            location:  { lat:provinceData[ele][0], lng:provinceData[ele][1]},
            radius: R,
            query: x,
            type:['tourist_attraction', ],
            // 
            key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",
            rating:4,
          };
          reqArr.push(req)
        })
        placeslike.forEach(x=>{
          if(x=="reliogous"){
            let req={
              location:  { lat:provinceData[ele][0], lng:provinceData[ele][1]},
              radius: R,
              query: x+religion,
              type:['tourist_attraction', ],
              // rankBy :google.maps.places.RankBy.DISTANCE,
              key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",
              rating:4,
            };
            reqArr.push(req)
          }else{
            let req={
              location:  { lat:provinceData[ele][0], lng:provinceData[ele][1]},
              radius: R,
              query: x,
              type:['tourist_attraction', ],
              // rankBy :google.maps.places.RankBy.DISTANCE,
              key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",
              rating:4,
    
          };
          reqArr.push(req)
        }})
    
      });
    
      return reqArr;
    }
     async function initMap() {
      
        userPreferencesAnalysis().forEach(async(x)=>{
              findPOIS(x)
        })

        await new Promise(r => setTimeout(r, 6000));


        
       
        await calculateAndDisplayRoute();
        
        // console.log(pois)
        return pois;
      
    }
    return await initMap();
    
    
    // find point of interersts for a request
     function findPOIS(request){
      
        return client
          .textSearch({
            params: request,
            timeout: 1000, // milliseconds
          })
          .then((r) => {
          //  console.log(r.data.results.length);
          //  pois=pois.concat(r.data.results)
            addPlaces(r.data.results)
            return ;
          })
          .catch((e) => {
            console.log(e);
          });
      
    }
    // add placess to map
    function addPlaces(results) {
        for (var i = 0; i < results.length; i++) {
        var place = results[i];
        if(results[i].rating>=4.3){
          //  console.log(results[i])
          // pois.push(results[i])
          // console.log(results[i].name, results[i].rating, results[i].types)
    
    
          if(pois.length<=number_of_days*8){
            if(Math.random()>0.5) {
              // console.log(results[i].name)
              // createMarker(results[i])
              pois.push(place)
           
            };
          }    
        }
      } 
    }
    
   
    
    
    
      
    async function calculateAndDisplayRoute() {
      const waypts = [];
      
    
      for (let i = 0; i < pois.length; i++) {
          waypts.push({
            location: pois[i].geometry.location,
            stopover: true,
          });
      }
      const client1 = new Client({});

      client1
      .directions({params:{
          origin:{lat:6.927079,lng:79.857750},
          destination:{lat:6.927079,lng:79.857750},
          optimizeWaypoints: true,
          waypoints: waypts,
          travelMode: 'DRIVING',
          key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",

        }})
        .then((response) => {
          // directionsRenderer.setDirections(response);
          
          const route = response.data.routes[0];
          
          let day1=[]
          let day2=[]
          let day3=[]
          let time=0
           for (let i = 0; i < route.legs.length-1; i++) {
            //  console.log(route.legs[i], pois[route.waypoint_order[i]].name, route.waypoint_order[i])
             time=time+route.legs[i].duration.value+3600
             if(time<32400) day1.push(route.waypoint_order[i])
             else if(time<64800) day2.push(route.waypoint_order[i])
             else if(time<97200)  day3.push(route.waypoint_order[i])
          
         }
         console.log(day1)
         console.log(day2)
         console.log(day3)
        //  console.log(pois[0])
        })
         .catch((e) =>{ console.log(e)
            // window.alert("Directions request failed due to " + e)
        });
    }
}