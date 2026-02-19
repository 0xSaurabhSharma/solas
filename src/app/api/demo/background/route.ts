import { inngest } from "@/inngest/client";

export const POST = async()=> {
    const data = await inngest.send({
        name: 'get/response',
        data: {}
    })

    return Response.json({'status':'started', 'data': data})
}