var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/index.html`)
})

var vote = {
    thomas: 0,
    julien: 0,
    charlotte: 0
}

io.on('connection', function (socket) {
    console.log("connect")

    socket.on("vote", function (data) {
        console.log(data)
        vote[data]++
        io.emit("updateVote", vote)
    })
})


http.listen(3000)