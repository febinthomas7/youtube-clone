import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth,GoogleAuthProvider ,signInWithPopup ,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore,serverTimestamp,collection ,addDoc,onSnapshot} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
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
const db = getFirestore(app);


let signInPage = document.getElementById("signInPage");
let signOutPage = document.getElementById("signOutPage");
let signIn = document.getElementById("signIn");
let signInn = document.getElementById("signInn");

let  profile = document.getElementById("profile");
let signout = document.getElementById("signOut");

//smallNav
let InPage = document.getElementById("InPage");
let OutPage = document.getElementById("OutPage");
let In = document.getElementById("In");
let photo = document.getElementById("photo");
let Out = document.getElementById("Out");



// let Inp = document.getElementById("InP");
// let pic = document.getElementById("pic");
// let Outp = document.getElementById("Outp");

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
In.addEventListener("click",signin);
Out.addEventListener("click",signingOut);

  onAuthStateChanged(auth,(result)=>{
   
    

    if(result){

        signInPage.style.display="none";
        signIn.style.display="none";
        InPage.style.display="none";
        In.style.display="none";
        // Inp.style.display="none";
        
        profile.src = result.photoURL;
        photo.src = result.photoURL;
        // localStorage.setItem("username",result.uid);
        // pic.src = result.photoURL;
        let snipp = localStorage.getItem("video");
        let s = JSON.parse(snipp);

        const {channelId,snippet,videoId}=s;

    
 
    // console.log(username)
    let id = result.uid;
    console.log(id)
        const colref = collection(db,id);



 

   
        onSnapshot(colref,(snapshot)=>{
            
        let users = result.uid;
         users=[];
        snapshot.docs.forEach((doc)=>{
           users.push({...doc.data(),id:doc.id})
        })
        console.log(users);
    
        })

         let A = document.getElementById("container")
         A.addEventListener("click",()=>{
            console.log("hi")
                addDoc(colref,{
                    channelId,
                    snippet,
                    videoId,
                    created_at:serverTimestamp(),
                })
        
              
               })

    }
    else{
        result
        signOutPage.style.display="none";
        signout.style.display="none";
        OutPage.style.display="none";
        Out.style.display="none";
        // localStorage.removeItem("username");
        // Outp.style.display="none";
        
    }



});




// let b = document.getElementById("b");


    // let result = auth
    let snipp = localStorage.getItem("video");
    let s = JSON.parse(snipp);

    const {channelId,snippet,videoId}=s;

    

    let username = localStorage.getItem("username");
    // console.log(username)
const colref = collection(db,username);



 

   
    onSnapshot(colref,(snapshot)=>{
        let users = localStorage.getItem("username");
         users=[];
        snapshot.docs.forEach((doc)=>{
           users.push({...doc.data(),id:doc.id})
        })
        console.log(users);
    
    })




     
    // let A = document.querySelectorAll(".homeDiv");
    let A = document.getElementById("container")
    A.addEventListener("click",()=>{
            console.log("hi")
                addDoc(colref,{
                    channelId,
                    snippet,
                    videoId,
                    created_at:serverTimestamp(),
                })
        
              
               })


    //    A.forEach((div)=>{

    //     div.addEventListener("click",()=>{
    //     console.log("hi")
    //         addDoc(colref,{
    //             channelId,
    //             snippet,
    //             videoId,
    //             created_at:serverTimestamp(),
    //         })
    
          
    //        })
    //    })



   
    
    //       (washingtonRef,obj);   
 




   
    
    



     
    

   






