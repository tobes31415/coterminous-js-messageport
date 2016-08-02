import logger from './log.js';
import Subscription from './subscription.js';

var log = logger("messagePort");

export default class
{
    constructor(port)
    {
        if (!port || typeof port.postMessage !== "function")
        {
            throw new TypeError("messagePort expects an object with a postMessage function");
        }
        
        var receiveSub = new Subscription();
        var disconnectedSub = new Subscription();
        
        port.onmessage = function(e)
        {
            receiveSub.publish(e.data);
        }
        
        function send(msg)
        {
            try
            {
                port.postMessage(msg);
            }
            catch(err)
            {
                disconnect();
                log.error(err);
            }
        }
        
        function disconnect()
        {
            try
            {
                port.close();
            }
            catch(err){
                log.error(err);
            }
            disconnectedSub.publish();
        }
        
        this.send = send;
        this.disconnect = disconnect;
        this.receive = receiveSub.readOnly;
        this.disconnected = disconnectedSub.readOnly;
    } 
}