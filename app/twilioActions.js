/**
 * Created by Felix on 4/17/16.
 */

export const sendMessage = (message, toPhone) => {
  var datahash = {};
  datahash["text[tonumber]"] = "+1" + toPhone.replace(/\D/g,'');
  datahash["text[fromnumber]"] = '+14694163155';
  datahash["text[message]"] = message;
  var $ = require ('jquery')
  $.ajax({
    type: "POST",
    url: 'http://ece590twilio.herokuapp.com/texts',
    data: datahash,
    dataType: 'json'
  });
}