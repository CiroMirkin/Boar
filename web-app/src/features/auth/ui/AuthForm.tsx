import { type FormEvent } from 'react'
import { Button } from '@/shared/ui/atoms/button'
import { Input } from '@/shared/ui/atoms/input'
import { Label } from '@/shared/ui/atoms/label'
import { PasswordInput } from '@/shared/ui/molecules/password-input'
import { useTranslation } from 'react-i18next'
import type { AuthFormData } from '../hooks/useAuth'

interface AuthFormProps {
	isRegister: boolean
	loading: boolean
	formData: AuthFormData
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function AuthForm({ isRegister, loading, formData, onSubmit }: AuthFormProps) {
	const { t } = useTranslation()

	const submitText = loading
		? t('loading', { defaultValue: 'Cargando...' })
		: isRegister
			? t('log_out_btn')
			: t('sing_in')

	return (
		<form onSubmit={onSubmit} className='flex flex-col justify-evenly gap-4'>
			<div className='space-y-2'>
				<Label htmlFor='email'>{t('email')}</Label>
				<Input
					id='email'
					type='email'
					name='email'
					value={formData.email}
					onChange={(e) => formData.setEmail(e.target.value)}
					disabled={loading}
					autoComplete='email'
					required
					aria-required='true'
				/>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='password'>{t('password')}</Label>
				<PasswordInput
					id='password'
					name='password'
					value={formData.password}
					onChange={(e) => formData.setPassword(e.target.value)}
					disabled={loading}
					autoComplete={isRegister ? 'new-password' : 'current-password'}
					minLength={6}
					required
					aria-required='true'
				/>
			</div>
			<div>
				<Button type='submit' disabled={loading} className='w-full' aria-busy={loading}>
					{submitText}
				</Button>
			</div>
		</form>
	)
}
