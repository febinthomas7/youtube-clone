const bar= document.getElementById('bar');
const nav= document.getElementById('nav1');
const close= document.getElementById('close');

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}










let Api = "AIzaSyCOhiwQudnvkd1xx0YqQlAIdwoBFB1_rWM";
// AIzaSyCOhiwQudnvkd1xx0YqQlAIdwoBFB1_rWM

// AIzaSyDkYDo20vFknCOVnGvex7Q8YDvIvxxFN-E


// const most = async ()=>{

//     let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=25&id=Ks-_Mh1QhMc&key=${Api}`);
//     let data = await res.json();

 
//     console.log(data.items)
    
// } 
// most();

let btn = document.querySelectorAll(".btn");

btn.forEach((bt)=>{
    bt.addEventListener("click",async(e)=>{
        // console.log(e.target.innerHTML)
        let val = e.target.innerHTML;
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${val}&key=${Api}`);
        let data = await res.json();

        app(data.items);
    })
})

const mostPopular = async ()=>{



    try{
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&regionCode=IN&key=${Api}`);
    // let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${Api}`);
    let data = await res.json();
    // console.log(data)
    app(data.items)

    }
    catch(e){
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
        p.innerText="Connect to the Internet"
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
    
    
} 
mostPopular();


const app = (data)=>{
    let container = document.getElementById("container");
    container.innerHTML = null;
    // console.log(data)
    data.forEach(({snippet,id:{videoId},snippet:{channelId}}) => {
       

        let img = snippet.thumbnails.high.url;
        let channelTitle = snippet.channelTitle;
        let title = snippet.title;

        let div = document.createElement('div');
        div.className = "homeDiv";
        

        let image = document.createElement('img');
        image.className = "homeImg";
        image.src = img;
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

        if(channelTitle == title){
            let data={
                snippet,
                videoId,
                channelId,
            }
            div.addEventListener("click",()=>{
                localStorage.setItem("query",JSON.stringify(channelTitle));
                localStorage.setItem("video",JSON.stringify(data));

                

                    window.location.href="channel.html";
                
                
            })
        }
        else{
            let data={
                snippet,
                videoId,
                channelId,
            }
            div.addEventListener("click",()=>{

                localStorage.setItem("query",JSON.stringify(channelTitle));
                localStorage.setItem("video",JSON.stringify(data));

               

                setTimeout(()=>{
                    window.location.href="video.html";
                },1000)
                  
                
                
            })
        }

        

        


        middleDiv.append(name,dots);
        lowerDiv.append(Cname,tick);
        div.append(image,middleDiv,lowerDiv);
        container.append(div);


        
    });
}

const search= async ()=>{

    let query = document.getElementById("query").value;
    

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${Api}`);
    // let data = await res.json();
    localStorage.setItem("query",JSON.stringify(query));
    window.location.href="searchedVideo.html";
    // app(data.items);


    
}

const input = async ()=>{
    let query = document.getElementById("query").value;
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}&key=${Api}`);
    let data = await res.json();
    
  
    searchBar(data.items);

}

const searchBar = (data)=>{
    let  container = document.getElementById("searchDiv");
    let query = document.getElementById("query").value;

    if(query == ""){

        container.innerHTML = null;
        container.style.padding = "0px";
        

    }else{
        data.forEach(({snippet,id:{videoId},snippet:{channelId}}) => {

            // let img = snippet.thumbnails.high.url;
            let title = snippet.title;
    
            let div = document.createElement('div');
            div.className = "Sbar";
           
            // let image = document.createElement('img');
            // image.src = img;
    
            let p = document.createElement("p");
            p.innerText = title;
    
           
    
            let data={
                snippet,
                videoId,
                channelId
            }
            div.addEventListener("click",()=>{
                localStorage.setItem("query",JSON.stringify(snippet.channelTitle));
                localStorage.setItem("video",JSON.stringify(data));
                window.location.href="searchedVideo.html";
            })
    
            
    
    
            div.append(p);
            container.append(div);
           
    
    
            
        }
        )


    }


}


// const drop = document.getElementById("dropdown");

// drop.addEventListener("click",()=>{
    
//     element.classList.toggle("drop");
//     // drop.classList.toggle("drop")/
// })


const drop = ()=>{
    const element = document.getElementById("dropdown");
    element.classList.toggle("drop");


}
const dr = ()=>{
    const element = document.getElementById("dropd");
    element.classList.toggle("drop");


}



let dark = document.getElementById("dark");
const light = document.getElementById("light");
let theme = localStorage.getItem("mode");

if(theme && theme === "dark"){
    document.body.classList.add("dark-theme");

}
else{
    document.body.classList.remove("dark-theme");
}
dark.onclick = ()=>{
  


    document.body.classList.add("dark-theme");
     if(document.body.classList.contains("dark-theme")){
        return localStorage.setItem("mode","dark")
           
        
    }

 
}


light.onclick = ()=>{


    document.body.classList.remove("dark-theme");
    if(!document.body.classList.contains("dark-theme")){
        return ( localStorage.setItem("mode","light"))
           
        
    }
    

} 


let drk = document.getElementById("drk");
const lit = document.getElementById("lit");
let themee = localStorage.getItem("mode");

if(themee && themee === "dark"){
    document.body.classList.add("dark-theme");

}
else{
    document.body.classList.remove("dark-theme");
}
drk.onclick = ()=>{
  


    document.body.classList.add("dark-theme");
     if(document.body.classList.contains("dark-theme")){
        return localStorage.setItem("mode","dark")
           
        
    }

 
}


lit.onclick = ()=>{


    document.body.classList.remove("dark-theme");
    if(!document.body.classList.contains("dark-theme")){
        return ( localStorage.setItem("mode","light") )
           
        
    }
    

} 






