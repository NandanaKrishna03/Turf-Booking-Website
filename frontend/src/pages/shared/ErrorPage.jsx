
import { useNavigate } from "react-router-dom"



// eslint-disable-next-line react/prop-types
function ErrorPage({role="user"}) {
  const navigate=useNavigate();
  let home_route="/";


 
  if(role=="manager"){
    home_route="/manager";
  }
  
   console.log('role===',role)
  return (
    <div>
      <h1>Page not Found</h1>
      <button className="btn btn-accent" onClick={()=>navigate(home_route)}>
        Navigate to home
        </button>
    </div>
  )
}


export default ErrorPage
