import { defineStore } from "pinia";

export const userStorage = defineStore('user',
    {
        state: () => ({
            user: null
        }),
        getters: {
            fullName: (state) => state.user?.fullName || ''
        },
        actions: {
            setUser(userData){
                this.user = userData;
                sessionStorage.setItem('userLogin', JSON.stringify(userData));
            },
            clearUser(){
                this.user = null;
                sessionStorage.removeItem('userLogin');
            },
            loadUser(){
                const userSaved = sessionStorage.getItem('userLogin');
                if(userSaved){
                    this.user = JSON.parse(userSaved)
                }
            }
        }
    }
)