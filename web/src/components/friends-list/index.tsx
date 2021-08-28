import { useEffect, useState } from 'react'
import classnames from 'classnames'
import './index.scss'
import { Input } from 'antd'


const FriendsList = (props: any) => {
    const { chattingFriend, friendsList, toggleFriend } = props
    const [friends, updateFriends] = useState(friendsList)
    useEffect(() => {
        updateFriends(friendsList)
    }, [friendsList])
    const onSearch = (e: any) => {
        const value = e.target.value;
        if (!value) {
            updateFriends(friendsList)
        } else {
            const friends = friendsList.filter((friend: any) => friend.name.indexOf(value) > -1)
            updateFriends(friends)
        }

    };
    return <div className="friends-box">
        <div className="friend-search flex ai-center">
            <Input placeholder="搜索" allowClear size="small" onChange={onSearch} />
        </div>
        <div className="friends-list">
            <ul>
                {friends.length > 0 &&
                    friends.map((friend: any) => {
                        const isChatting = chattingFriend && chattingFriend.id === friend.id
                        return (
                            <li
                                key={friend.id}
                                className={classnames({
                                    active: isChatting
                                })}
                                onClick={() => toggleFriend(friend)}
                            >
                                {friend.name}
                            </li>
                        )
                    })}
            </ul>
        </div>
    </div>
}

export default FriendsList;