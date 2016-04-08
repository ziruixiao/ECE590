/**
 * Created by Felix on 4/8/16.
 */

var CLIENT_ID = "ACd4c7174bd37083fd95f8661c0c3d89a0";
var CLIENT_SECRET = "5bca1b3ae1171cad2445f85052a9af22";
var client = require('twilio')(CLIENT_ID, CLIENT_SECRET);

client.sendMessage({

  to:'+18179130834', // Any number Twilio can deliver to
  from: '+14694163155', // A number you bought from Twilio and can use for outbound communication
  body: 'Text from Felix.' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

  if (!err) { // "err" is an error received during the request, if any

    // "responseData" is a JavaScript object containing data received from Twilio.
    // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
    // http://www.twilio.com/docs/api/rest/sending-sms#example-1

    console.log(responseData.from); // outputs "+14506667788"
    console.log(responseData.body); // outputs "word to your mother."

  }
});