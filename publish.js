import messagePort from './src/messagePort.js';
export default messagePort;

try
{
    (function(){return this})().Coterminous_MessagePort = messagePort;
}
catch(ignored){}