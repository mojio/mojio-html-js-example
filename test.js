var App, MojioClient, config, mojio_client;
MojioClient = this.MojioClient;

config = {
    application: 'f201b929-d28c-415d-9b71-8112532301cb',    // unrestricted app
    secret: 'f0927a0a-386b-4148-be8d-5ffd7468ea6b',         // production sandbox
    hostname: 'api.moj.io',
    port: '80',
    version: 'v1'
};

mojio_client = new MojioClient(config);
App = mojio_client.model('App');

function display (code)
{
    $("#output").html(code);
}
mojio_client.login('anonymous@moj.io', 'Password007', function(error, result) {
    var str = "";
    if (error) {
        return alert("Login Error: " + error);
    } else {
        str += 'POST /login<br>';
        str += JSON.stringify(result);
        display(str);

        mojio_client.query(App, {}, function(error, result) {
            var app;
            if (error) {
                return display(str += 'Get Apps Error' + error + '<br>');
            } else {
                var apps = mojio_client.getResults(App, result);
                str += '<br>Get /App<br>';
                str += JSON.stringify(result);
                display(str);

                str += '<p>' + 'App Name: ' + apps[0].Name + '</p>'
                display(str);
            }
        });
    }
});