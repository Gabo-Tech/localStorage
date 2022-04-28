//Create counter variable
var i = 0;



//Create array to store all localStorage elements
const objArray = [];



//Grab all localStorage elements and put it into previous array
Object.keys(localStorage).forEach(key => objArray.push({
   name: key,
   rating: localStorage[key]
}));



//Check if there are objects in the localStorage to keep counting from that number, otherwise start counter from 0
var i = Object.keys(objArray).length;
console.log(Object.keys(objArray).length+" This is i "+i);



//Function to convert String into Object.
const str2obj = str => {
    return str
      .split(',')
      .map(keyVal => {
        return keyVal
          .split(':')
          .map(_ => _.trim())
      })
      .reduce((accumulator, currentValue) => {
        accumulator[currentValue[0]] = currentValue[1]
        return accumulator
      }, {})
  }



  // //function to delete selected element Kind of working. but not quite there. 
function removeOne(e){
  console.log("esto es e " + e.target);
  var listItem = e.target.getAttribute("class");
  console.log("this is listitem"+listItem);
  //delete element from the ui working
  e.target.parentNode.remove();
  //removing item from the local storage
  localStorage.removeItem(e.target.getAttribute("class"));
};



//Function to return objects already stored into localStorage 
  async function getLocalStorage(){
        for (const element of objArray) {
        //Make array into string
        const stringJson = element.rating.replace(/[^a-zA-Z0-9,:@. ]/g, '');
        //Convert string into object
        const objectJson = str2obj(stringJson);
        console.log(objectJson);
        document.getElementById('messages').innerHTML += '<li>' + /*name*/'<h3>'+objectJson.name2 +'</h3><br>' + /*email*/'<h3>'+objectJson.email + '</h3><br><p>'+/*message*/objectJson.message +'</p><button id="deleteOne" class="'+objectJson.id+'" type="submit">Delete this</button></li>';
        await deleteOne.addEventListener("click", removeOne);
        //objectJson.id.setAttribute("onclick", removeOne("${"+objectJson.id+"}"));
        console.log("Hola, soy el id "+objectJson.id)
      }
  }
getLocalStorage();



//Save object on localStorage and display it 
btn.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;
    let message = document.getElementById("messageInput").value;
    let id = "name"+ i;
    localStorage.setItem('name'+i, JSON.stringify({
        name2: name, 
        email: email, 
        message: message,
        id: id
    }));
    const contactInfo = JSON.parse(localStorage.getItem('name'+i));
    document.getElementById('usrform').reset();
    document.getElementById('messages').innerHTML += '<li>' + /*name*/'<h3>'+contactInfo.name2 +'</h3><br>' + /*email*/'<h3>'+contactInfo.email + '</h3><br><p>'+/*message*/contactInfo.message +'</p><button id="deleteOne" class="'+id+'" type="submit">Delete this</button></li>';
    deleteOne.addEventListener("click", removeOne);
    i++;
}, false);



//function to delete all elements
deleteAll.addEventListener("click", (e) => {
    document.getElementById('messages').innerHTML = "";
    localStorage.clear();
    window.location.reload();
}, false);



//this freacking functions are supposed to work the same way as the last one but they don't work
// deleteOne.addEventListener("click", (e) => {
//   document.getElementById(e).innerHTML = "";
//   const listItem = e.target;
//     console.log("This is listItem"+listItem);
//     delete contactInfo['key'];
// }, false);

// deleteOne.addEventListener("click", (e) => {
//   //document.getElementById(e).innerHTML = "";
//   const listItem = e.target.parentNode;
//     console.log("This is listItem"+listItem);
//     e.target.parentNode.remove();
//     //delete contactInfo['key'];
// }, false);



document.getElementById('messages').innerHTML = "";
getLocalStorage();