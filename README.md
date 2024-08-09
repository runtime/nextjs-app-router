This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

> Note: This Project uses the Vercel AI SDK!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### RSC & Client Server Design Pattern

This project demos three components of the NextJS design pattern nd can be run two ways.
* Client only
* Server only
* [Current Build ] Server and Client.

### Routes
Routes are handled in JavaScript via the route.ts. There is one route, POST to the `openAI model`

#### Route.js
>/api/chat/route.ts


### Streaming Responses

uses streamText rather than block responses for a better user experience
```
 const result = await streamText({
    model: openai(`gpt-4-turbo`),
    messages,
  });
  ```

### Optional - Streaming Data
possible to add previews or other inline items such as images to rest data
`route.ts`
```python
  // stream extra data here
  const data = new StreamData();
  data.append({ test: 'value' });
```
add this to the await stream to show data
``` python
const result = await streamText({
    model: openai(`gpt-4-turbo`),
    messages,
    onFinish() {
      data.close();
    },
  });
```

## Use
> Currently the project is set up as Client <---> Server

### lets look at the differences. 


Without  the client using the `useChat`, direct from the api, you have to manage your own `state` using the `useState` hook to manage the user's input and messages, respectively. The biggest change in your implementation is how you manage the form submission behaviour:

* Define a new variable to house the existing messages and append the user's message.
* Update the messages state by passing newMessages to the setMessages function.
* Clear the input state with setInput("").
* Call your Server Action just like any other asynchronous function, passing the newMessages variable declared in the first step. This function will return a streamable value.
* Use an asynchronous for-loop in conjunction with the readStreamableValue function to iterate over the stream returned by the Server Action and read its value.
* Finally, update the messages state with the content streamed via the Server Action.
To learn more about Next.js, take a look at the following resources:

To run the project client only:
* comment out the top of the `client.ts` file, and uncomment the bottom of the client code.
* This will remove the dependency of the server from the client but still use the route.ts 

#### important changes in the design pattern when using state and the server architecture

you need to create a `actions.ts` that inits with `use server` and implements the calls to the UI, streamingText etc. In the code above, you first create a new variable to manage the state of the additional data (data). Then, you update the state of the additional data with setData(result.data). Just like that, you've sent additional data alongside the model's response.

>Its import to know that the 'use server' is called both at the top of the `actions.ts` as well as inside the `export const function`

The ai/rsc library is designed to give you complete control over streamable values. 

> This unlocks LLM applications beyond the traditional chat format.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [https://sdk.vercel.ai/docs/getting-started/nextjs-app-router] - a tutorial that covers the app router

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
