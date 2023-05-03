import app from './app'

const port = process.env.PORT

app.listen(port, () => console.log(`listening on port ${port}`))
