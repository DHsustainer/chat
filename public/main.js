var socket = io.connect('http://localhost:5000', {'forceNew':true});

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function (el, index) {
        return('<div>'+
        '<strong>'+el.author+'</strong>: '+
        '<em>'+el.text+'</em>'+
        '</div>');
    }).join(" ");


    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    var payload = {
        author: document.getElementById('name').value,
        text: document.getElementById('text').value
    }
    
    socket.emit('message',  payload);
    return false;
}