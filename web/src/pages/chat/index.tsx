import React, { useEffect, useState } from 'react'
import { Input } from 'antd'
import './index.scss'
import request from '../../utils/request'
import io from 'socket.io-client'
const userInfoStr = localStorage.getItem('userInfo')
let userInfo: any = {}
let socket: any = null
const chatData: any = {}
const Chat = (props: any) => {
  if (userInfoStr) {
    userInfo = JSON.parse(userInfoStr)
  } else {
    props.history.push('/login')
  }
  const [userList, setUserList] = useState([])
  const [currentUser, setCurrentUser] = useState<any>()
  const [currentChat, setCurrentChat] = useState<any>()
  useEffect(() => {
    if (userInfo) {
      queryAllUser(userInfo)
      socket = io(`ws://${process.env.REACT_APP_WS}`, {
        query: {
          name: 'other'
        },
        auth: {
          ...userInfo
        }
      })
    }

    socket.on('connect', () => {
      console.log('连接成功')
    })
    socket.on('msg', (res: any) => {
      console.log(res)
      console.log(currentChat)
      const { id } = res.from
      chatData[id].push(res.message)
      setCurrentChat([...chatData[id]])
    })
  }, [])
  const queryAllUser = (userInfo = {}) => {
    request
      .GET('/chat/queryAllUser', {
        params: userInfo
      })
      .then((res: any) => {
        setUserList(res)
        res.forEach((item: any) => {
          chatData[item.id] = []
        })
      })
  }
  const toggleUser = (user: any) => {
    setCurrentUser(user)
    setCurrentChat(chatData[user.id])
  }
  const onPressEnter = function(e: any) {
    const value = e.target.value
    socket.emit('msg', {
      type: 'fellow_netizen',
      to: currentUser,
      message: value
    })
  }
  return (
    <div className="chat-container">
      <div className="chat-content flex">
        <div className="user-self">
          <h1>{userInfo.name}</h1>
        </div>
        <div className="user-list">
          <ul>
            {userList.length &&
              userList.map((user: any) => {
                const cs = currentUser && currentUser.id === user.id
                return (
                  <li
                    key={user.id}
                    className={cs ? 'active' : ''}
                    onClick={() => toggleUser(user)}
                  >
                    {user.name}
                  </li>
                )
              })}
          </ul>
        </div>
        {currentUser && (
          <div className="flex-1 flex chat-interface fd-column">
            <div className="flex-1">
              <ul>
                {currentChat.map((chat: any) => {
                  return <li key={chat}>{chat}</li>
                })}
              </ul>
            </div>
            <div className="chat-input-box padding-default">
              <Input.TextArea
                placeholder="按enter+ctrl发送"
                onPressEnter={onPressEnter}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat
