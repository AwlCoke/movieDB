// const checkURL = (url) => {
//     const request = new XMLHttpRequest();
//     request.open('GET', url, true);
//     request.onreadystatechange = () => {
//         console.log(request.status !== 404)
//         return (request.status !== 404);
//     };
// }

function request( url, type, data){

    if(!url)return Promise.reject(TypeError("url is missing"));

    return new Promise(function(resolve,reject){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open(type||'GET', url, true);
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status >= 200 && xmlhttp.status<400 ) {
                    resolve(xmlhttp);
                }else{
                    reject(xmlhttp.status);
                }
            }
        };
        xmlhttp.onerror=xmlhttp.ontimeout=reject;
        xmlhttp.send(data||null);
    })
}

function checkURL(url,timeout){
    if(url) {
        return new Promise(function(resolve, reject)
        {
            var img=document.createElement("img"), timer, counter=0;
            function clear(){
                if(timer){
                    clearInterval(timer);
                    timer=null;
                }
            }
            timer=setInterval(function(){
                if(img.width){
                    clear();
                    resolve(img);
                }else{
                    if((counter+=20)>(timeout||5000)){
                        clear();
                        reject(Error("timeout"));
                    }
                }
            },20);
            img.onload=function(){
                clear();
                resolve(img);
            }
            img.onerror=function(error){
                clear();
                reject(error);
            }
            img.src=url;
        });
    }
    return Promise.reject(TypeError("url missing"));
}


export default checkURL;