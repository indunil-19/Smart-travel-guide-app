const {Client} = require("@googlemaps/google-maps-services-js");

   
export const DeletePOI=async(index, index1, travelPlan=[[[],[]] ,[]])=>{
    const client = new Client({});
    var start_location={}
    var end_location={}
    var k=0
    var l=0
    for(var i=0; i<=index;i++){
      for (var j=0; j<travelPlan[i].length;j++){
        var k=k+1
        if(i==index && j==index1){
            l=k
        }
      }
    } 
    
    console.log(index,index1,travelPlan)
    var travelDays=travelPlan[0].length
    var plan=travelPlan[0]

    if(index>0){
      if(index1>0){
        console.log("1")
        start_location=plan[index][index1-1].geometry.location
        // travelPlan[0][index].pop(index1)
      }
      else if(index1==0){
        console.log("2")
        if(plan[index-1].length==0){
          start_location={lat:6.927079,lng:79.857750}
        }
        else{
          start_location=plan[index-1][plan[index-1].length-1].geometry.location
        }
        
        // travelPlan[0][index].pop(index1)
      }
      
    }
    else if(index==0){
      if(index1==0){
        start_location={lat:6.927079,lng:79.857750}
        // travelPlan[0][index].pop(index1)

      }
      else if(index1>0){
        console.log("4")
        start_location=plan[index][index1-1].geometry.location
        // travelPlan[0][index].pop(index1)
      }
      
    }


    if(index<travelDays-1){
      if(index1==plan[index].length-1){
        console.log("5")
        end_location=plan[index+1][0].geometry.location
        travelPlan[0][index].splice(index1,1)
        
      }
      else if(index1<plan[index].length-1){
        console.log("6")
        end_location=plan[index][index1+1].geometry.location
        travelPlan[0][index].splice(index1,1)
        
      }
    }
    else if(index==travelDays-1){
       if(index1==plan[index].length-1){

        console.log("7")
        travelPlan[0][index].splice(index1,1)
          travelPlan[1].pop(l-1)
          return travelPlan
       }
       else if (index1<plan[index].length-1){
         console.log("8")
          end_location=plan[index][index1+1].geometry.location
          travelPlan[0][index].splice(index1,1)
        
       }
    }
    

    return client
      .directions({params:{
          origin:start_location,
          destination:end_location,
          optimizeWaypoints: true,
          travelMode: 'DRIVING',
          key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",

        }})
        .then((response) => {
          const route = response.data.routes[0];
          travelPlan[1].pop(l-1)
          travelPlan[1][l-1]=route.legs[0]
         
          return travelPlan
         

        })
         .catch((e) =>{ 
           console.log(e)
        });
}

export const DeleteDay=async(day, travelPlan)=>{
  console.log(day)
  const client = new Client({});
  var start_location={}
  var end_location={}

  var remove_count=0

  var pivot=0
  for(let i=0;i<day-1;i++){
    pivot=pivot+travelPlan[0][i].length
  }
  

  var travelDays=travelPlan[0].length
  if(day==travelDays){
    remove_count=travelPlan[0][day-1].length
    travelPlan[0].splice(day-1,1)
    travelPlan[1].splice(pivot-1,remove_count)
    return travelPlan
  }

  if(day<travelDays){
    travelPlan[0].splice(day-1,1)
    start_location=travelPlan[0][day-2][travelPlan[0][day-2].length-1].geometry.location
    end_location=travelPlan[0][day][0].geometry.location
    remove_count=travelPlan[0][day-1].length
    travelPlan[0].splice(day-1,1)
    travelPlan[1].splice(pivot-1,remove_count)
  }
  return client
      .directions({params:{
          origin:start_location,
          destination:end_location,
          optimizeWaypoints: true,
          travelMode: 'DRIVING',
          key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",

        }})
        .then((response) => {
          const route = response.data.routes[0];

          travelPlan[1][pivot]=route.legs[0]
         
          return travelPlan
         

        })
         .catch((e) =>{ 
           console.log(e)
        });




  return;

}


export const findPois=async(day,travelPlan,allpois)=>{
    const client = new Client({});

    // console.log(allpois)
    const allpoisDays=travelPlan[0].length
    const num_pois_in_day=travelPlan[0][day-1].length
    var start_location={}
    var end_location={}
    if(num_pois_in_day==0){
      if(day==1){
        start_location={lat:6.927079,lng:79.857750}
      }
      else{
        start_location=travelPlan[0][day-2][travelPlan[0][day-2].length-1].geometry.location
      }
    }
    else{
       start_location=travelPlan[0][day-1][num_pois_in_day-1].geometry.location
    }


    var remaining_time=0

    for(let i=0; i<travelPlan[0][day-1].length; i++){
          remaining_time+=travelPlan[1][i].duration.value
    }
    remaining_time-=3600
    console.log(remaining_time)


    var poisRoute=new Array()
    var pois=new Array()
    var poisRouteSuitable=new Array()

      for(var i=0; i<allpois.length;i++){
        end_location=allpois[i].geometry.location
      client
      .directions({params:{
          origin:start_location,
          destination:end_location,
          optimizeWaypoints: true,
          travelMode: 'DRIVING',
          key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",

        }
      })
        .then((response) => {
          const route = response.data.routes[0];
          // console.log(route)  
          poisRoute.push(route.legs[0])
        })
         .catch((e) =>{ 
           console.log(e)
        })   
      }
      await new Promise(r => setTimeout(r, 6000));
      
       for(let i=0; i<poisRoute.length;i++){

        if(poisRoute[i].duration.value<=remaining_time){
            pois.push(allpois[i])
            poisRouteSuitable.push(poisRoute[i])
      }
    }
      
     
     return [pois,poisRouteSuitable]
    // return allpois
}


export const addPoiToPlan=async(day,poi, route,travelPlan)=>{
  var pivot=0
  for(let i=0;i<day-1;i++){
    pivot=pivot+travelPlan[0][i].length
  }

  travelPlan[0][day-1].push(poi)
  travelPlan[1].splice(pivot, 0, route)

  return travelPlan

}