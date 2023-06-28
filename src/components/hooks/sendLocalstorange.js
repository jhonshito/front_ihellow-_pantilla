
export function useSendLocalStorange(key, value){
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error)
    }
}

export function useGetLocalStorange(key){
    try {
        const local = JSON.parse(localStorage.getItem(key));
        return local

    } catch (error) {
        console.log(error)
    }
}