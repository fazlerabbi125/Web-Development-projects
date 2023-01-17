export interface AppRoutesType {
    guestRoutes: string[];
    adminRoutes: string[];
    userRoutes: string[];
    protectedRoutes: string[];
}

const guestRoutes = {
    signIn: "/sign-in",
}

const adminRoutes = {

}

const userRoutes = {

}

const protectedRoutes = { ...adminRoutes, ...userRoutes };

const appRoutes: AppRoutesType = {
    guestRoutes: Object.values(guestRoutes),
    adminRoutes: Object.values(adminRoutes),
    userRoutes: Object.values(userRoutes),
    protectedRoutes: Object.values(protectedRoutes)
}

export { protectedRoutes, adminRoutes, userRoutes }

export default appRoutes;