function getServerIP() {
    var server = 'heroku';
    if (server == 'heroku') {
        return 'fika-a-dica.herokuapp.com';
    } else if (server == 'test') {
        return 'localhost:4567';
    }
}
