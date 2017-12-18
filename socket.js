var server = require('http').Server();

var io = require('socket.io')(server);
var Redis = require('ioredis');
var redis = new Redis();

redis.subscribe('general');
redis.subscribe('1');
redis.subscribe('2');

redis.on('message', function(channel, message){
    message = JSON.parse(message);
    console.log(message);
    io.emit(channel + ':' + message.event, message.data);
});

server.listen(3000);