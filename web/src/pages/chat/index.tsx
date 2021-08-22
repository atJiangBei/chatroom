import React, { useEffect, useState } from 'react'
import './index.scss'
import request from '../../utils/request'
import io from "socket.io-client"
const userInfoStr = localStorage.getItem('userInfo')
const userInfo = JSON.parse(userInfoStr || JSON.stringify({}))
const socket = io(`ws://${process.env.REACT_APP_WS}`, {
    query: {
        name: "other"
    },
    auth: {
        ...userInfo
    }
});

const Chat = () => {
    const [userList, setUserList] = useState([])
    const [currentUser, setCurrentUser] = useState < any > ()
    useEffect(() => {
        request.GET("/chat/queryAllUser", {
            params: userInfo
        }).then((res: any) => {
            setUserList(res)
        })
        socket.on("connect", () => {
            console.log("连接成功")
        });
        socket.on("msg", (res: any) => {
            console.log(res)
        });
    }, [])
    const toggleUser = (user: any) => {
        socket.emit("msg", {
            type: 'fellow_netizen',
            to: user
        });
        setCurrentUser(user)
    }
    return <div className="chat-container">
        <div className="chat-content flex">
            <div className="user-self">
                <h1>{userInfo.name}</h1>
            </div>
            <div className="user-list">
                <ul>
                    {
                        userList.length &&
                        userList.map((user: any) => {
                            const cs = currentUser && currentUser.id === user.id
                            return <li key={user.id} className={cs ? 'active' : ''} onClick={() => toggleUser(user)}>{user.name}</li>
                        })
                    }
                </ul>
            </div>
            <div className="flex-1">

            </div>
        </div>
    </div>
}

export default Chat