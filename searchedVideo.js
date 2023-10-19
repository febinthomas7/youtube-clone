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


let q = localStorage.getItem("query");
let query = JSON.parse(q);
let title = document.getElementById("title");
  
    title.innerText= query+"- YouTube";








// AIzaSyAUgra2V1mbpDMTkE9RTvVDyu1VkS1f2k0

let Api = "AIzaSyDkYDo20vFknCOVnGvex7Q8YDvIvxxFN-E";


// AIzaSyDu9S6TuI7bQ9E29AVGsUDshpMsxaEyYWI

// AIzaSyA6AIQmAAKnECvG1DckRmdY4zvijPtshgg


let btn = document.querySelectorAll(".btn");

btn.forEach((bt)=>{
    bt.addEventListener("click",async(e)=>{
        // console.log(e.target.innerHTML)
        let val = e.target.innerHTML;
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${val}&key=${Api}`);
        let data = await res.json();
        localStorage.setItem("query",JSON.stringify(val));
        app(data.items);
    })
})

const mostPopular = async ()=>{


    let data = localStorage.getItem("query");
    let query = JSON.parse(data);

    try{
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${Api}`);
    // let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${Api}`);
    let data = await res.json();
    // console.log(data)
    app(data.items)

    }
    catch(e){

        let container = document.getElementById("Main");
        let div = document.createElement("div");
        div.className="errorDiv";
        div.style.marginTop="15%"
        let img = document.createElement("img");
        img.src="error.png";
        let p = document.createElement("p");
        p.innerText="Connect to the Internet"
        div.append(img,p)

        let div2 = document.createElement("div");
        div2.className="errorDiv2";
        let p1 = document.createElement("p");
        p1.innerText = "Check your connection.";
        let p2 = document.createElement("p");
        p2.innerText = "Check your Api limit.";
        div2.append(p1,p2);



        container.append(div,div2);

    }
    
    
} 
mostPopular();


const app = (data)=>{
    let container = document.getElementById("container");
    container.innerHTML = null;
    data.forEach(({snippet,id:{videoId},snippet:{channelId}}) => {

        let img = snippet.thumbnails.high.url;
        let channelTitle = snippet.channelTitle;
        let title = snippet.title;

        let div = document.createElement('div');
        div.className = "homeDiv";
        

        let image = document.createElement('img');
        image.className = "homeImg";
        image.src = img;
        
        
        let text = title.replace(/#/g, " #");
        let name = document.createElement('p');
        name.innerText = text;
        

        let Cname = document.createElement('span');
        Cname.innerText = channelTitle;

        let dots = document.createElement("i");
        dots.className = "fa fa-ellipsis-v";

        let sub = localStorage.getItem("subscriber");
        let subD = JSON.parse(sub);
        
        let tick = document.createElement("i");
        tick.className ="fa fa-check-circle";
        if(subD.length <= 5){
            tick.style.display="none";
        }

        let middleDiv = document.createElement("div");
        middleDiv.className="middleDiv";

        let lowerDiv = document.createElement("div");
        lowerDiv.className="lowerDiv";

        let ldiv= document.createElement("div");
        
        
        ldiv.className="ldiv";


        if(text == channelTitle){
            name.style.display="none";
            image.style.borderRadius="50%";
            image.style.width="240px";
            div.style.alignItems="center";
            Cname.innerText =channelTitle +" ("+ subD +" subscribers)";
            Cname.style.display="flex";
            lowerDiv.style.justifyContent="center";
            lowerDiv.style.alignItems="center";
            lowerDiv.style.position="relative";
            lowerDiv.style.top="50%";
            dots.style.display="none";

            let data={
                snippet,
                 channelId,
            }
            div.addEventListener("click",()=>{
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
                localStorage.setItem("video",JSON.stringify(data));
                window.location.href="video.html";
            })

        }
        

        


        middleDiv.append(name,dots);
        lowerDiv.append(Cname,tick);
        ldiv.append(middleDiv,lowerDiv)
        div.append(image,ldiv);
        container.append(div);


        
    });
}

const search= async ()=>{

    let query = document.getElementById("query").value;
    let q = localStorage.getItem("query");
    let qry = JSON.parse(q);
    let title = document.getElementById("title");
  
    title.innerText= qry+"- YouTube";
    

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${Api}`);
    let data = await res.json();
    localStorage.setItem("query",JSON.stringify(query));
    window.location.href="searchedVideo.html";
    // app(data.items);


    
}

const input = async ()=>{
    let query = document.getElementById("query").value;
    let q = localStorage.getItem("query");
    let qry = JSON.parse(q);
    let title = document.getElementById("title");
  
    title.innerText= qry+"- YouTube";


    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}&key=${Api}`);
    let data = await res.json();
  
    searchBar(data.items);

}

const searchBar = (data)=>{
    let  container = document.getElementById("searchDiv");
    let query = document.getElementById("query").value;
    let q = document.getElementById("query");
    let fa_search = document.getElementById("fa-search");

    if(query == ""){

        container.innerHTML = null;
        container.style.padding = "0px";
        q.classList.remove("query");
        fa_search.style.display="none";

    }else{
        q.classList.add("query");
        fa_search.style.display="flex";
        data.forEach(({snippet,id:{videoId}}) => {

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
                videoId
            }
            div.addEventListener("click",()=>{
                localStorage.setItem("video",JSON.stringify(data));
                localStorage.setItem("query",JSON.stringify(snippet.channelTitle));
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
    element.classList.toggle("drop")


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






