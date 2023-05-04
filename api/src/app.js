import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import S3 from './s3'

const app = express()
app.use(express.json())
app.use(cors())

const s3 = new S3()

app.get('/upload/:key', async (req, res) => {
	res.json({
		url: await s3.getPreSignedUploadUrl(`songs/${req.params.key}`)
	})
})

app.get('/songs', async (req, res) => {
	const objects = await s3.getObjects('songs')
	res.json(objects.map(({key, url}) => ({
		name: key.split('/').pop().split('.')[0],
		url
	})))
})

app.delete('/song/:name', async (req, res) => {
	await s3.deleteObject(`songs/${req.params.name}.mp3`)
	res.status(204).send()
})

const errorHandler = (err, req, res, next) => {
	console.error(err.stack)
	res.status(500).json({})
}
app.use(errorHandler)

export default app
