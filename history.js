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





let Api = "AIzaSyDkYDo20vFknCOVnGvex7Q8YDvIvxxFN-E";

const search= async ()=>{

    let query = document.getElementById("query").value;
    

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${Api}`);
    // let data = await res.json();
    localStorage.setItem("query",JSON.stringify(query));
    window.location.href="searchedVideo.html";
    // app(data.items);


    
}

let query = document.getElementById("query");
let timer;

const debounce = (fun,delay)=>{

     if(timer) clearTimeout(timer)
     timer = setTimeout(fun,delay);
    

}
const input = ()=>{


    debounce(async()=>{
      console.log(query.value)
      let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query.value}&key=${Api}`);
      let data = await res.json();
      searchBar(data.items);
    },500)

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






