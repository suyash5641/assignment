import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useData=()=>{

    const [userList,setUserList]=useState([])
    const [countryList,setCountryList]=useState([])
    const [userInfo,setUserInfo]=useState([])
    const [userPost,setUserPost]=useState([])
    const [loading,setLoading]=useState(true)
    const [errorMessage,setErrorMessage] = useState('')
    // const [searchParams,_] = useSearchParams()
    // // const userId = searchParams.get("id") ?? '';

    const getUsersList=useCallback(async()=>{
        try {
            setLoading(true);
            const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
            if (res.status === 200) {
              const response = await res.json();
              setUserList(response);
              setLoading(false);
              setErrorMessage("");
              return response?.data;
            } else if (res.status === 401) {
              setErrorMessage("Error Occured while fetching list of users, try again");
            } else if (res.status === 500) {
              setErrorMessage("Error Occured while fetching list of users, try again");
            }
          } catch (err) {
            setLoading(false);
            setErrorMessage("Error Occured while fetching list of users, try again");
          } finally {
            setLoading(false);
          }
    },[setLoading,setUserList,setErrorMessage])

    const getUsersDetailById=useCallback(async(userId)=>{
        try {
            setLoading(true);
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            if (res.status === 200) {
              const response = await res.json();
              setUserInfo(response);
              setLoading(false);
              setErrorMessage("");
              return response?.data;
            } else if (res.status === 401) {
              setErrorMessage("Error Occured while fetching list of users, try again");
            } else if (res.status === 500) {
              setErrorMessage("Error Occured while fetching list of users, try again");
            }
          } catch (err) {
            setLoading(false);
            setErrorMessage("Error Occured while fetching list of users, try again");
          } finally {
            setLoading(false);
          }
    },[setLoading,setErrorMessage,setUserInfo])

    const getUsersPost=useCallback(async(userId)=>{
        try {
            setLoading(true);
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            if (res.status === 200) {
              const response = await res.json();
              const result = response.filter((data)=>data?.userId === parseInt(userId))
              setUserPost(result);
              setLoading(false);
              setErrorMessage("");
              return response?.data;
            } else if (res.status === 401) {
              setErrorMessage("Error Occured while fetching list of users, try again");
            } else if (res.status === 500) {
              setErrorMessage("Error Occured while fetching list of users, try again");
            }
          } catch (err) {
            setLoading(false);
            setErrorMessage("Error Occured while fetching list of users, try again");
          } finally {
            setLoading(false);
          }
    },[setLoading,setErrorMessage,setUserPost])

    const getCountryList=useCallback(async()=>{
        try {
            setLoading(true);
            const res = await fetch(`http://worldtimeapi.org/api/timezone`);
            if (res.status === 200) {
              const response = await res.json();
              setCountryList(response);
              setLoading(false);
              setErrorMessage("");
              return response;
            } else if (res.status === 401) {
              setErrorMessage("Error Occured while fetching list of users, try again");
            } else if (res.status === 500) {
              setErrorMessage("Error Occured while fetching list of users, try again");
            }
          } catch (err) {
            setLoading(false);
            setErrorMessage("Error Occured while fetching list of users, try again");
          } finally {
            setLoading(false);
          }
    },[setLoading,setCountryList,setErrorMessage])

    const getCurrentTime=useCallback(async(selectedCountry)=>{
        try {
            setLoading(true);
            const res = await fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
            if (res.status === 200) {
              const response = await res.json();
              
              setLoading(false);
              setErrorMessage("");
              return response.datetime;
            } else if (res.status === 401) {
              setErrorMessage("Error Occured while fetching list of users, try again");
            } else if (res.status === 500) {
              setErrorMessage("Error Occured while fetching list of users, try again");
            }
          } catch (err) {
            setLoading(false);
            setErrorMessage("Error Occured while fetching list of users, try again");
          } finally {
            setLoading(false);
          }
    },[setLoading, setErrorMessage])

    useEffect(()=>{
        getUsersList()
    },[getUsersList])

    
    return useMemo(
        () => ({
            userList,loading,errorMessage,userInfo,getUsersDetailById,getUsersPost,userPost,getCountryList,countryList,getCurrentTime
        }),
        [userList,loading,errorMessage,userInfo,getUsersDetailById,getUsersPost,userPost,getCountryList,countryList,getCurrentTime]
      );
}