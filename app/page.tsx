'use client';

import { type CoreMessage } from 'ai'
import {useState} from 'react';
import { continueConversation } from './actions';
import { readStreamableValue } from 'ai/rsc';

// Allow screaming responses up to 30 seconds
export const masDuration = 30;
export default function Chat() {
    const [messages, setMessages] = useState<CoreMessage[]>([]);
    const [input, setInput] = useState('');
    const [data, setData] = useState<any>();

    console.log('[page] messages: ', messages);

    return (
        <div className="flex flex-col w-full max-w-lg py-24 mx-auto stretch">
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {messages.map((message, i) => (
                <div key={i} className="whitespace-pre-wrap">
                    {message.role === 'user' ? 'User: ' : 'AI: '}
                    {message.content as string}
                </div>
            ))}

            <form
                onSubmit={async e => {
                    e.preventDefault();
                    const newMessages: CoreMessage[] = [
                        ...messages,
                        { content: input, role: 'user'},
                    ];

                    // set state wit new messages array consists of messages and content and role
                    setMessages(newMessages);
                    //clear the input
                    setInput('');

                    const result = await continueConversation(newMessages);
                    setData(result.data)

                    for await (const content of readStreamableValue(result.message)) {
                        setMessages([
                            ...newMessages,
                            {
                                role: 'assistant',
                                content: content as string,
                            },
                        ]);
                    }
                }}
                >
                 <input
                     type={"text"}
                     className="fixed bottom-0 w-full max-w-lg p-2 mb-8 border text-gray-900 border-gray-300 margin-top 30 rounded shadow-xl"
                     value={input}
                     onChange={e => setInput(e.target.value)}
                     placeholder="Say something..."
                 />
                 {/*<button type="submit">Send</button>*/}
            </form>
        </div>
    );
}

// uncomment below to use this as a client only openai LLM chatgpt 4 turbo interface

// 'use client';
//
// import { useChat } from 'ai/react'
//
// export default function Chat() {
//     const {messages, input, handleInputChange, handleSubmit, data} = useChat();
//     return (
//
//             <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
//                 {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//                 {messages.map(message => (
//                     <div key={message.id} className="whitespace-pre-wrap">
//                         {message.role === 'user' ? 'User: ' : 'AI: '}
//                         {message.content}
//                     </div>
//                 ))}
//
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type={"text"}
//                         className="fixed bottom-0 w-full max-w-md p-2 mb-8 border text-gray-900 border-gray-300 margin-top 30 rounded shadow-xl"
//                         value={input}
//                         onChange={handleInputChange}
//                         placeholder="Say something..."
//                     />
//                     {/*<button type="submit">Send</button>*/}
//                 </form>
//         </div>
//     )
// }




