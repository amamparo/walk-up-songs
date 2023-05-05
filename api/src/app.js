import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import manage from './manage'
import { getAllClips } from './clipService'
import { getAllAssignments } from './assignmentService'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/manage', manage)

app.get('/clips', async (req, res) => {
	const clips = await getAllClips()
	const clipUrlLookup = clips.reduce(
		(accum, current) => {
			accum[current.name] = current.url
			return accum
		},
		{}
	)
	const assignments = await getAllAssignments()
	const usedClips = assignments.map(x => x.clipName)
	res.json({
		assignments: assignments.map(({ name, clipName }) => ({
			name,
			url: clipUrlLookup[clipName]
		})),
		extras: clips
			.filter(x => !usedClips.includes(x.name))
			.map(({ name, url }) => ({ name, url }))
	})
})

const errorHandler = (err, req, res, next) => {
	console.error(err.stack)
	res.status(500).json({})
}
app.use(errorHandler)

export default app
