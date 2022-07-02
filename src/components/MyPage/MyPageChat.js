import React from 'react'
import styled from 'styled-components'
import io from "socket.io-client";

const socket = io.connect("http://13.125.188.9"); 

const Chat = (socket, username, room) => {
  const [currentMessage, setCurrentMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  // React.useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageList((list) => [...list, data]); 
  //   });
  // }, [socket]);


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };










  return (
    <ChatContainer>
      <div className='ChatBox'>
        <div className='oneBox'>
          <span> 2022년 06월 30일 목요일</span>
          <span> 별명님이 입장하셨습니다</span>
        </div>





        {messageList.map((messageContent)=>{
          return(
            <div className='ChatBar' id={username === messageContent.author ? "you" : "other"}>
            <div className='profile'>
              <div className='profile_one'></div>
            </div>
            <div className='two_container'>
              <div className='two_one'>{messageContent.author}</div>
              <div className='two_two'>
                <div className='longBox'>{messageContent.message}</div>
              </div>
            </div>
            <div className='three_container'>{messageContent.time}</div>
            </div>
          )
        })}










        <div className='InputBox'>
          <input type="text" value={currentMessage} onChange={(event) => {setCurrentMessage(event.target.value);}} 
        onKeyPress={(event) => {event.key === "Enter" && sendMessage();}}/>
          <span onClick={sendMessage}>보내기</span>
        </div>


      </div>
    </ChatContainer>
  )
}


const ChatContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
height: 100%;

.ChatBox{
  border:2px solid #E4E4E4;
  border-radius:30px;
  width:  620px;
  height: 730px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.oneBox{
  display:flex;
  flex-direction:column;
  padding:20px;
}

.oneBox > span {
  width:100%;
  text-align:center;
  color:#A8A8A8;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: 16px;
  line-height: 23px;
}
.profile_one{
  width:70px;
  height:70px;
  border:1px solid black;
  border-radius:50%;
  margin:auto;
}

.InputBox > input {
  width:80%;
  border-radius:30px;
  height: 35px;
  border:1px solid #A8A8A8;
}

.longBox{
  width:100%;
  border:1px solid #A8A8A8;
  border-radius:20px;
  height: 100%;
}

.InputBox > span{
  border:none;
  position: relative;
  right:63px;
  background-color: #fff;
  color:#6B4E16;
  font-weight:700;
  cursor: pointer;
}

.InputBox{
  text-align: center;
  padding:20px;
  position:relative;
  bottom:20px;
  left:30px;
}

.ChatBar{
  width:80%;
  height: 100px;

  display:flex;
}

.profile{
  width:20%;

  height:100%;
}

.two_container{
  width:60%;

  height:100%;
}

.three_container{
  width:20%;
  margin-left: 15px;
  height:100%;
  display: flex;
  align-items:flex-end;
  color:#A8A8A8;
}

.two_one{
  width:100%;
  height: 30%;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
}

.two_two{
  width:100%;
  height: 70%;
}

`
export default Chat