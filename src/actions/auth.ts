import { auth } from '../../auth'

export async function requireAuth() {
	const session = await auth()
	if (!session?.user?.id) throw new Error('No autorizado')
	return session.user.id
}
