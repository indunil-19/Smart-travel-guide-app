import React, { useEffect,useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';




export const Carousal=({photos=[]})=>{
    const [references, setReferences]=useState([])
    useEffect(()=>{
            setReferences(photos)
    }, [photos])
    return(
        <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true} stopOnHover={false} dynamicHeight={true}>
                
                {
                    references.map((reference)=>{
                        return(
                            <div >
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${reference.photo_reference}&key=AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA`} 
                           style={{ width:"100%",backgroundPosition:"cover"}}  />
                            
                        </div>
                        )
                    })
                }
                
            </Carousel>
    )
}
