
export interface UserInfo {
    createTime: number
    id: string
    name: string
    type: string
  }


  export interface FriendsListType {
    [index: number]: UserInfo
  }
  
  export interface MessageType {
    createTime: number
    id: string
    message?: string
    name: string
    source?: string
    type: string
  
  }
  
  export type MessageListType = Array<MessageType>
  
  export interface ChatData {
    [key: string]: MessageListType
  }
  
