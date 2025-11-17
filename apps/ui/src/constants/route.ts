// apps/ui/src/constants/route.ts

export const ROUTES = {
    HOME: '/welcome',
    MANUFACTURERS: '/manufacturers',
    MANUFACTURER: '/manufacturer',
    RESULTS:'/results',
    // SIGNUP: '/signup',
    // DASHBOARD: '/dashboard',
    // PROFILE: '/profile',
    // SETTINGS: '/settings',
    HELP: '/help',
    NOT_FOUND: '/404',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];