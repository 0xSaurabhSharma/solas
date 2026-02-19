import {mutation, query} from "./_generated/server"
import {v} from "convex/values"

export const create = mutation({
  args: {
    name: v.string()
  }, 
  handler: async (ctx, args) => {

    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      throw new Error("Unauthorized")
    }
    await ctx.db.insert("projects", {
      name: args.name,
      ownerId: user.subject
    })
  }
})

export const get = query({
  args: {},
  handler: async (ctx, args) => {

    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      return []
    }

    return await ctx.db
    .query("projects")
    .withIndex("by_owner", (q)=> q.eq("ownerId", user.subject))
    .collect()
  }
})