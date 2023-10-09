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
        location.reload();
        // let result = data.user;
        // console.log(result.displayName);

    }
    catch(e){

        console.log(e);
    }

}

const signingOut = async()=>{

    signOut(auth).then(()=>{
        location.reload();

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
        
        

   

    
 
    // console.log(username)
        let id = result.uid;
        // console.log(id)
    
        const colref = collection(db,id);
    
        


        onSnapshot(colref,(snapshot)=>{
            
            let users = result.uid;
             users=[];
            snapshot.docs.forEach((doc)=>{
               users.push({...doc.data(),id:doc.id})
            })
            // console.log(users);
            users.forEach(({channelId,snippet,videoId})=>{
                let title = snippet.title;
                let channelTitle = snippet.channelTitle;

                let container =  document.getElementById("container");
                let Main = document.getElementById("Main");
                Main.style.marginTop="14px";
                Main.style.marginBottom="72px";
                let div = document.createElement("div");
                let img = document.createElement("img");
                img.src = snippet.thumbnails.high.url;

                let titleShort = title.slice(0,70);
        
        let name = document.createElement('p');
        name.title=title;
        if(title.length <= 70){
            name.innerText = title;
        }
        else{
            name.innerText = titleShort+"..."; 
        }
        

        let Cname = document.createElement('span');
        Cname.innerText = channelTitle;

        let dots = document.createElement("i");
        dots.className = "fa fa-ellipsis-v";

        let tick = document.createElement("i");
        tick.className ="fa fa-check-circle";

        let middleDiv = document.createElement("div");
        middleDiv.className="middleDiv";

        let lowerDiv = document.createElement("div");
        lowerDiv.className="lowerDiv";
        middleDiv.append(name,dots);
        lowerDiv.append(Cname,tick);
                div.append(img,middleDiv,lowerDiv);
                container.append(div);
     
     
                let data={
                    channelId,
                    snippet,
                    videoId,
                }
                div.addEventListener("click",()=>{

                    localStorage.setItem("video",JSON.stringify(data));
                    window.location.href="video.html";

                })
     
                
    
            })
        
            })
 


       


    }
    else{
        result
        signOutPage.style.display="none";
        signout.style.display="none";
        OutPage.style.display="none";
        Out.style.display="none";

        let  load = document.createElement("span");
        let head = document.getElementById("header");

        load.className="loader";


      
    setTimeout(function(){ head.append(load) }, 0)
    setTimeout(function(){ load.style.display ="none" }, 1000)
   
   

        let container = document.getElementById("Main");
        let div = document.createElement("div");
        div.className="errorDiv";
        div.style.marginTop="15%"
        let img = document.createElement("img");
        img.src="error.png";
        let p = document.createElement("p");
        p.innerText="Sign in to access history"
        div.append(img,p);

        let div2 = document.createElement("div");
        div2.className="errorDiv2";
        let p1 = document.createElement("p");
        p1.innerText = "Check your connection.";
        let p2 = document.createElement("p");
        p2.innerText = "Check your Api limit.";
        div2.append(p1,p2);

        let div3= document.createElement("div");
        div3.className="retry";
        let retry = document.createElement("button");
        retry.innerText="Retry";
        div3.append(retry);
        retry.addEventListener("click",()=>{
            location.reload();
        })



        container.append(div,div2,div3);

       
        
    }



});






 
 




   
    
    



     
    

   






