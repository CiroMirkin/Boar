
interface TextWithURLProps {
    text: string
}

export function TextWithURL({ text }: TextWithURLProps) {
    const splitText = text.split(' ')

    if(splitText.length == 1 && isValidURL(splitText[0])) {
        const url = splitText[0]
        return (
            <>
                Enlace: <a href={url} target="_blank" className="text-blue-600 hover:underline">{url}</a>
            </>
        )
    }

    const textWithURL: React.ReactNode = splitText.map((t, tIndex) => {
        if (isValidURL(t)) {
            return <span key={t+tIndex}> <a href={t} target="_blank" className="text-blue-600 hover:underline">{t}</a> </span>
        } 
        return <span key={t+tIndex}>{ t } </span>
    })
    return (
        <>{ textWithURL }</>
    )
}
const isValidURL = (urlString: string): boolean => {
    const patronURL = new RegExp(
      // valida protocolo
      '^(https?:\\/\\/)?'+
      // valida nombre de dominio
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      // valida OR direccion ip (v4)
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      // valida puerto y path
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      // valida queries
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      // valida fragment locator
      '(\\#[-a-z\\d_]*)?$','i'); 
    return !!patronURL.test(urlString);
}