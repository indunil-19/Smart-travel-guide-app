export const initialState=[
]

export const reducer =(state,action)=>{
   switch(action.type){
    //    case "ADD":
    //        return [...state, {id:Math.random() ,title:action.payload.title, content:action.payload.content}]
    //    case "REMOVE" :
    //        return state.filter((note)=>action.payload != note.id)
    //    case "UPDATE":
    //        return state.map( record =>{
    //            if(record.id ==action.payload.id) return action.payload
    //            else return record
    //        })
        case "USER":
            return action.payload

        case "UPDATE":
            return {
                ...state,
                firstname:action.payload.firstname,
                lastname:action.payload.lastname,
                dob:action.payload.dob,
                country:action.payload.country,
                religion:action.payload.religion,
                email:action.payload.email,
                pic:action.payload.pic
                // password:action.payload.password
            }
        case "USER_PREFERENCES":
            return{
                ...state,
                userPreferences:action.payload.userPreferences
            }
        default :
           return state
   }

    return state
}