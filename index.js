const fs = require('fs');
const csvParser = require('csv-parser');

const inputFilePath = 'OENACE2008_DE_CTI.csv';
const outputFilePath = 'OENACE2008_DE_CTI.json';
const outputplainFilePath = 'OENACE2008_DE_CTI_plain.json';

const hierarchicalData = [];
const plainData = [];

let datastruct;
let abteilungstruct;
let klassenstruct;

fs.createReadStream(inputFilePath, { encoding: 'latin1' })
  .pipe(csvParser({ separator: ';' }))
  .on('data', (row) => {
    switch (row['Ebene']) {
      case '1':
        datastruct = {
          "Structur": row['Code'],
          "Abschnitt": row['Code'],
          "Titel": row['Titel'],
          "Kurztitel": row['Kurztitel'],
          "EDV-Code": row['EDV-Code'],
          "Code": row['Code'],
          "Abteilungen": []
        }
        hierarchicalData.push(datastruct)
        break;
      case '2':
        abteilungstruct = {
          "Structur": row['Code'].split(' ')[1],
          "Abschnitt": datastruct.Abschnitt,
          "Abteilung": row['Code'].split(' ')[1],
          "Titel": row['Titel'],
          "Kurztitel": row['Kurztitel'],
          "EDV-Code": row['EDV-Code'],
          "Code": row['Code'],
          "Gruppen": []
        }
        datastruct.Abteilungen.push(abteilungstruct)
        break;
      case '3':
        klassenstruct = {
          "Structur": row['Code'].split(' ')[1],
          "Abschnitt": datastruct.Abschnitt,
          "Abteilung": abteilungstruct.Abteilung,
          "Gruppe": row['Code'].split(' ')[1],
          "Titel": row['Titel'],
          "Kurztitel": row['Kurztitel'],
          "EDV-Code": row['EDV-Code'],
          "Code": row['Code'],
          "Klassen": []
        }
        abteilungstruct.Gruppen.push(klassenstruct)
        break;
      case '4':
      case '5':
        klassenstruct.Klassen.push({
          "Structur": row['Code'].split(' ')[1],
          "Abschnitt": datastruct.Abschnitt,
          "Abteilung": abteilungstruct.Abteilung,
          "Gruppe": klassenstruct.Gruppe,
          "Klasse": row['Code'].split(' ')[1],
          "Titel": row['Titel'],
          "Kurztitel": row['Kurztitel'],
          "EDV-Code": row['EDV-Code'],
          "Code": row['Code'],
        })
        plainData.push({
          "Abschnitt": datastruct.Abschnitt + ' ' + datastruct.Titel,
          "Abteilung": abteilungstruct.Abteilung + ' ' + abteilungstruct.Titel,
          "Gruppe": klassenstruct.Gruppe + ' ' + klassenstruct.Titel,
          "Titel": row['Titel'],
          "Kurztitel": row['Kurztitel'],
          "EDV-Code": row['EDV-Code'],
          "Code": row['Code'],
        })
        break;
    }
  })
  .on('end', () => {
    fs.writeFileSync(outputFilePath, JSON.stringify(hierarchicalData, null, 2));
    fs.writeFileSync(outputplainFilePath, JSON.stringify(plainData, null, 2));
    console.log('JSON file has been created successfully.');
  });