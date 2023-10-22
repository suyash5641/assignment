import './style.css'
export const UserSection = ({ userInfo }) => {
    
    return (
        <div className="userSection">
            <div className="user">
                <p>{userInfo?.name}</p>
                <p>{userInfo?.address?.street}</p>
            </div>
            <div className="user">
                <p>{userInfo?.username}</p>
                <div className="userContact">
                <p className="text">{userInfo?.email}</p>
                {userInfo?.email ?
                <p className="text">| {userInfo?.phone}</p>
                :<p className="text">{userInfo?.phone}</p>}
                </div>
            </div>
        </div>
    )
}