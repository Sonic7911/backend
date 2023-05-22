import {app} from './app.js'


const port = process.env.port || 8000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})