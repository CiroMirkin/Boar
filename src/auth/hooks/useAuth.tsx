'use client'

import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { signIn, signOut } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

interface FormState {
	loading: boolean
	email: string
	password: string
}

export interface AuthFormData {
	email: string
	password: string
	setEmail: (email: string) => void
	setPassword: (password: string) => void
}

export function useAuth(isRegister: boolean, setIsSubmitted: (submitted: boolean) => void) {
	const [formState, setFormState] = useState<FormState>({
		loading: false,
		email: '',
		password: '',
	})

	const { t } = useTranslation()

	const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setFormState((prev) => ({ ...prev, loading: true }))

		const authPromise = async () => {
			if (isRegister) {
				// Registration: call our API route that creates user with Prisma then signs in
				const res = await fetch('/api/auth/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: formState.email,
						password: formState.password,
					}),
				})
				if (!res.ok) {
					const data = await res.json()
					throw new Error(data.error || 'Error al registrarse')
				}
				// Auto sign-in after registration
				const result = await signIn('credentials', {
					email: formState.email,
					password: formState.password,
					redirect: false,
				})
				if (result?.error) throw new Error(result.error)
			} else {
				const result = await signIn('credentials', {
					email: formState.email,
					password: formState.password,
					redirect: false,
				})
				if (result?.error) throw new Error(result.error)
			}

			setIsSubmitted(true)
		}

		toast.promise(authPromise(), {
			loading: t('loading', { defaultValue: 'Cargando...' }),
			success: isRegister ? t('successful_log_in_toast') : t('sing_in_toast'),
			error: (error: Error) => {
				return error.message || t('auth_error', { defaultValue: 'Error de autenticación' })
			},
			finally: () => {
				setFormState((prev) => ({ ...prev, loading: false }))
			},
		})
	}

	const setEmail = (email: string) => {
		setFormState((prev) => ({ ...prev, email }))
	}

	const setPassword = (password: string) => {
		setFormState((prev) => ({ ...prev, password }))
	}

	const handleGitHubAuth = async () => {
		setFormState((prev) => ({ ...prev, loading: true }))

		const authPromise = async () => {
			await signIn('github', { callbackUrl: '/' })
			setIsSubmitted(true)
		}

		toast.promise(authPromise(), {
			loading: t('loading', { defaultValue: 'Cargando...' }),
			success: t('sing_in_toast'),
			error: (error: Error) => {
				return error.message || t('auth_error', { defaultValue: 'Error de autenticación' })
			},
			finally: () => {
				setFormState((prev) => ({ ...prev, loading: false }))
			},
		})
	}

	const handleSignOut = async () => {
		await signOut({ callbackUrl: '/auth' })
	}

	const resetForm = () => {
		setFormState((prev) => ({ ...prev, email: '', password: '' }))
	}

	const formData: AuthFormData = {
		email: formState.email,
		password: formState.password,
		setEmail,
		setPassword,
	}

	return {
		loading: formState.loading,
		formData,
		handleAuth,
		handleGitHubAuth,
		handleSignOut,
		resetForm,
	}
}
