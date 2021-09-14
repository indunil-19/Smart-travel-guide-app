import { useEffect, useState } from "react";
import M from "materialize-css";
import NavBar from "../components/navbar";
import { Button } from "@chakra-ui/button";
import { ViewIcon } from "@chakra-ui/icons";
const AdminList=()=>{
   const [data,setData]=useState([])
   useEffect(()=>{
    fetch("/admin/viewAdmins")
    .then(res=>res.json())
    .then(result=>{
        console.log(result)
       if(result.error){
          M.toast({html: result.error,classes:"#c62828 red darken-3"})
       }
       else{
            console.log(result.admins)
             setData(result.admins)
       }
    }).catch(err=>{
        console.log(err)
    })
   },[])
    return(
       <NavBar>
             <div className="container"> 
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Nmae</th>
                    <th>View</th>
                </tr>
                </thead>

                <tbody>
                    
                        {
                            data.map((item,index)=>{
                                return(
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td><Button colorScheme="teal" size="xs">
                                                <ViewIcon/>
                                            </Button></td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
             </div>
             </NavBar>

       
          
          
      
      
    )
}

export default AdminList;
