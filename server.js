const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


app.post('/solve', (req, res) => {
  console.log(req)
  console.log(res)
})


const port = process.env.PORT || 8001
app.listen(port, () => console.log(`Listening on port ${port}`))