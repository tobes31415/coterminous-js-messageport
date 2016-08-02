importScripts('coterminous.js');
importScripts('messageport.js');

Coterminous.root({
    echo: function (msg){return {echo:msg};}
});

onconnect = function(e) {
  Coterminous.connectTransport(new Coterminous_MessagePort(e.ports[0]));
}
