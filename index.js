import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, set} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://plqyground-7ae02-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentInDb = ref(database, "comments")



const buttonEl = document.getElementById("buttonn")
let inputEl = document.getElementById("inputt")
const ulEl = document.getElementById("ull")

let lastItem
/*

onValue(commentInDb,function(snapshot){
if(snapshot.exists( )){
    ulEl.innerHTML = ""
   

    let listItems = Object.entries(snapshot.val())
   
   for( let i=0 ; i < listItems.length ; i++){
    listing(listItems[i])
   }
   
    
}

else {
    ulEl.textContent = "noo"
   }
})





function listing(item){

    let listId = item[0]
    let listValue = item[1]

let lista = document.createElement("li")
lista.textContent = listValue
ulEl.append(lista)

commentLocation = ref(database,`comments/${listId}`)
lista.addEventListener("dblclick", function(){
remove(commentLocation)
})
}
*/
let inputEl2 = document.getElementById("input2")

buttonEl.addEventListener("click", function(){
  

    set(ref(database, 'comments/' + inputEl2.value), {
        msg: inputEl.value,
        name: inputEl2.value
      });
    
  //  push(commentInDb,inputEl.value)
    inputEl.value = ""
    inputEl2.value = ""
   

   })

   // Function to create and append a new list item
function appendComment(name, msg) {
    const li = document.createElement("li")
  
    li.innerHTML = `${msg}<br><span id="user"> ${name}</span>` 
    ulEl.appendChild(li)

    li.addEventListener("dblclick",function(){
        remove(ref(database, `comments/${name}`))
    })
}

// Reading the data from Firebase
onValue(commentInDb, function(snapshot) {
    ulEl.innerHTML = ""  // Clear the list before appending new data
    const data = snapshot.val()
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            appendComment(data[key].name, data[key].msg)
        }
    }
})
/*

   
onValue(commentInDb, function(snapshot) {
    let currentItemValue
    ulEl.textContent = ""
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            currentItemValue = currentItem[1]
           
            appendItemToList(currentItem)
  
             inputEl.placeholder = itemsArray        
        } 
       
       if(document.visibilityState === "hidden"){
        notifyMe(currentItemValue)
        return 0
       }
           
           
       
        
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})


function appendItemToList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
   lastItem = itemValue
   
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `comments/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    ulEl.append(newEl)
}



/*
document.addEventListener("visibilitychange", () => {
    if(document.visibilityState === "hidden"){
        
    }
}) 


    // Function to show notification
    function showNotification(data) {
        if (Notification.permission === 'granted') {
            new Notification("New Data", {
                icon: "favicon.ico",
                body: data,
                tag : "data message",
            });
        }
        else{
            Notification.requestPermission()
            showNotification(data)
        }
    }
    */

   const notifyy = document.getElementById("notify")

    notifyy.addEventListener("click", () => {
    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            new Notification ("Notificatio is activated",{
                body:"taghi thanks u",
                icon:"favicon.ico",
                
            })
        }
    } )
 })

function notifyMe(data){
    new Notification ("u got new msg assat",{
        body: data,
        icon: "favicon.ico",
        
    })
}
document.addEventListener("visibilitychange", () => {
 
 
});