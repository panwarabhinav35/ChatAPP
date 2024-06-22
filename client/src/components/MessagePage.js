import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SocketContext } from '../redux/contextStore'

const MessagePage = () => {
  const {userId} = useParams()
  const {socketConnection} = useContext(SocketContext)
  useEffect(() => {
      if(socketConnection){
        socketConnection.emit('message-page' , userId)
        socketConnection.on('message-user',(data)=>{
          console.log(data)
        })
      }
  }, [socketConnection,userId])
  
  return (
    <div>MessagePage</div>
  )
}

export default MessagePage