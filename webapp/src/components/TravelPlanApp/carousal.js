import React, { useEffect,useState } from "react";
// import  "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';




 const Carousal=({photos=[]})=>{
    const [references, setReferences]=useState([])
    useEffect(()=>{
            setReferences(photos)
    }, [photos])
    return(
        <Carousel>
                
                {
                    references.map((reference)=>{
                        return(
                            <div >
                            <img data-testid="image"  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${reference.photo_reference}&key=AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA`} 
                             />
                            
                        </div>
                        )
                    })
                }
                
            </Carousel>
    )
}
export default Carousal