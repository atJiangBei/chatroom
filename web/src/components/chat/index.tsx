import { useState } from "react"
import './index.scss'
import { Input } from 'antd'

const ChatWindow = (props: any) => {
    const [chatText, setChatText] = useState < string > ('');
    const { onPressEnter, chatList } = props;
    return (<div className="flex-1 flex chat-window fd-column">
        <div className="flex-1  chat-list">
            <div>
                <ul>
                    {chatList.length > 0 && chatList.map((chat: any, index: number) => {
                        return (
                            <li key={index + ''}>
                                {chat.type === 'self' && (
                                    <div className="self">
                                        <span className="chat-item">{chat.message}</span>
                                        <strong className="head-portrait">
                                            {chat.name}
                                        </strong>
                                    </div>
                                )}
                                {chat.type === 'he' && (
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
                placeholder="按enter+ctrl发送"
                value={chatText}
                onChange={e => setChatText(e.target.value)}
                onPressEnter={onPressEnter}
            />
        </div>
    </div>)
}


export default ChatWindow;