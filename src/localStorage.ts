import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export const localStorageKey = 'boar-columns'

export function SaveDataInLocalStorage (): void {
    const columns = useSelector((state: RootState) => state.columns)
    localStorage.setItem(localStorageKey, JSON.stringify(columns))
}