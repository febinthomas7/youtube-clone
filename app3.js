import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth,GoogleAuthProvider ,signInWithPopup ,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore,serverTimestamp,collection ,addDoc,onSnapshot,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
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

let container= document.getElementById("container");
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
        signOutPage.style.display="flex";
        signIn.style.display="none";
        InPage.style.display="none";
        OutPage.style.display="flex";
        In.style.display="none";
        
        
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
            
            users.forEach(({channelId,snippet,videoId,id})=>{
                // location.reload();
                let title = snippet.title;
                let channelTitle = snippet.channelTitle;
                // console.log(id, result.uid);
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
        lowerDiv.style.height="25px";
        lowerDiv.style.justifyContent="space-between";
        lowerDiv.style.width="auto";
        let loverdiv1 = document.createElement("div");
        loverdiv1.className="loverdiv1";
        loverdiv1.style.height="100%";
        loverdiv1.style.width="auto";
        loverdiv1.style.display="flex";
        loverdiv1.style.flexDirection="row";

        let loverdiv2 = document.createElement("div");
        loverdiv2.className="loverdiv2";
        loverdiv2.style.height="100%";
        loverdiv2.style.width="auto";
        loverdiv2.style.display="flex";
        loverdiv2.style.flexDirection="row";

        let lowerBtn = document.createElement("button");
        lowerBtn.innerText="Remove";
        lowerBtn.style.outline="none";
        lowerBtn.style.border="none";
        lowerBtn.style.borderRadius="4px";
        lowerBtn.style.padding="5px";
        lowerBtn.title="remove this video from history";
        lowerBtn.style.cursor="pointer";




        loverdiv2.append(lowerBtn)
        middleDiv.append(name,dots);
        loverdiv1.append(Cname,tick)
        lowerDiv.append(loverdiv1,loverdiv2);
                div.append(img,middleDiv,lowerDiv);
                container.append(div);
     
     
                
                lowerBtn.addEventListener("click",()=>{
                    console.log(id, result.uid);

                    const docref = doc(db, result.uid, id)

                    deleteDoc(docref)
                    .then(()=>{
                      
                        let  load = document.createElement("span");
                        let head = document.getElementById("header");

                        load.className="loader";


      
                        setTimeout(function(){ head.append(load) }, 0);
                        setTimeout(function(){ load.style.display ="none" }, 1000);

                        location.reload();
                    })

                    

                })
                let data={
                    channelId,
                    snippet,
                    videoId,
                }

                img.addEventListener("click",()=>{
                    localStorage.setItem("video",JSON.stringify(data));
                    window.location.href="video.html";
                })
     
                
    
            })
        
            })
 


       


    }
    else{
        
        signOutPage.style.display="none";
        signInPage.style.display="flex";
        signout.style.display="none";
        OutPage.style.display="none";
        InPage.style.display="flex";
        Out.style.display="none";
        
      
        
        // Inp.style.display="none";
        

        let  load = document.createElement("span");
        let head = document.getElementById("header");

        load.className="loader";


      
    setTimeout(function(){ head.append(load) }, 0)
    setTimeout(function(){ load.style.display ="none" }, 1000)
   
   

        let container = document.getElementById("Main");
        let div = document.createElement("div");
        div.className="errorDiv";
        div.style.display="flex";
        div.style.marginTop="15%"
        let img = document.createElement("img");
        img.src="error.png";
        let p = document.createElement("p");
        p.innerText="Sign in to access history"
        div.append(img,p);

        let div2 = document.createElement("div");
        div2.className="errorDiv2";
        div2.style.display="flex";
        let p1 = document.createElement("p");
        p1.innerText = "Check your connection.";
        let p2 = document.createElement("p");
        p2.innerText = "Check your Api limit.";
        div2.append(p1,p2);

        let div3= document.createElement("div");
        div3.className="retry";
        div3.style.display="flex";
        let retry = document.createElement("button");
        retry.innerText="Retry";
        div3.append(retry);
        retry.addEventListener("click",()=>{
            location.reload();
        })



        container.append(div,div2,div3);

       
        
    }



});






 
 




   
    
    



     
    

   






