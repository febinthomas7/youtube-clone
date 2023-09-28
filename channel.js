
let video = localStorage.getItem("video");

let data = JSON.parse(video);







let Api = "AIzaSyDkYDo20vFknCOVnGvex7Q8YDvIvxxFN-E";

const app = async()=>{
    let q = localStorage.getItem("channelName");
    let query = JSON.parse(q);

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${Api}`);
    let data = await res.json();
    
 append(data.items);
}
app();





const mostPopular = async (data)=>{

    try{
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2CbrandingSettings&id=${data.channelId}&key=${Api}`);
        
    // let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${Api}`);
    let data1 = await res.json();
    console.log(data1.items)
    
    banner(data1.items);
    

    }
    catch(e){

       



        let page1 = document.getElementById("page-1");
        page1.style.flexDirection="column";
        
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
        let div3= document.createElement("div");
        div3.className="retry";
        let retry = document.createElement("button");
        retry.innerText="Retry";
        div3.append(retry);
        retry.addEventListener("click",()=>{
            location.reload();
        })

        console.log(e)


        page1.append(div,div2,div3);

    }
   
} 
mostPopular(data);



const banner = (data)=>{


    let page1 = document.getElementById("page-1");


    let subscriber = localStorage.getItem("subscriber");

    let d = JSON.parse(subscriber);

    let img = data[0].snippet.thumbnails.medium.url;
    
    let title = data[0].snippet.title;
    let customName =  data[0].snippet.customUrl;
    let intro = data[0].brandingSettings.channel.description;
    let brand = data[0].brandingSettings.image.bannerExternalUrl;
    let int = intro.slice(0,25);

    localStorage.setItem("channelName",JSON.stringify(customName));
    localStorage.setItem("avatar",JSON.stringify(img));
    


    
    let section = document.getElementById("sec-1");
    let image = document.createElement("img");
    image.src=brand;
    let avatar = document.createElement("img");
    avatar.src=img;
    let div = document.createElement("div");
    div.className="Mdiv";
    let divM = document.createElement("div");
    divM.className="divM";
    
    let div1 = document.createElement("div");
    div1.className="div1";
    let div2 = document.createElement("div");
    div2.className="div2";
    let div3 = document.createElement("div");
    div3.className="div3";
    let btn = document.createElement("button");
    btn.innerText="subscribe";

    let h3 = document.createElement("h3");
    let span=document.createElement("span");
    let i = document.createElement("i");
    
    // i.id="capI";
    i.className="fa fa-check-circle";
    i.style.color="grey";
    i.style.fontSize="15px";
    i.className="fa fa-check-circle";
    if(d.length <= 5){

       i.style.display="none";
    
    }
  
    h3.innerText=title ;
    span.append(h3,i);
    
    let p = document.createElement("p");
    p.innerText=customName +" "+ d +" subscribers";

    let p1 = document.createElement("p");
    p1.innerText=int+"...";
    div3.append(btn);
    div2.append(span,p,p1);
    div1.append(avatar);
    divM.append(div1,div2);
    div.append(divM,div3);

    





    


    section.append(image,div);
    page1.append(section);


}


const append = (data)=>{

    
    data.forEach(({snippet,id:{videoId}}) => {
        console.log(snippet)
        let side = document.getElementById("sec-2");
        let img = snippet.thumbnails.high.url;
        let channelTitle = snippet.channelTitle;
        let title = snippet.title;

        let div = document.createElement('div');
        let div1 = document.createElement("section");
        let image = document.createElement('img');
        let div2 = document.createElement("div");
           div2.className="div2";

           let div3 = document.createElement("div");
           div3.className="div3";

        image.src = img;
        
        let t = title.slice(0,50);
        let name = document.createElement('h5');
        name.innerText = t+"...";

        let Cname = document.createElement('p');
        Cname.innerText = channelTitle;

        // let Cicon = document.createElement("i");
        // Cicon.className ="fa fa-check-circle";

       
        let dot1 = document.createElement("i");
        dot1.className = "fa fa-ellipsis-v";
        dot1.className="dot1";


        // Cname.append(Cicon)
        if(channelTitle == title){
           
            

            let data={
                snippet,
                videoId,
                
            }
            div1.addEventListener("click",()=>{
                localStorage.setItem("video",JSON.stringify(data));
                window.location.href="channel.html";
            })

        }
        else{
            let data={
                snippet,
                videoId,
               
            }
            div1.addEventListener("click",()=>{
                localStorage.setItem("video",JSON.stringify(data));
                window.location.href="video.html";
            })

        }

      



        div.append(div2,div3);
        div2.append(name,Cname);
        div3.append(dot1)
        div1.append(image,div)
        side.append(div1);
        


        
    });
}
    

const drop = ()=>{
    const element = document.getElementById("dropdown");
    element.classList.toggle("drop")


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
        return ( localStorage.setItem("mode","light"),c )
           
        
    }
    

} 
const search= async ()=>{

    let query = document.getElementById("query").value;
    

    // let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${Api}`);
    // let data = await res.json();
    localStorage.setItem("query",JSON.stringify(query));
    window.location.href="searchedVideo.html";
    // append(data.items);


    
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
// `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${Api}`
// "No filter selected. Expected one of: id, forUsername, mine, categoryId, managedByMe, mySubscribers"
// 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=25&key=${Api}'

// 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&maxResults=25&key=[YOUR_API_KEY]' 


