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

export const addOrUpdateGroup = (userId, editGroupId, dictionary) => {
  var groupsRef = new Firebase('https://ece-590.firebaseio.com/users/' + userId + '/groups');
  var payload = dictionary;
  if (editGroupId == -1) { // new rushee

    var newChildRef = groupsRef.push();
    newChildRef.set(payload, function(error) {
      if (error) {
        alert("Sorry, the information could not be updated." + error);
      } else {
        console.log("A group has been added.");
      }
    });

  } else { // update group
    var childRef = groupsRef.child(editGroupId);
    childRef.update(payload, function(error) {
      if (error) {
        alert("Sorry, the information could not be updated." + error);
      } else {
        console.log("A group has been updated.");
      }
    });
  }
}