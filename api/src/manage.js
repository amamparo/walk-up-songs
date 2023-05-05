import { Router } from 'express'
import s3 from './s3'
import { getAllClips } from './clipService'
import { deleteAssignment, deleteAssignmentsWithClip, getAllAssignments, putAssignment } from './assignmentService'

const manage = Router()

manage.get('/', async (req, res) => {
	res.json({
		clips: await getAllClips(),
		assignments: await getAllAssignments()
	})
})

manage.delete('/clip/:name', async (req, res) => {
	const clipName = req.params.name
	await deleteAssignmentsWithClip(clipName)
	await s3.deleteObject(`clips/${clipName}.mp3`)
	res.status(204).send()
})

manage.get('/upload/:key', async (req, res) => {
	res.json({
		url: await s3.getPreSignedUploadUrl(`clips/${req.params.key}`)
	})
})

manage.post('/assignment', async (req, res) => {
	const { name, clipName } = req.body
	await putAssignment(name, clipName)
	res.status(204).send()
})

manage.delete('/assignment/:name', async (req, res) => {
	await deleteAssignment(req.params.name)
	res.status(204).send()
})

export default manage
