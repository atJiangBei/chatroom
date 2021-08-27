import React, { useEffect, useState } from 'react'

import './index.scss'
import request from '../../utils/request'
import ChatWindow from '../../components/chat'
import User from '../../components/user'
import io from 'socket.io-client'

const wsPath = `ws://${process.env.REACT_APP_WS}`
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
  const [currentUser, setCurrentUser] = useState < any > ()
  const [currentChat, setCurrentChat] = useState < any > ()
  const [chatText, setChatText] = useState < string > ()
  useEffect(() => {
    if (userInfo) {
      queryAllUser(userInfo)
      socket = io(wsPath, {
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
      const { id } = res.from
      chatData[id].push({
        type: 'he',
        message: res.message,
        ...res.from
      })
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
  const onPressEnter = function (e: any) {
    const value = e.target.value
    if (e.ctrlKey && e.keyCode === 13) {
      setChatText('')
      socket.emit('msg', {
        type: 'fellow_netizen',
        to: currentUser,
        message: value
      })
      currentChat.push({
        type: 'self',
        message: value,
        ...userInfo
      })
    }

  }
  return (
    <div className="chat-container">
      <div className="chat-content flex">
        <User userInfo={userInfo}></User>
        <div className="user-list">
          <ul>
            {userList.length > 0 &&
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
          <ChatWindow chatList={currentChat} onPressEnter={onPressEnter}></ChatWindow>
        )}
      </div>
    </div>
  )
}

export default Chat
