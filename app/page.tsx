'use client';

import {useChat} from 'ai/react'

export default function Chat() {
    const {messages, input, handleInputChange, handleSubmit} = useChat();
    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {messages.map(message => (
                <div key={message.id} className="whitespace-pre-wrap">
                    {message.role === 'user' ? 'User: ' : 'AI: '}
                    {message.content}
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Say something..."
                />
                {/*<button type="submit">Send</button>*/}
            </form>
        </div>
    );
}

 // messages.map((message) => console.log(message.content));

