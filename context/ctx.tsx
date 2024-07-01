import { useContext, createContext, PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";


const AuthContext = createContext<{
    signIn: (token: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useSession(){
    const value = useContext(AuthContext);

    if (process.env.NODE_ENV !== 'production'){
        if (!value){
            throw new Error('useSession must be wrapped in a <SessionProvider/>')
        }
    }

    return value;
}


export function SessionProvider(props: PropsWithChildren){
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: (token: string) => {
                    //perform sign in logic here
                    setSession(token);
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}