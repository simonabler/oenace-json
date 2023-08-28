# ÖNACE 2008 as JSON

Nodejs script that converts the ÖNACE entries into a json list.

Link to [pdf](https://wko.at/statistik/oenace/oenace2008.pdf).  
Source [statistik austria](https://www.statistik.at/KDBWeb/kdb_DownloadsAnzeigen.do?KDBtoken=ignore&&AUFRUF=klass&&NAV=DE&&KLASSID=10501&&KLASSNAME=__NACE)

## Rebuild

Install dependencies and generate JSON file from csv input.

```sh
npm install
node index.js
```

## Json structur

```json
[
  {
    "Structur": "A",
    "Abschnitt": "A",
    "Titel": "LAND- UND FORSTWIRTSCHAFT, FISCHEREI",
    "Kurztitel": "Land- und Forstwirtschaft",
    "EDV-Code": "A",
    "Code": "A",
    "Abteilungen": [
      {
        "Structur": "01",
        "Abschnitt": "A",
        "Abteilung": "01",
        "Titel": "Landwirtschaft, Jagd und damit verbundene Tätigkeiten",
        "Kurztitel": "Landwirtschaft und Jagd",
        "EDV-Code": "A01",
        "Code": "A 01",
        "Gruppen": [
          {
            "Structur": "01.1",
            "Abschnitt": "A",
            "Abteilung": "01",
            "Gruppe": "01.1",
            "Titel": "Anbau einjähriger Pflanzen",
            "Kurztitel": "Anbau einjähriger Pflanzen",
            "EDV-Code": "A011",
            "Code": "A 01.1",
            "Klassen": [
              {
                "Structur": "01.11",
                "Abschnitt": "A",
                "Abteilung": "01",
                "Gruppe": "01.1",
                "Klasse": "01.11",
                "Titel": "Anbau von Getreide (ohne Reis), Hülsenfrüchten und Ölsaaten",
                "Kurztitel": "Anbau v. Getreide, Hülsenfrüchte",
                "EDV-Code": "A0111",
                "Code": "A 01.11"
              },
              {
                "Structur": "01.11-0",
                "Abschnitt": "A",
                "Abteilung": "01",
                "Gruppe": "01.1",
                "Klasse": "01.11-0",
                "Titel": "Anbau von Getreide (ohne Reis), Hülsenfrüchten und Ölsaaten",
                "Kurztitel": "Anbau v. Getreide, Hülsenfrüchte",
                "EDV-Code": "A01110",
                "Code": "A 01.11-0"
              }
            ]
          }
        ]
      }
    ]
  }
]
```
