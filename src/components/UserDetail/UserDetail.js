import { useCallback, useEffect } from "react"
import { useData } from "../../sdk/hooks/useData"
import './style.css'
import { useNavigate, useSearchParams } from "react-router-dom"
import { UserSection } from "../UserSection/UserSection"
import { UserPost } from "../UserPost/UserPost"
import { Header } from "../Header/Header"

export const UserDetail=()=>{

    const {getUsersDetailById,userInfo,getUsersPost,userPost} = useData()
    const [searchParams,_] = useSearchParams()
    const userId = searchParams.get("id") ?? '';

    useEffect(()=>{
        if(userId.trim().length === 0) return
        getUsersDetailById(userId)
        getUsersPost(userId)
    },[getUsersDetailById, getUsersPost, userId])

    const navigate = useNavigate();

    return (
        <div className="boxContainer">
            <Header/>
           <UserSection userInfo={userInfo}/>
           <UserPost userPost={userPost} />
        </div>
    )
}