import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGmf from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github.css";

export default function Chats() {
  const threads = useSelector(state => state.threads);
  const threadId = useSelector(state => state.threadId);
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState({role: "", content: ""});
  const isNewThread = useRef(true);
  const lastMsgRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    isNewThread.current = true;

    //If the user changes the threadId while previous interval is happenning, the below code block will clear that interval.
    if(intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let allMessages = threads[threadId].messages;
    let n = allMessages.length;
    
    if(allMessages[n - 1].role == "user") {
      setMessages(allMessages);
      setLastMessage({role: "assistant", content: ""});
    }
    else {
      setMessages(allMessages.slice(0, n - 1));
      setLastMessage(allMessages[n - 1]);
    }
    
  }, [threadId]);

  useEffect(() => {

    if(isNewThread.current == false) {

      let allMessages = threads[threadId].messages;
      let n = allMessages.length;

      if(allMessages[n - 1].role == "user") {
        setMessages(allMessages);
        setLastMessage({role: "ai", content: ""});
        return;
      }

      setMessages(allMessages.slice(0, n - 1));

      let wordsArr = allMessages[n - 1].content.split(" ");
      let idx = 0;

      intervalRef.current = setInterval(() => {
        setLastMessage({role: 'ai', content: wordsArr.slice(0, idx).join(" ")});   
        idx++;
        if(idx == wordsArr.length + 1) {
          clearInterval(intervalRef.current);
        }
      }, 60);

    } else {

      isNewThread.current = false;
    }

  }, [threads]);

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({behavior: "smooth"});

  }, [lastMessage, messages, threadId]);

  return (
    <div className='w-full h-9/12 p-4 lg:pl-20 lg:pr-20 overflow-y-auto text-gray-300 text-lg'>
      {
        messages.map((obj, idx) => (
          obj.role == "user" ?
          <div key={idx} className='w-full mb-4 flex justify-end'>
            <p 
              style={{backgroundColor: "#0a0a23"}}
              className='min-w-30 p-2 rounded-xl text-center'>{obj.content}</p>
          </div> :
          <div key={idx} className='w-full mb-10 lg:pl-10 flex flex-col'>
            <ReactMarkdown
              remarkPlugins={[remarkGmf]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                p: ({node, ...props}) => (
                  <p className='leading-relaxed mb-4' {...props}/>
                ),
                h1: ({node, ...props}) => (
                  <h1 className='text-3xl font-bold mt-6 mb-2' {...props}/>
                ),
                h2: ({node, ...props}) => (
                  <h1 className='text-3xl font-semibold mt-5 mb-2' {...props}/>
                ),
                ul: ({node, ...props}) => (
                  <ul className='list-disc ml-6 my-4' {...props}/>
                ),
                li: ({node, ...props}) => (
                  <li className='mb-4' {...props} />
                ),
              }}
            >{obj.content}</ReactMarkdown>
          </div>
        ))
      }
      {lastMessage.content ? (lastMessage.role != 'user' ?
        <div className='w-full mb-10 lg:pl-10 flex flex-col'>
          <ReactMarkdown
            remarkPlugins={[remarkGmf]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              p: ({node, ...props}) => (
                <p className='leading-relaxed mb-4' {...props}/>
              ),
              h1: ({node, ...props}) => (
                <h1 className='text-3xl font-bold mt-6 mb-2' {...props}/>
              ),
              h2: ({node, ...props}) => (
                <h1 className='text-3xl font-semibold mt-5 mb-2' {...props}/>
              ),
              ul: ({node, ...props}) => (
                <ul className='list-disc ml-6 my-4' {...props}/>
              ),
              li: ({node, ...props}) => (
                <li className='mb-4' {...props} />
              ),
            }}
          >{lastMessage.content}</ReactMarkdown> 
        </div> : 

        <div className='w-full mb-4 flex justify-end'>
            <p 
              style={{backgroundColor: "#0a0a23"}}
              className='min-w-30 p-2 rounded-xl text-center'>{lastMessage.content}</p>
        </div>) :

        <div className='loading lg:ml-10'>

        </div>}
        <div ref={lastMsgRef}>

        </div>
    </div>
  )
}
