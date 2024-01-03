import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getDatabase, ref, set, get, child } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyTgmqcPKmbJ2h8oHv3bWfVwUcic2ZSx4",
  authDomain: "new-project-a153a.firebaseapp.com",
  projectId: "new-project-a153a",
  storageBucket: "new-project-a153a.appspot.com",
  messagingSenderId: "879050200715",
  appId: "1:879050200715:web:aa449712598ef2ee9ee68e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app)
const dbRef = ref(db)

// refrences
const email = document.getElementById('emailInp')
const pass = document.getElementById('passInp')
const firstName = document.getElementById('firstNameInp')
const lastName = document.getElementById("lastNameInp")
let regbtn = document.getElementById('regbtn')
let logInbtn = document.getElementById('logInbtn')


// for registration
const registerUser = () => {

  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      set(ref(db,'UsersAuthList/'+ userCredential.user.uid),{
        firstName: firstName.value,
        lastName: lastName.value
      })
      console.log("user ===>", userCredential);
    })
    
    .catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorMessage ===>", errorMessage);
      console.log("errorCode ===>", errorCode);
    });
    signUpForm.classList.toggle('hidden')
    backElements.classList.toggle('blur-none')


}
regbtn.onclick = registerUser

const signInUser = () => {


    signInWithEmailAndPassword(auth, email.value, pass.value)
      .then((userCredential) => {
        get(child(dbRef,'UsersAuthList/'+ userCredential.user.uid))
        .then((snapshot)=>{
          if(snapshot.exists){
            sessionStorage.setItem("user-info", JSON.stringify(
              { 
                firstName: snapshot.val().firstName,
                lastName: snapshot.val().lastName
    
              }
            )
            )
            sessionStorage.setItem('user-creds' , JSON.stringify(userCredential.user));
            console.log("going to login");
            window.location.href = 'welcome.html'
          }
        })
    
        // const user = userCredential.user;
        console.log("user ===>", userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage ===>", errorMessage);
        console.log("errorCode ===>", errorCode);
      });
    
    }
    logInbtn.onclick = signInUser


var signUpForm = document.getElementById('signupForm')
var backElements = document.getElementById('backElements')
var createNewAcc = document.getElementById('createNewAcc')
var closeBtn = document.getElementById('closeBtn')

function createNewAccount() {
    signUpForm.classList.toggle('hidden')
    backElements.classList.toggle('blur-sm')

}
createNewAcc.onclick = createNewAccount


function closeBtntab() {
    console.log('hello')
    signUpForm.classList.toggle('hidden')
    backElements.classList.toggle('blur-none')

}
closeBtn.onclick = closeBtntab
