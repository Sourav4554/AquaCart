import React,{useContext, useState}from 'react'
import 'animate.css'
import './AquaAi.css'
import axios from 'axios'
import { ProductContext } from '../../Context/ProductContext'
import { toast } from 'react-toastify'
const AquaAi = () => {
    const{backendUrl,token}=useContext(ProductContext)
    const [messages, setMessages] = useState([
        { text: "Hello! I am a Specialized AI for Aquatic Queries! How can I assist you today?", sender: "bot" }
      ]);
      const [input, setInput] = useState("");
      const [loading, setLoading] = useState(false);

      const sendMessage=async()=>{
        if(!token){
        toast.info('Please Login before using Aqua ai');
        return;
        }
        if(!input.trim()){
        return;
        }
        const usermesssage={text:input,sender:'user'}
        setMessages((prev)=>([...prev,usermesssage]))
        setInput("");
        setLoading(true);
        try {
        const {data}=await axios.post(`${backendUrl}/api/ai/answer`,{question:input})
        if(data.success){
            setMessages((prev) => [...prev, { text: data.message, sender: "bot" }]);
        }
        else{
            setMessages((prev) => [...prev, { text: data.message, sender: "bot" }]);
        }
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [...prev, { text: "An error occurred.", sender: "bot" }]);
        }
        setLoading(false);
        }
        const renderMessage = (text) => {
            return { __html: text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>") };
          };
          
  return (
   <div className='chat-boat-maincontainer'>
     <div className="chatbot-container">
    {/* Chat Window */}
   
      <div className="chat-header">
        <h3>AQUA AI </h3>
      </div>
      <div className="chat-window">
      <div className="chat-messages">
      {messages.map((msg, index) => (
                 <div key={index} className={`message ${msg.sender}-message`}>
                  <p dangerouslySetInnerHTML={renderMessage(msg.text)} />
                  </div>
        ))}
             {loading && <div className="message bot-message loading ">
               <p className=' animate__animated animate__fadeIn animate__infinite'>.............</p>
               <p className=' animate__animated animate__fadeIn animate__infinite'>......................</p>
               <p className=' animate__animated animate__fadeIn animate__infinite'>.................................</p>
                </div>}
      </div>
    </div>

    {/* Input Area */}
    <div className="chat-input">
      <input type="text" placeholder="Type your message..."
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button className="send-button" onClick={sendMessage}>
        <span role="img" aria-label="send" >✉️</span>
      </button>
    </div>
  </div>
   </div>
  )
}

export default AquaAi