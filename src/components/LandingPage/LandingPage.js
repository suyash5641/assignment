import { useCallback } from "react"
import { useData } from "../../sdk/hooks/useData"
import './style.css'
import { useNavigate } from "react-router-dom"

export const LandingPage=()=>{

    const {userList} = useData()
    const navigate = useNavigate();

    console.log(userList,"list")

    const showUserPost=useCallback((userId)=>{
        navigate({
            pathname: '/user',
            search: `?id=${userId.toString()}`,
          });
    },[])

    return (
        <div className="boxContainer">
           {userList.map((data,index)=>(
            <div key={data?.id} className="content" onClick={()=>showUserPost(data?.id)}>
                <p className="name">Name: {data?.name}</p>
                <p>Post: </p>
            </div>
           ))}
        </div>
    )
}