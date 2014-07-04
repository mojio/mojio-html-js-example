var App, MojioClient, config, mojio_client;
MojioClient = this.MojioClient;
App = this.App;

config = {
    application: '9ea750d2-7085-4125-bcd8-5e6d05d1d695',
    secret: 'e464f45a-e877-4655-b119-f7c58c10549f',
    hostname: 'develop.api.moj.io',
    version: 'v1',
    port: '80'
};

mojio_client = new MojioClient(config);

function display (code)
{
    $("#output").html(code);
}
mojio_client.login('anonymous@moj.io', 'Password007', function(error, result) {
    var str = "";
    if (error) {
        return alert("Login Error: " + error);
    } else {
        var app_modify;
        str += 'POST /login<br>';
        str += JSON.stringify(result);
        display(str);

        mojio_client.query(App, {}, function(error, result) {
            var app;
            if (error) {
                return display(str += 'Get Apps Error' + error + '<br>');
            } else {
                if (result instanceof Array) {
                    app = new App(result[0]);
                } else if (result.Data instanceof Array) {
                    app = new App(result.Data[0]);
                } else if ((result.Data != null)) {
                    app = new App(result.Data);
                } else {
                    app = new App(result);
                }
                str += '<br>Get /App<br>';
                str += JSON.stringify(result);
                display(str);

                str += '<p>' + 'hello Name: ' + app.Name + '</p>'
                display(str);

            }
        });

    }
});