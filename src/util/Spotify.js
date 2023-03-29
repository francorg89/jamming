var client_id = '86c02dba04e54276ac091792491525eb';
var redirect_uri = 'http://localhost:3000/';


var url = 'https://accounts.spotify.com/authorize';
url += '?client_id=' + client_id;
url += '&response_type=token';
url += '&redirect_uri=' + redirect_uri;




let Spotify = {
    
     getAccesToken(){
        console.log("Main call -- ALways Printed");
        console.log("Token definied? " + (userToken !== undefined));
        console.log("Token value: "+ userToken);
        
        console.log(cont);
        console.log("----------------");
        
        if(userToken){
            console.log("Variables SET");
            console.log("Token definied? " + (userToken !== undefined));
            console.log("Token value: "+ userToken);
            console.log("Time for expire: "+expTime);
            console.log("-------Returning token (end here)---------")
            
            
            
            cont++;
            
            return userToken;
            
        }
        else{
            console.log("Flag false(no token)")
            console.log("Token value: " + userToken);
            console.log("Token undefinied?: " + (userToken === undefined));
            console.log("--------------------");
            if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/) ){
                console.log("token is in the url (Assing time)");
                let aux;
                aux = window.location.href.match(/access_token=([^&]*)/);
                userToken = aux[1];
                aux = window.location.href.match(/expires_in=([^&]*)/);
                expTime = aux[1];
                window.setTimeout(()=> userToken = "", expTime*1000);
                window.history.pushState("Acces Token",null,"/");
                console.log("-----------Variables assigned-------------");
                return userToken;
            }else{
                console.log("First scenario: ALL NEW");
                console.log("Token value: " + userToken);
                console.log("Token undefinied?: " + (userToken === undefined));
                console.log("--------------------");
                
                window.location= url;
            }

            
            /*
            

            */
            
            
            cont++;
            
            
        }
            
    },

    search(term){
        return new Promise((resolve,reject) =>{
        let endpoint = baseSPUrl+"/v1/search?type=track&q="+term;
        userToken=this.getAccesToken();
        let arg2 = {headers:{Authorization: `Bearer ${userToken}`}};
        console.log(userToken);
        fetch(endpoint,arg2).
            then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error("Request failed");
            }).then(jsonResponse => {
                
                let array = jsonResponse.tracks.items;
                let newArray= [];//array.map(track => {
                    //{name:track.name, artist: track.artists[0].name, album:track.album.name,id:track.id, uri:track.uri};
                //});
                console.log(array);
                for (let i = 0; i<array.length ;i++) {
                    newArray[i] = {name:array[i].name, artist: array[i].artists[0].name,  album: array[i].album.name, id: array[i].id} 
                    console.log(`Song: ${array[i].name} - ID: ${array[i].id} / Album : ${array[i].album.name} - Artist : ${array[i].artists[0].name} -- URI: ${array[i].uri} ` );
                }
                console.log(newArray);
                
                resolve(newArray);

                
            }).catch(networkError => {console.log(networkError.message); console.log(arg2); console.log(arg2)});
        
    });
    },
    savePLaylist(name, urisArray){
        if(name && urisArray)
            return;
    }
};


let userToken;
let expTime;
let cont=0;
let baseSPUrl = "https://api.spotify.com";
//let endpoint = "/v1/search?type=TRACK"; 



export {Spotify};