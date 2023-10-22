import { useCallback, useEffect, useRef, useState } from 'react'
import './style.css'
export const UserPost = ({ userPost }) => {

    const divRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [title,setTitle] = useState('')

    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      if (divRef.current) {
        // Attach the event listener when the div is open
        document.addEventListener('click', handleOutsideClick);
      } else {
        // Remove the event listener when the div is closed
        document.removeEventListener('click', handleOutsideClick);
      }
  
      return () => {
        // Cleanup the event listener when the component unmounts
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [divRef]);
  
    const handleOpenPopup = useCallback((title) => {
        setIsOpen(true)
        setTitle(title)
    }, [setIsOpen,setTitle])

   

    return (
        <div className="userPost">
            {userPost.map((data, index) => (
                <div onClick={() => handleOpenPopup(data?.title)} key={index} className='postSection'>
                    <p>{data?.title}</p>
                    <p>{data?.body}</p>
                </div>
            ))}
            
            {/* {isOpen && (
                <dialog id="modal" ref={divRef} className="popup">
                    <p>{title}</p>
                </dialog>
            )} */}
        </div>
    )
}