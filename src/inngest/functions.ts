import { inngest } from "@/inngest/client";
import { firecrawl } from "@/lib/firecrawl";
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

const URL_REGEX = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const getResponse = inngest.createFunction(
    { id: "get-response" },
    { event: "get/response" },
    async ({ event, step }) => {

        // prompt -> urls -> crawl url -> final_prompt -> invoke

        const { prompt } = event.data as { prompt: string; }

        const urls = await step.run('extract-urls', async () => {
            return prompt.match(URL_REGEX) ?? [];
        }) as string[];

        const scrapedContent = await step.run('scrape-urls', async () => {
            const results = await Promise.all(
                urls.map(async (url) => {
                    const res = await firecrawl.scrape(
                        url,
                        { formats: ['markdown'] }
                    );
                    return res.markdown ?? null;
                })
            );
            return results.filter(Boolean).join('\n\n')
        })

        const finalPrompt = scrapedContent
            ? `${prompt}\n\nScraped Content:\n\n${scrapedContent}`
            : prompt;

        return await step.run('generate-text', async () => {
            const result = await generateText({
                model: google('gemini-2.5-flash'),
                prompt: finalPrompt,
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true,
                },
            });
            return { response: result };
        });
    }
)


export const demoError = inngest.createFunction(
    { id: "demo-error" },
    { event: "demo/error" },
    async ({ step }) => {
        await step.run("fail", async () => {
            throw new Error("Inngest error: Background job failed!");
        });
    }
);