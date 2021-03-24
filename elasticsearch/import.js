//const elasticsearch = require('elasticsearch');
const csv = require('csv-parser');
const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');

const ELASTIC_SEARCH_URI = 'http://localhost:9200';
const INDEX_NAME = '911-calls';

async function run() {
  const client = new Client({ node: ELASTIC_SEARCH_URI});

  // Drop index if exists
  await client.indices.delete({
    index: INDEX_NAME,
    ignore_unavailable: true
  });

  await client.indices.create({
    index: INDEX_NAME,
    body : {
      // TODO configurer l'index https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html
    }
  });

  fs.createReadStream('../911.csv')
    .pipe(csv())
    .on('data', data => {
      const call = {
        'lat': data.lat,
        'lng': data.lng,
        'desc': data.desc,
        'zip': data.zip,
        'title': data.title,
        'categoryDetails': data.title.substr(0, data.title.indexOf(':')),
        'timeStamp': data,
        'month' : date.getMonth(),
        'twp': data.twp,
        'addrr': data.addrr,
        'e': data.e
      };
      // TODO créer l'objet call à partir de la ligne
    })
    .on('end', async () => {
      // TODO insérer les données dans ES en utilisant l'API de bulk https://www.elastic.co/guide/en/elasticsearch/reference/7.x/docs-bulk.html
    });
  

}

run().catch(console.log);


