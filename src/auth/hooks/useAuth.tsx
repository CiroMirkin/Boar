import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useTranslation } from 'react-i18next'
import type { AuthUnknownError } from '@supabase/supabase-js'

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
			if (!isSupabaseConfigured || !supabase) {
				throw new Error('Supabase no configurado')
			}

			const { data, error } = isRegister
				? await supabase.auth.signUp({
						email: formState.email,
						password: formState.password,
					})
				: await supabase.auth.signInWithPassword({
						email: formState.email,
						password: formState.password,
					})

			if (error) throw error

			setIsSubmitted(true)
			return data
		}

		toast.promise(authPromise(), {
			loading: t('loading', { defaultValue: 'Cargando...' }),
			success: isRegister ? t('successful_log_in_toast') : t('sing_in_toast'),
			error: (error: AuthUnknownError) => {
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
			if (!isSupabaseConfigured || !supabase) {
				throw new Error('Supabase no configurado')
			}

			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: `${window.location.origin}/`,
				},
			})

			if (error) throw error

			setIsSubmitted(true)
			return data
		}

		toast.promise(authPromise(), {
			loading: t('loading', { defaultValue: 'Cargando...' }),
			success: t('sing_in_toast'),
			error: (error: AuthUnknownError) => {
				return error.message || t('auth_error', { defaultValue: 'Error de autenticación' })
			},
			finally: () => {
				setFormState((prev) => ({ ...prev, loading: false }))
			},
		})
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
		resetForm,
	}
}
