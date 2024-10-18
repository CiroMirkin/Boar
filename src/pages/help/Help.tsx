import { Separator } from '@/ui/separator'
import { DescriptionOfBoar } from '../DescriptionOfBoar'
import { Header } from '../Header'
import { USER_IS_IN } from '../userIsIn'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion'
import { Button } from '@/ui/button'
import { Github } from 'lucide-react'
import { iconSize } from '@/configs/iconsConstants'

export function Help() {
	return (
		<>
			<Header title='Ayuda' whereUserIs={USER_IS_IN.HELP} />
			<div className='w-full px-6 md:px-11'>
				<section className='mb-4'>
					<h2 className='mb-2 text-2xl'>¿Que es Boar?</h2>
					<DescriptionOfBoar />
				</section>
				<Separator />
				<section className='my-4'>
					<h2 className='text-2xl'>Tablero</h2>
					<Accordion type='single' collapsible>
						<AccordionItem value='item-1'>
							<AccordionTrigger>¿Se guardan las tareas?</AccordionTrigger>
							<AccordionContent>
								<p>Las tareas y ajustes del tablero se guardan localmente.</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-2'>
							<AccordionTrigger>¿Como puedo mover una tarea?</AccordionTrigger>
							<AccordionContent>
								<p>
									Puedes mover una tarea primero haciendo click sobre ella y luego
									haciendo click sobre las opciones de movimiento
									(Avanzar/Retroceder).
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-3'>
							<AccordionTrigger>La columna esta llena</AccordionTrigger>
							<AccordionContent>
								<p>
									Las columnas del tablero tienen un límite de diez (10) tareas.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>
				<section className='mb-4'>
					<h2 className='mb-2 text-2xl'>Archivo</h2>
					<Accordion type='single' collapsible>
						<AccordionItem value='item-1'>
							<AccordionTrigger>¿Para que es el archivo?</AccordionTrigger>
							<AccordionContent>
								<p>
									El archivo permite mantener limpio el tablero y al mismo tiempo
									tener un registro de las tareas terminadas.
								</p>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-2'>
							<AccordionTrigger>¿El archivo tiene un limite?</AccordionTrigger>
							<AccordionContent>
								<p>
									Si, el archivo tiene un limite de sesenta (60) días y por dia
									hay un limite de treinta (30) tareas.
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>
				<section className='mb-4'>
					<h2 className='mb-2 text-2xl'>¿Ha encontrado un problema?</h2>
					<a href='https://github.com/CiroMirkin/Boar/issues' target='_blank'>
						<Button variant='link' className='pl-0'>
							<Github size={iconSize} className='mr-2' /> Reportalo
						</Button>
					</a>
				</section>
			</div>
		</>
	)
}
