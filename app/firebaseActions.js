/**
 * Created by Felix on 4/17/16.
 */
import Firebase from 'firebase'

var usersRef = new Firebase('https://ece-590.firebaseio.com/users/');


export const registerUser = (username, password) => { //
  var payload = {
    groups: {},
    password: password,
    username: username
  };

  var newChildRef = usersRef.push();
  newChildRef.set(payload, function(error) {
    if (error) {
      alert("Sorry, a user could not be registered." + error);
    } else {
      console.log('new user registered');
    }
  });

}