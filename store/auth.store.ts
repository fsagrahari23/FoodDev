import {create} from 'zustand';
import {User} from '@/type'
import {getCurrentUser, logout} from "@/lib/appwrite";

type AuthState = {
    isAuthenticated:boolean;
    user:User|null;
    isLoading:boolean;

    setIsAuthenticated:(value:boolean) =>void;
    setUser: (user:User|null) => void;
    setLoading:(loading:boolean) =>void;

    fetchAuthUser():Promise<void>;
    logout: () => Promise<void>;


}
const useAuthStore = create<AuthState>((set)=>( {
        isAuthenticated:  false,
        user:  null,
        isLoading:  false,

        setIsAuthenticated:(value) => set({isAuthenticated:value}),
        setUser:(user)=>set({user}),
        setLoading:(loading)=> set({isLoading:loading}),

        fetchAuthUser: async ()=>{
            set({isLoading:true});
            try{
              const user = await getCurrentUser();
              if(user) set({isAuthenticated:true,user:user as User});
              else set({isAuthenticated:false,user:null});
            }catch (error) {
                console.error(error);
                set({isAuthenticated:false,user:null});
            }finally {
                set({isLoading:false});
            }
        },
        logout: async () => {
            try {
                await logout() ;
                set({ isAuthenticated: false, user: null });
            } catch (err) {
                console.error('Logout error:', err);
                throw new Error('Logout failed');
            }
        },

    }
))

export default useAuthStore;
