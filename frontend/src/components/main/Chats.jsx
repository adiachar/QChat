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
  const [lastMessage, setLastMessage] = useState("");
  const isNewThread = useRef(true);
  const lastMsgRef = useRef(null);

  useEffect(() => {
    let allMessages = threads[threadId].messages;
    let n = allMessages.length;

    setMessages(allMessages.slice(0, n - 1));
    setLastMessage(allMessages[n - 1].content);
    isNewThread.current = true;
  }, [threadId]);

  useEffect(() => {

    if(isNewThread.current == false) {
      setLastMessage("");

      let allMessages = threads[threadId].messages;
      let n = allMessages.length;

      if(allMessages[n - 1].role == "user") {
        setMessages(allMessages);
        return;
      }

      setMessages(allMessages.slice(0, n - 1));

      let wordsArr = allMessages[n - 1].content.split(" ");
      let idx = 0;

      let interval = setInterval(() => {
        setLastMessage(wordsArr.slice(0, idx).join(" "));   
        idx++;
        if(idx == wordsArr.length + 1) {
          clearInterval(interval);
        }
      }, 100);

    } else {
      isNewThread.current = false;
    }

  }, [threads]);

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({behavior: "smooth"});

  }, [lastMessage, messages, threadId]);

  return (
    <div className='w-full h-10/12 p-4 overflow-y-auto text-gray-300 text-lg'>
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
      {lastMessage ?
        <div ref={lastMsgRef} className='w-full mb-10 lg:pl-10 flex flex-col'>
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
          >{lastMessage}</ReactMarkdown>
        </div> :
        <div ref={lastMsgRef} className='loading lg:ml-10'>

        </div>}
    </div>
  )
}
