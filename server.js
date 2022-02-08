const express = require('express');
const app = express();

var readAndFormatCsv = require('./readAndFormatCsv');

const csvFilePath = './schedules.csv';

app.get('/timeSlots', async (req,res)=> {

  const therapistData = await readAndFormatCsv(csvFilePath);

  res.send(therapistData);
});

const port = 5001;

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
