const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

var readAndFormatCsv = require('./readAndFormatCsv');

const csvFilePath = './schedules.csv';

app.get('/timeSlots', async (req,res)=> {

  const therapistData = await readAndFormatCsv(csvFilePath);

  res.send(therapistData);
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
