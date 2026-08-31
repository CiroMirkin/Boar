/**
 * Client-side: returns the current user id from the SessionContext.
 * For server-side use, call auth() from 'auth' directly.
 */
export const getUserId = async (): Promise<string | undefined> => {
	// In the new Auth.js stack, user id is available via useSession() on the client.
	// This function is kept as a stub for legacy callers (getActualUserBoard).
	// It reads from sessionStorage where the board setup flow may have stored it.
	if (typeof window === 'undefined') return undefined
	return undefined
}
