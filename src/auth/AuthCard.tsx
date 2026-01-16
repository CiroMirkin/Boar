import { useState } from 'react'
import { Navigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/molecules/card'
import { Button } from '@/ui/atoms/button'
import { AuthForm } from './components/AuthForm'
import { useAuth } from './hooks/useAuth'
import { useDefaultBoardCheck } from './hooks/useDefaultBoardCheck'

export default function AuthCard() {
	const [isRegister, setIsRegister] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const { t } = useTranslation()

	useDefaultBoardCheck()

	const { loading, email, setEmail, password, setPassword, handleAuth, resetForm } = useAuth(
		isRegister,
		setIsSubmitted
	)

	const toggleAuthMode = () => {
		setIsRegister(!isRegister)
		resetForm()
	}

	if (isSubmitted) {
		return <Navigate to='/' replace />
	}

	const title = isRegister ? t('log_in_form_title') : t('sing_in')
	const toggleText = isRegister ? t('already_have_an_account') : t('dont_have_an_account')

	return (
		<Card className='rounded-lg px-6 py-2'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<AuthForm
					isRegister={isRegister}
					loading={loading}
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					onSubmit={handleAuth}
				/>
			</CardContent>
			<CardFooter>
				<Button onClick={toggleAuthMode} variant='link' disabled={loading} type='button'>
					{toggleText}
				</Button>
			</CardFooter>
		</Card>
	)
}
