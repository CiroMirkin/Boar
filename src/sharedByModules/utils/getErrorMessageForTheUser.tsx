import BusinessError from '@/sharedByModules/errors/businessError'

function getErrorMessageForTheUser(error: unknown): string {
	if (error instanceof BusinessError) {
		return error.message
	} else {
		console.error(error)
		return 'Lo sentimos, hubo un error imprevisto :('
	}
}

export default getErrorMessageForTheUser
