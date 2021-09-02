import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const SignUp  = ()=>{
    const history = useHistory()
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [dob, setDob]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    

    // useEffect(()=>{
    //     if(url){
    //         uploadFields()
    //     }
    // },[url])
    // const uploadPic = ()=>{
    //     const data = new FormData()
    //     data.append("file",image)
    //     data.append("upload_preset","new-insta")
    //     data.append("cloud_name","cnq")
    //     fetch("https://api.cloudinary.com/v1_1/cnq/image/upload",{
    //         method:"post",
    //         body:data
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //        setUrl(data.url)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }
    const postData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/admin/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                firstname:firstName,
                lastname:lastName,
                dob,
                username,
                password,
                email,
            
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/admin/viewAdmins')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    

   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Travel Guide App</h2>
            <input
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            />
            <input
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            />
            <input
            type="date"
            placeholder="DOB"
            value={dob}
            onChange={(e)=>setDob(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            {/* <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div> */}
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>postData()}>
                Add
            </button>
           
             
               
         
            
    
        </div>
      </div>
   )
}


export default SignUp