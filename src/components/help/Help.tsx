import { Header, USER_IS_IN } from "../Header";

export function Help(){
    return (
        <>
            <Header title="Ayuda" whereUserIs={USER_IS_IN.HELP} />
            <p>aaaaaa</p>
        </>
    )
}