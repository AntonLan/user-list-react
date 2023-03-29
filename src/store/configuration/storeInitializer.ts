import UserStore from '@/store/UserStore'


function initializeStores() {
    return {
        userStore: new UserStore(),
    };
}

export const stores = initializeStores()
