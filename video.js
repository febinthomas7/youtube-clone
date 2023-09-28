
var video = localStorage.getItem("video");

var data = JSON.parse(video);

// let data1 = JSON.parse(video);




const playVideo =(data)=>{

    let container = document.getElementById("play");
    let iframe = document.createElement("iframe");
    let title = document.getElementById("title");
    // const {snippet:{thumbnails}} =data.snippet;
    title.innerText=data.snippet.title+"- YouTube";
    //    iframe.src =`https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=1`;
    iframe.src =`https://www.youtube.com/embed/${data.videoId}?rel=0&autoplay=1&mute=1`;

       iframe.allowFullscreen = true;
       container.append(iframe);


}
playVideo(data);





let Api = "AIzaSyDkYDo20vFknCOVnGvex7Q8YDvIvxxFN-E";
const avatar= async(data)=>{

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data.channelId}&maxResults=25&key=${Api}`);
    
    let data1= await res.json();
    console.log(data.snippet)
    const {snippet:{thumbnails}} =data1.items[0];
    const {statistics:{subscriberCount}} =data1.items[0];

    
    console.log(subscriberCount)
  
    
 
    localStorage.setItem("avatar",JSON.stringify(thumbnails.default.url));
    localStorage.setItem("subscriber",JSON.stringify(subscriberCount));


}
avatar(data);


// 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails&id=UC5hNTS5NiBT6l8e50bdnQCw&maxResults=25&key=[YOUR_API_KEY]' 
const description = async (data)=>{

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${data.videoId}&key=${Api}`);
    let data2 = await res.json();
    append(data2.items)
    desc(data2.items);
    // console.log(data2)

    

   
} 
description(data);


const desc = (data2)=>{

    let container = document.getElementById("a55");
    let caps = document.getElementById("caps");
    


    

    data2.forEach(({snippet,statistics})=>{

        let strong = document.createElement("strong");
        let strong1 = document.createElement("strong");
        var sn = snippet.publishedAt
        var date = sn.slice(8,10);
        var mon = sn.slice(0,10);
        var today = new Date(mon);
        var month = today.toLocaleString('default', { month: 'short' });

        strong.innerText = statistics.viewCount +" views";
        strong1.innerText= date + month;

        let section1 = document.createElement("section");
        section1.innerText=snippet.title;

        let p = document.createElement("p");

        let span1 =document.createElement("span");
        span1.id = "dots";
        span1.style.display ="inline";


         let span2 = document.createElement("span");
         span2.id = "more";
         span2.style.display ="none";

         let p1 = document.createElement("p");
         p1.innerText = snippet.localized.description;

         let lastp = document.createElement("p");
         lastp.style.cursor = "pointer";
         lastp.style.fontWeight = "600";
         lastp.id ="myBtn";
         lastp.innerText = "Read more";

         lastp.addEventListener("click",()=>{

            let  dots = document.getElementById("dots");
            let moreText = document.getElementById("more");
            let btnText = document.getElementById("myBtn");

            if (dots.style.display === "none") {
                dots.style.display = "inline";
                btnText.innerHTML = "Read more"; 
                moreText.style.display = "none";
              } else {
                dots.style.display = "none";
                btnText.innerHTML = "Read less"; 
                moreText.style.display = "inline";
              }
            
         })

         let desc = document.getElementById("desc");

         let desc1 = document.createElement("div");
         desc1.className="desc1";
         let descDiv1= document.createElement("div");
         let desc1strong=document.createElement("strong");
         desc1strong.innerText="Description";
         let descDiv2 = document.createElement("div");
         let cross = document.createElement("i");
         cross.className="fa fa-times";
         cross.id="close";
         descDiv2.append(cross);
         descDiv1.append(desc1strong);

         let desc2 = document.createElement("div");
         desc2.className="desc2";
         let desc2Div= document.createElement("div");
         desc2Div.className ="de-2";
         let desc2strong=document.createElement("strong");
         desc2strong.innerText=snippet.title;
         let desc2Div1= document.createElement("div");
         desc2Div1.className ="d-2";
         let desc2Div2= document.createElement("div");
         desc2Div2.className ="d-2";
         let desc2Div3= document.createElement("div");
         desc2Div3.className ="d-2";



         let div2 = document.createElement("div");
         let div2Strong = document.createElement("strong");
         div2Strong.innerText=statistics.likeCount;
         div2.append(div2Strong);
         let div2_2 = document.createElement("div");
         div2_2.className="small";
         div2_2.innerText="likes";

         let div22 = document.createElement("div");
         let div22Strong = document.createElement("strong");
         div22Strong.innerText=statistics.viewCount;
         div22.append(div22Strong);
         let div22_2 = document.createElement("div");
         div22_2.className="small";
         div22_2.innerText="views";

         let div222 = document.createElement("div");
         let div222Strong = document.createElement("strong");
         var sn = snippet.publishedAt
         var le = sn.slice(0,4);
         var date = sn.slice(8,10);
         var mon = sn.slice(0,10);
         var today = new Date(mon);
         var month = today.toLocaleString('default', { month: 'short' });
       
         
         div222Strong.innerText=date+month;
         div222.append(div222Strong);
         let div222_2 = document.createElement("div");
         
        
         
        //  console.log(month)
         div222_2.className="small";
         div222_2.innerText=le;

         let desc3 = document.createElement("div");
         desc3.className="desc3";
         let div3p=document.createElement("p");
         div3p.innerText=snippet.localized.description;


         
         
         



         desc2Div3.append(div222,div222_2)
         desc2Div2.append(div22,div22_2)
         desc2Div1.append(div2,div2_2)
         desc2Div.append(desc2Div1,desc2Div2,desc2Div3)
         desc2.append(desc2strong,desc2Div)
         desc3.append(div3p);
         
         

         let hr1 = document.createElement("hr");
         let hr2 = document.createElement("hr");
         desc1.append(descDiv1,descDiv2);
         desc.append(desc1,desc2,hr1,desc3,hr2);//id


         let cap2 = document.createElement("div");
         cap2.className="caption-2";
         cap2.id="bar";
         cap2.addEventListener("click",()=>{

            const bar= document.getElementById('bar');
            const nav= document.getElementById('desc');
            const close= document.getElementById('close');
            
            if(bar){
                bar.addEventListener('click',()=>{
                    nav.classList.add('active1');
                })
            }
            if(close){
                close.addEventListener('click',()=>{
                    nav.classList.remove('active1');
                })
            }
         })

         let cp = document.createElement("div");
         cp.id="cp-2";
         cp.innerText = statistics.viewCount + " views";
         let strong2 = document.createElement("strong");
         strong2.innerText="...more";
         let cpSpan=document.createElement("span");
         cpSpan.innerText=date+month;

         let caption = document.createElement("div");
         caption.className="caption";
         let capDiv = document.createElement("div");
         capDiv.style.marginLeft="0";


         let avatar = localStorage.getItem("avatar");
          let data = JSON.parse(avatar);
         
        
         
         let capImg = document.createElement("img");
         capImg.src=data;



         let sub = document.createElement("div");
         sub.className="sub";
         let h5 = document.createElement("h5");
         let h5short= snippet.channelTitle.slice(0,6);
         h5.innerText= h5short+"...";
         let subI = document.createElement("i");
         subI.className="fa fa-check-circle";
         subI.style.color="grey";
         subI.style.fontSize="15px";
         let subs = localStorage.getItem("subscriber");
         let subData = JSON.parse(subs);
         let subP = document.createElement("p");
         subP.innerText = subData;
         let subSpan = document.createElement("span");
         subSpan.innerText="subscribers";
         let subscribe = document.createElement("div");
         let btn = document.createElement("button");
         btn.innerText="subscribe";


         let caption1 = document.createElement("div");
         caption1.className="caption-1";
         let a1 = document.createElement("div");
         a1.className="a1";
         let a11 = document.createElement("div");
         a11.id="a11";
         let a11I = document.createElement("i");
         a11I.className="fa-regular fa-thumbs-up";
         let a11h5 = document.createElement("h5");
         a11h5.innerText = statistics.likeCount;
         let a12 = document.createElement("div");
         a12.id="a12";
         let a12I = document.createElement("i");
         a12I.className= "fa-regular fa-thumbs-down";

         let a22 = document.createElement("div");
         a22.className="a22";
         let a22I = document.createElement("i");
         a22I.className="fa fa-share";
         let a22h5 = document.createElement("h5");
         a22h5.innerText = "share";
         let a22Div = document.createElement("div");

         let a44 = document.createElement("div");
         a44.className="a44";
         let a44I = document.createElement("i");
         a44I.className="fa-regular fa-bookmark";
         let a44h5 = document.createElement("h5");
         a44h5.innerText = "Download";
         let a44Div = document.createElement("div");

         let a45 = document.createElement("div");
         a45.className="a45";
         let a45I = document.createElement("i");
         a45I.className="fa-regular fa-bookmark";
         let a45h5 = document.createElement("h5");
         a45h5.innerText = "Clip";
         let a45Div = document.createElement("div");

         let a4 = document.createElement("div");
         a4.className="a4";
         let a4I = document.createElement("i");
         a4I.className="fa-regular fa-bookmark";
         let a4h5 = document.createElement("h5");
         a4h5.innerText = "save";
         let a4Div = document.createElement("div");

         let a5 = document.createElement("div");
         a5.className="a5";
         let a5I = document.createElement("i");
         a5I.className="fa-solid fa-ellipsis";

         let video = document.getElementById("Vtitle");

         
         video.innerText= snippet.title;
        //  video.append(h4);
         
       
      
        


         a22Div.append(a22I,a22h5)
         a22.append(a22Div);

         a44Div.append(a44I,a44h5)
         a44.append(a44Div);

         a45Div.append(a45I,a45h5)
         a45.append(a45Div);
         
         a4Div.append(a4I,a4h5)
         a4.append(a4Div);

        
         a5.append(a5I);


         

               
         a12.append(a12I);
         a11.append(a11I,a11h5);
         a1.append(a11,a12);
         caption1.append(a1,a22,a44,a4,a5);
         
         cp.append(cpSpan,strong2)
         cap2.append(cp);
         caps.append(cap2);

         subscribe.append(btn);


         let i = document.createElement("i");
         i.id="capI";
         i.className="fa fa-check-circle";
         i.style.color="grey";
         i.style.fontSize="15px";

         if(subData.length <= 5){

            i.style.display="none";
            subI.style.display="none";
         }
         
         h5.append(subI);
         subP.append(subSpan);
         sub.append(h5,subP,i);


         capDiv.append(capImg);
         caption.append(capDiv,sub,subscribe);
         caps.append(caption,caption1)

        //  description

         span2.append(p1);
         p.append(span1,span2)

         container.append(strong,strong1,section1,p,lastp);



        // console.log(snippet)
    })



}




const mostPopular = async (data1)=>{

    try{
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=${Api}`);
    // let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${Api}`);
    let data = await res.json();
    // console.log(data)
    append(data.items,data1)

    }
    catch(e){

        let container = document.getElementById("video");
        let play = document.getElementById("play");
        let a55 = document.getElementById("a55");
        let sidebar = document.getElementById("sidebar");
        let VTitle = document.getElementById("Vtitle");
        let caps = document.getElementById("caps");

        


        VTitle.style.display="none";
        caps.style.display="none";
        sidebar.style.display = "none";
        play.style.display = "none";
        container.style.width="100%";
        container.style.marginTop="100px";
        container.style.marginLeft="0px";



        a55.style.padding = "0px";
        
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



        container.append(div,div2,div3);

    }
   
} 
mostPopular(data);



const append = async(data1,data)=>{
    console.log(data.snippet)
    let side = document.getElementById("side");
    data1.forEach(({snippet,id:{videoId}}) => {

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
        
        let name = document.createElement('h5');
        name.innerText = title;

        let Cname = document.createElement('p');
        Cname.innerText = channelTitle;

        let Cicon = document.createElement("i");
        Cicon.className ="fa fa-check-circle";

        // let dot = document.createElement("i");
        
        // dot.className = "fa fa-ellipsis-v";
        // dot.className = "dot";

        let dot1 = document.createElement("i");
        dot1.className = "fa fa-ellipsis-v";
        dot1.className="dot1";


        Cname.append(Cicon)
        let data={
            snippet,
            videoId
        }
        div1.addEventListener("click",()=>{
            localStorage.setItem("video",JSON.stringify(data));
            window.location.href="video.html";
        })

      



        div.append(div2,div3);
        div2.append(name,Cname);
        div3.append(dot1)
        div1.append(image,div)
        side.append(div1);
        


        
    }
   
   
    
    
    
    
    );
    let {snippet:{channelId}} =data;
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&maxResults=25&key=${Api}`);
    
    let d= await res.json();
    console.log(d.snippet)
    const {snippet:{thumbnails}} =d.items[0];
    const {statistics:{subscriberCount}} =d.items[0];

    
    console.log(subscriberCount);
  
    
 
    localStorage.setItem("avatar",JSON.stringify(thumbnails.default.url));
    localStorage.setItem("subscriber",JSON.stringify(subscriberCount));
}

// const most = async ()=>{

//     let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${Api}`);
//     let data2 = await res.json();
//     console.log(data2.items)
    
   
// } 
// most();
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


