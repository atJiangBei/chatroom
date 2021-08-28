import { useEffect, useState, useRef } from "react"
import './index.scss'
import { Input } from 'antd'

const ChatWindow = (props: any) => {
    const [chatText, setChatText] = useState < string > ('');
    const { onEnter, chatList, user } = props;
    const chatBody: React.MutableRefObject<any> = useRef(null)
    useEffect(() => {
        const current = chatBody.current
        current.scrollTop = current.scrollHeight - current.offsetHeight;
    }, [chatList])
    const onPressEnter = (e: any) => {
        // if (e.ctrlKey && e.keyCode === 13) {
        //按enter+ctrl发送
        // }
        e.preventDefault();
        const value = e.target.value;
        onEnter(value);
        setChatText('');
    }
    return (<div className="flex-1 flex chat-window fd-column">
        <div className="flex-1  chat-list">
            <div className="chat-header">{user.name}</div>
            <div className="chat-body custom-scrollbar" ref={chatBody}>
                <ul>
                    {chatList.length > 0 && chatList.map((chat: any, index: number) => {
                        return (
                            <li key={index + ''}>
                                {chat.source === 'self' && (
                                    <div className="self">
                                        <span className="chat-item">{chat.message}</span>
                                        <strong className="head-portrait">
                                            {chat.name}
                                        </strong>
                                    </div>
                                )}
                                {chat.source === 'he' && (
                                    <div className="he">
                                        <strong className="head-portrait">
                                            {chat.name}
                                        </strong>
                                        <span className="chat-item">{chat.message}</span>
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        <div className="chat-input-box padding-default">
            <Input.TextArea
                placeholder="按Enter键发送"
                value={chatText}
                onChange={e => setChatText(e.target.value)}
                onPressEnter={onPressEnter}
            />
        </div>
    </div>)
}


export default ChatWindow;