import { MutationCtx, QueryCtx } from "./_generated/server";

export const verifyAuth = async (ctx: QueryCtx | MutationCtx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error('Unauthhorized')
    }

    return identity;
}


export const getUserId = (identity: any): string => {
    // Clerk stores the user ID in `subject`. 
    // `tokenIdentifier` is included as a safe fallback for older Convex setups.
    const userId = identity.subject || identity.tokenIdentifier;

    if (!userId) {
        throw new Error("Could not find Clerk User ID in the auth token.");
    }

    return userId;
};