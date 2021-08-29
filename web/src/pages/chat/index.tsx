import { useEffect, useRef, useState } from 'react'
import './index.scss'
import io from 'socket.io-client'
import request from '../../utils/request'

//组件
import ChatWindow from '../../components/chat'
import User from '../../components/user'
import FriendsList from '../../components/friends-list'

const wsPath = `ws://${process.env.REACT_APP_WS}`

let userInfo: any = {}
let socket: any = null
let currentFriend: any = null
const chatData: any = {}

const Chat = (props: any) => {
  const userInfoStr = localStorage.getItem('userInfo')
  if (userInfoStr) {
    userInfo = JSON.parse(userInfoStr)
  } else {
    props.history.push('/login')
  }
  //聊天好友列表
  const [friendList, setFriendList] = useState([])
  //当前聊天的朋友或者群聊
  const [chattingFriend, changeChattingFriend] = useState<any>()
  //当前聊天窗口的聊天信息
  const [currentChat, updateCurrentChat] = useState<Array<Object>>([])

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
      const { type, from, to } = res
      let id = ''
      if (type === 'group') {
        id = to.id
      }
      if (type === 'personal') {
        id = from.id
      }
      chatData[id].push({
        source: 'he',
        message: res.message,
        ...res.from
      })
      if (id === currentFriend.id) {
        updateCurrentChat([...chatData[id]])
      }
    })
  }, [])
  const queryAllUser = (userInfo = {}) => {
    request
      .GET('/chat/queryAllUser', {
        params: userInfo
      })
      .then((friends: any) => {
        setFriendList(friends)
        friends.forEach((item: any) => {
          chatData[item.id] = []
        })
        friends[0] && toggleFriend(friends[0])
      })
  }
  const toggleFriend = (user: any) => {
    changeChattingFriend(user)
    updateCurrentChat(chatData[user.id])
    currentFriend = user
  }
  const onEnter = function(value: string) {
    const { type, id } = chattingFriend
    socket.emit('msg', {
      type: type, //个人
      to: chattingFriend,
      message: value
    })
    const info = {
      source: 'self',
      message: value,
      ...userInfo
    }
    currentChat.push(info)
    const afterChat = [...currentChat]
    updateCurrentChat(afterChat)
    chatData[id] = afterChat
  }
  return (
    <div className="chat-container">
      <div className="chat-content flex">
        <User userInfo={userInfo}></User>
        <FriendsList
          friendsList={friendList}
          chattingFriend={chattingFriend}
          toggleFriend={toggleFriend}
        ></FriendsList>
        {chattingFriend && (
          <ChatWindow
            chatList={currentChat}
            user={chattingFriend}
            onEnter={onEnter}
          ></ChatWindow>
        )}
      </div>
    </div>
  )
}

export default Chat
