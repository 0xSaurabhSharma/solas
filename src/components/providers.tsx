'use client';

import { ReactNode } from 'react'
import { ClerkProvider, SignInButton, SignOutButton, SignUpButton, useAuth, UserButton } from '@clerk/nextjs';
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

import { ThemeProvider } from './theme-provider';
import { User } from '@clerk/nextjs/server';
import { UnauthenticatedView } from '@/features/auth/components/unauthenticated-view';
import { AuthLoadingView } from '@/features/auth/components/auth-loading-view';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem
                    disableTransitionOnChange
                >
                    <Authenticated>
                        <UserButton></UserButton>
                        <SignOutButton></SignOutButton>
                        {children}
                    </Authenticated>

                    <Unauthenticated>
                        <UnauthenticatedView />
                    </Unauthenticated>
                    
                    <AuthLoading>
                        <AuthLoadingView />
                    </AuthLoading>
                </ThemeProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}