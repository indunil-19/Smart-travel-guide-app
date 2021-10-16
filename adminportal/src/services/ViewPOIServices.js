const {Client} = require("@googlemaps/google-maps-services-js");

export const getPoiData=async(place_id)=>{

    const client = new Client({});
    return await client.placeDetails({params:{
        place_id: place_id,
        key: "AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA",

    }}).then((r)=>{
       
        return r.data.result
    }).catch(e=>{
        console.log(e)
    })

}

export const getNearByPlaces=async(location)=>{
    const client = new Client({});
    return  client.placesNearby({
        params:{
            location:location,
            key: "AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA",
            type:['tourist_attraction', ],
            radius:"30000",
            
        },
        timeout: 1000
    }).then((r)=>{
        
        return r.data.results
    }).catch(e=>{
        console.log(e)
    })
}

export const getNearByHotels=async(location)=>{
    const client = new Client({});
    return  client.placesNearby({
        params:{
            location:location,
            key: "AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA",
            type:['lodging' ],
            radius:"30000"
        },
        timeout: 1000
    }).then((r)=>{
        
        return r.data.results
    }).catch(e=>{
        console.log(e)
    })
}
