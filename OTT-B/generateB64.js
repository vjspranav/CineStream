
const fs = require('fs');
const content = require('./content');

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

console.log(content)
for(let i in  content) {
    // console.log(base64_encode('Movies/thumbnails/' + content[i].name + '.png'))
    content[i]['thumbnail'] = base64_encode('Movies/thumbnails/' + content[i].name + '.png');
    // console.log(content[i]['thumbnail']);
}    

fs.writeFileSync('content.json', JSON.stringify(content, null, 2));
