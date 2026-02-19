import { inngest } from "@/inngest/client"; 
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';


// export const helloWorld = inngest.createFunction(
//     { id: "hello-world" },
//     { event: "test/hello.world" },
//     async ({ event, step }) => {
//         await step.sleep("wait-a-moment", "4s");
//         return { message: `Hello ${event.data.email}!` };
//     },
// );

// export const getResponse = inngest.createFunction(
//     { id: "get-response" },
//     { event: "get/response" },
//     async () => {
//         const response = await generateText({
//             model: google('gemini-2.5-flash'),
//             prompt: 'how to not take ourself seriouly ? in one sentence.',
//         });
//         return { response }
//     }
// )

export const getResponse = inngest.createFunction(
    { id: "get-response" },
    { event: "get/response" },
    async ({ step }) => {
        return await step.run('generate-text', async () => {
            const result = await generateText({
                model: google('gemini-2.5-flash'),
                prompt: 'how to not take ourself seriouly ? in one sentence.',
            });
            return { response: result };
        });
    }
)