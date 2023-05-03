import express from 'express'
import 'express-async-errors'

const app = express()
app.use(express.json())

app.get('/foo', async (req, res) => {
	res.status(200).send('bar')
})

const errorHandler = (err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Server error')
}

app.use(errorHandler)

export default app
