import { useHistory } from "react-router-dom"

const NavBar=()=>{
    const history=useHistory()

    const logout=()=>{
        console.log("sdsw")
        fetch("/logout").
        then(
            history.push("/admin/signin")
        )
    }
    return(
        <nav>
            <div class="nav-wrapper">

            <a href="#" class="brand-logo">Travel Guide Admin</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href="">Sass</a></li>
                <li><a href="">Components</a></li>
                <li><a href="#" onClick={()=>{logout()}}>logout</a></li>
            </ul>
            </div>
            
        </nav>
        
    )
}

export default NavBar;