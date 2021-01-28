import AsyncStorage from "@react-native-async-storage/async-storage"

export const saveStatusRestroom = (page: number) => {
    AsyncStorage.setItem('@storage_state_restroom', page.toString())
}

export const loadStatusRestroom = async (): Promise<number> => {
    const page = await AsyncStorage.getItem('@storage_state_restroom')
    return page ? Number(page) : 0
}