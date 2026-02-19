import { google } from '@ai-sdk/google';
import { generateText } from 'ai';



export const POST = async () => {
    const response = await generateText({
        model: google('gemini-2.5-flash'),
        prompt: 'utter 4 words in chinese, but write in english, and give meaning.',
    });

    return Response.json({response})
}
