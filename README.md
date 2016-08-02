# coterminous-js-messageport
A transport for use with Message Ports such as WebWorkers

### Useage in the Worker
<syntaxhighlight lang="js">
Coterminous.root({
    //... your exposed api functions here
    hello : function(){return "world";}
});

onconnect = function(e) {
  Coterminous.connectTransport(new MessagePortTransport(e.ports[0]));
}
</syntaxhighlight>

### Useage in the Browser
<syntaxhighlight lang="js">
var worker = new SharedWorker('worker.js');
Coterminous.connect(new MessagePortTransport(worker.port)).then(function(remoteInterface)
{
    //do stuff
    remoteInterface.hello().then(function(response)
    {
        console.log(response);
    });
});
</syntaxhighlight>
  
### Changing Direction
Connect - connects and gets the root object
ConnectTransport - just connects

You can swap these around to suit your needs, worker going to call the webpage?  use connect.  api calls in both directions?  sure! Use connect in both places.