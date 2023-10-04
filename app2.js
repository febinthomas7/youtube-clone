import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth,GoogleAuthProvider ,signInWithPopup ,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg3psCzFL0CeAyE6WgS2l-td_1l9_Knu4",
  authDomain: "fir-90f38.firebaseapp.com",
  projectId: "fir-90f38",
  storageBucket: "fir-90f38.appspot.com",
  messagingSenderId: "343865474851",
  appId: "1:343865474851:web:5078477545efbf90d95696"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


let signInPage = document.getElementById("signInPage");
let signOutPage = document.getElementById("signOutPage");
let signIn = document.getElementById("signIn");
let  profile = document.getElementById("profile");
let signout = document.getElementById("signOut");

//smallNav
// let InPage = document.getElementById("InPage");
// let OutPage = document.getElementById("OutPage");
let In = document.getElementById("In");
let photo = document.getElementById("photo");
let Out = document.getElementById("Out");


let InP = document.getElementById("InP");
let pic = document.getElementById("pic");
let OutP = document.getElementById("OutP");

const provider = new GoogleAuthProvider(app);



let signin = async()=>{

    try{

        const data = await signInWithPopup(auth, provider);
        let result = data.user;
        // console.log(result.displayName);

    }
    catch(e){

        console.log(e);
    }

}

const signingOut = async()=>{

    signOut(auth).then(()=>{


    }).catch((e)=>{
        console.log(e);
    })

    
}

signIn.addEventListener("click",signin);
signInPage.addEventListener("click",signin);

signout.addEventListener("click",signingOut);
// In.addEventListener("click",signin);
// Out.addEventListener("click",signingOut);

onAuthStateChanged(auth,(result)=>{

    if(result){

        signInPage.style.display="none";
        signIn.style.display="none";
        // InPage.style.display="none";
        In.style.display="none";
        OutP.style.display="none";
        
        profile.src = result.photoURL;
        photo.src = result.photoURL;
        pic.src = result.photoURL;

    }
    else{
        signOutPage.style.display="none";
        signout.style.display="none";
        // OutPage.style.display="none";
        Out.style.display="none";
        
        InP.style.display="none";
        
    }
})



