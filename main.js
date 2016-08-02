import * as enableLoging from './src/enableLogging.js';
import logger from './src/log.js';
import messagePort from './src/messagePort.js';
var log = logger("main.js");

var worker = new SharedWorker('worker.js');
Coterminous.connect(new messagePort(worker.port)).then(function(remoteInterface)
{
    window.remoteInterface = remoteInterface;
});