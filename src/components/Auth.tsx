import { useEffect, useRef, useState, type FormEvent } from 'react' 
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { Label } from '@/ui/label'
import type { AuthUnknownError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase' 
import { toast } from "sonner"
import { Header } from '@/sharedByModules/Header/Header' 
import { USER_IS_IN } from '@/sharedByModules/Header/userIsIn' 
import { useTheme } from "@/App"
import { Navigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { checkIfUserHasTheDefaultBoard } from '@/sharedByModules/hooks/useSyncUserBoard'

export default function Auth() {
  const [loading, setLoading] = useState(false) 
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 

  const [isRegister, setIsRegister] = useState(false) 
  const [ isSubmitted, setIsSubmitted] = useState(false)

  const { t } = useTranslation()

  const showToast = useRef<boolean>(true) 
  useEffect(() => {
    const showAlertIfUserDoesntHaveTheDefaultBoard = async () => {
      const hasUserDefaultBoard = await checkIfUserHasTheDefaultBoard()
      // El usuario no tiene el tablero por defecto antes de iniciar sesion.
      if(!hasUserDefaultBoard) {
        const toastText = 'El tablero actual se perderá si inicia sesión, para conservarlo debe crear una nueva cuenta.'
        toast.warning(toastText)
      }
    }
    if(showToast.current) {
      showToast.current = false
      showAlertIfUserDoesntHaveTheDefaultBoard()
    }
  }, [])

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    setLoading(true) 
    
    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        }) 
        if (error) throw error 

        toast.success(t('successful_log_in_toast'))
      } 
      else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        }) 
        if (error) throw error 
       
        toast.success(t('sing_in_toast'))
        setIsSubmitted(true)
      }
    } catch (error) {
      const authError = error as AuthUnknownError
      toast.error(authError.message)
      console.error(error) 
    } finally {
      setLoading(false) 
    }
  } 

  if(isSubmitted) {
    return (
      <Navigate to='/' replace />
    )
  }

  const { bg, text } = useTheme()
  
  return (
    <div className={`${bg} ${text}`}>
      <Header title='Boar' whereUserIs={USER_IS_IN.AUTH} />
      <main className='w-full min-h-[calc(100vh-5rem)] grid place-items-center'>
        <Card className='rounded-lg px-6 py-2'>
          <CardHeader>
            <CardTitle>{isRegister ? t('log_in_form_title') : t('sing_in')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className='flex flex-col justify-evenly gap-4'>
              <div>
                <Label htmlFor="email" className='mb-2'>{ t('email') }</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className='mb-2'>{ t('password') }</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Cargando...' : (isRegister ? t('log_out_btn') : t('sing_in'))}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsRegister(!isRegister)} variant='link' >
              {isRegister ? t('already_have_an_account') : t('dont_have_an_account')}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}