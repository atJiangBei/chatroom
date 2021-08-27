import React from 'react'
import './index.scss'

const User = (props: any) => {
    const { userInfo } = props
    return <><div className="user-self">
        <h1 className="user-name">{userInfo.name}</h1>
    </div></>
}

export default User;
