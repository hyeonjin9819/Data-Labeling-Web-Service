const {spawn} = require('child_process');

const result = spawn('python', ['print.py']);

// result.on('close', (code) => {
//     console.log("업로드 완료")
//   })

result.stdout.on('data', function(data) {
    console.log(data.toString());
});

result.stderr.on('data', function(data) {
    console.log(data.toString());
});