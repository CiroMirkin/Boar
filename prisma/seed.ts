import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const eisenhowerTags = [
	{ id: '1', name: '', variant: 'purple-subtle', priority: 2 },
	{ id: '2', name: '', variant: 'green-subtle', priority: 3 },
	{ id: '3', name: '', variant: 'red-subtle', priority: 1 },
]

const devTags = [
	{ id: 'Importante', name: '', variant: 'purple-subtle', priority: 2 },
	{ id: 'Necesario', name: '', variant: 'green-subtle', priority: 3 },
	{ id: 'Urgente', name: '', variant: 'red-subtle', priority: 1 },
	{ id: 'Explorar', name: '', variant: 'blue-subtle' },
	{ id: 'Resolver', name: '', variant: 'amber-subtle', priority: 2 },
]

async function main() {
	console.log('Seeding default TagGroups...')

	await prisma.tagGroup.upsert({
		where: { id: 'Eisenhower' },
		update: { tags: eisenhowerTags, name: 'Eisenhower' },
		create: { id: 'Eisenhower', name: 'Eisenhower', tags: eisenhowerTags },
	})

	await prisma.tagGroup.upsert({
		where: { id: 'Dev' },
		update: { tags: devTags, name: 'Dev' },
		create: { id: 'Dev', name: 'Dev', tags: devTags },
	})

	console.log('Seeding complete.')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
