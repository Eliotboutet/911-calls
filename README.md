db.calls.aggregate([
{
"$group": {
_id:"$category",
counter:{$sum1}
}
}
])

db.calls.aggregate([
{
"$group": {
_id:"$monthYear",
counter:{$sum1}
}
},
{
$sort:{
"counter" :-1
}
},
{
$limit:3
}
])

POST 911-calls/_search
{
"size": 0,
"aggs": {
"mostCalls": {
"date_histogram": {
"field": "timeStamp",
"calendar_interval": "month",
"format": "yyyy-MM",
"order": { "_count" : "desc" }
}
}}}

POST 911-calls/_search
{
"size": 0,
"query": {
"match": {
"categoryDetails": "OVERDOSE"
}
},
"aggs": {
"citiesOverdose": {
"terms": {
"field": "twp.keyword",
"order": { "_count" : "desc" },
"size": 3
}
}
}
}

POST 911-calls/_search
{
"size": 0,
"query": {
"match": {
"categoryDetails": "OVERDOSE"
}
},
"aggs": {
"citiesOverdose": {
"terms": {
"field": "twp.keyword",
"order": { "_count" : "desc" },
"size": 3
}
}
}
}
