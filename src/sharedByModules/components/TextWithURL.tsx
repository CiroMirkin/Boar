interface TextWithURLProps {
	text: string
}

/** Si existen URLs dentro del texto recibido estas se convertirán en enlaces sobre los cuales el usuario podrá hacer click. */
export function TextWithURL({ text }: TextWithURLProps) {
	const splitText = text.split(' ')

	if (splitText.length == 1 && isValidURL(splitText[0])) {
		// Si el texto recibido es solo un enlace entonces:
		const url = splitText[0]
		return (
			<>
				<a href={url} target='_blank' className='text-blue-600 hover:underline'>
					{ addSpacesAfterSlashes(url) }
				</a>
			</>
		)
	}

	const textWithURL: React.ReactNode = splitText.map((text, tIndex) => {
		// Se buscan y convierten todos los enlaces en el texto recibido.
		if (isValidURL(text)) {
			return (
				<span key={text + tIndex}>
					{' '}
					<a href={text} target='_blank' className='text-blue-600 hover:underline'>
						{ addSpacesAfterSlashes(text) }
					</a>{' '}
				</span>
			)
		}
		return <span key={text + tIndex}>{text} </span>
	})

	return <>{textWithURL}</>
}

const isValidURL = (urlString: string): boolean => {
	const patronURL = new RegExp(
		// valida protocolo
		'^(https?:\\/\\/)?' +
			// valida nombre de dominio
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
			// valida OR direccion ip (v4)
			'((\\d{1,3}\\.){3}\\d{1,3}))' +
			// valida puerto y path
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
			// valida queries
			'(\\?[;&a-z\\d%_.~+=-]*)?' +
			// valida fragment locator
			'(\\#[-a-z\\d_]*)?$',
		'i'
	)
	return !!patronURL.test(urlString)
}

function addSpacesAfterSlashes(url: string): string {
  const [protocol, ...rest] = url.split('://')
  const remainingUrl = rest.join('://')
  
  // Agregar espacios despues de cada / despues del protocolo
  let urlWithSpaces = remainingUrl.replace(/\//g, '/ ')
  
  // Agregar espacios en cadenas largas de letras/numeros (mas de 12 caracteres)
  urlWithSpaces = urlWithSpaces.replace(/[a-zA-Z0-9]{13,}/g, (match) => {
    return match.replace(/(.{12})/g, '$1 ').trim()
  })
  
  return `${protocol}://${urlWithSpaces}`
}