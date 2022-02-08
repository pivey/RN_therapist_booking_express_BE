const fs = require('fs')
const csv = require('csv-parser')
const therapistTimes = [];

const readAndFormatCsv = (csvFilePath) => {
  return new Promise(function(resolve, reject) {
    const therapistsArray = []
    const timeSlotsArray = [];

    fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', function (row) {
      const data = Object.values(row);

      if (data.length === 2) {
        const therapistInfo = { id: parseInt(data[0]), therapistName: data[1], timeSlots: [] };
        therapistsArray.push(therapistInfo);
      } else {
        const timeSlotInfo = {
          id: parseInt(data[0]),
          slotLength: parseInt(data[1]),
          dateAndTime: data[2],
        }
        timeSlotsArray.push(timeSlotInfo);
      }
    })
    .on('end', function () {
      for (let j = 0; j < therapistsArray.length; j++) {
        for (let i = 0; i < timeSlotsArray.length; i++) {
          if (timeSlotsArray[i].id === therapistsArray[j].id) {
            therapistsArray[j].timeSlots.push(timeSlotsArray[i]);
          }
        }
      }

      const sortedTherapists = therapistsArray.sort((a,b) => a.id > b.id ? 1 : -1 );
        resolve(sortedTherapists);
    })
    .on('error', function(err) {
      console.log('thrown error', err);
      reject(err);
    });
  });
}

module.exports = readAndFormatCsv;
