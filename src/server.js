const app = require(' ./App')
const connectDatabase = require('.src/database')

 

app.listen(3000, () => {
    console.log(`Server started on Port: 3000 in Development mode.`)
})