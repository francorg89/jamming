



const client_id = '86c02dba04e54276ac091792491525eb';
const redirect_uri = 'http://localhost:3000/';
const baseSPUrl = "https://api.spotify.com";

var accessToken;
let expTime;





let Spotify = {
    getAccessToken(){
        if(accessToken){
            console.log(`Token already obtinend with a value of ${accessToken}`);//ERASE
            return accessToken;
        }

        if(window.location.href.match(/access_token=([^&]*)/)){

            accessToken=window.location.href.match(/access_token=([^&]*)/)[1];
            expTime=Number(window.location.href.match(/expires_in=([^&]*)/)[1]);
            console.log(`Variables are now settled: Token:${accessToken} and :${expTime}`); //ERASE when done
            window.setTimeout(()=> accessToken=undefined,expTime*1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
         
        console.log("Obviusly this is gonna print ");//ERASE
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
        }
    },
    search(term){
        const endpoint=`${baseSPUrl}/v1/search?type=track&q=${term}`;
        const endpoint2=`${baseSPUrl}/v1/me`;
        if(!accessToken)
            accessToken = Spotify.getAccessToken();
        const headers = {
            headers:{Authorization: `Bearer ${accessToken}`}
            };
        return fetch(endpoint,headers).
                then(response=>response.json()).
                then(jsonResponse => {
                    let array = jsonResponse.tracks.items;
                    let newArray = [];
                
            
                    for (let i = 0; i<array.length ;i++) 
                        newArray[i] = {name:array[i].name, artist: array[i].artists[0].name,  album: array[i].album.name, id: array[i].id} 
                
                
                    
                    return newArray;
            
                });
    }
} /*
    
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
                window.setTimeout(()=> userToken = "", Number(expTime*1000));
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
            

            
            
            
            cont++;
            
            
        
            
    },

    search(term){
        return new Promise((resolve,reject) =>{
        let endpoint = `${baseSPUrl}/v1/search?type=track&q=${term}`;
        if(userToken)
            console.log("Token already exists contiuning ....")
        else
            userToken=Spotify.getAccesToken();
        let arg2 = {headers:{Authorization:`Bearer ${userToken}`}};
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

                
            }).catch(networkError => {console.log(networkError.message); });
        
    });
    } ,
    savePLaylist(name, urisArray){
        
        if(!name || !urisArray)
            return;
       

        
         console.log("test 1 passed")   ;
        
        let id ;
        let accesToken;
        if(userToken)
            accesToken = userToken;
        else
            accesToken = this.getAccesToken();
        let headers = {Authorization: `Bearer ${accesToken}`,};
        

        return fetch((baseSPUrl+"/v1/me"),{headers: headers})
        .then(response => {
            console.log("Response recivied");
            if(response.ok)
                console.log("We did it ");
            return response.json();
            
        }).then(jsonResponse => {
            id = jsonResponse.id
            console.log(id);
            console.log(headers);
            //return fetch(`https://api.spotify.com/v1/users/${id}/playlists` ,  
            return fetch (`${baseSPUrl}/v1/playlists/4FMvPTkuxFqcTofv0hRxpk/tracks`, 
                    {
                        headers:headers, 
                        method:'POST',
                        body: JSON.stringify({"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]})
                    }).then(response => {
                        console.log(response);
                        return response.json()})
                    .then(jsonResponse => {const playlistId = jsonResponse.id});
        }
        );
        
    }
        /*
        .then(response => {
            if(response.ok)
                return response.json();
            throw new Error("Request failed");
        })
        .then(jsonResponse => {
            console.log(jsonResponse);
            id = jsonResponse.id;
            console.log(id);
        })
        .catch();*/
/*
        let body = JSON.stringify({
            "name": "New list",
            "description": "New playlist description",
            "public": false
        });
        
        console.log(body );
        
        fetch((baseSPUrl+`/v1/users/${id}/playlists`),{headers: headers,
                                                    method:"POST" ,
                                                    body: body})
        .then(response => {
            
                console.log(response);
                console.log(response.ok);
               // response.json();
            
                console.log(headers);
                console.log(body);
                throw new Error("something went wrong very");
            
        }).then(jsonResponse => {

        }).catch(error => {console.log(error)}); */
        // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization



//const token = 'BQDk_xRa6E63E4gz_Sz2Id6XS2imQrzKpRZcXrA2SzlCcEiUah_vp73qLyJkOgcAnKoqC9dQR_Kt-SayYOnnlqtyV_MDtPY-cyRAb3uDfNpcq6k8GiWpAL0x6ruS6dE6BPSYaigCnaQ2PnEyB6Oghwj4oG-MPXadzZZFUZC811r0g-RftGWw5ykYXwWffBzMAMMnr9eUe8SwmLANgwv7rG3OcBmiOIZH08WmkFA3Di9s5CcngVb5GUK-EcMcFEaJa8af44WIar4CWpKnVxV4G7QTA_puAbsYq2udIC5F4Qt8USMAEgx435sHvwSiKni7NV0yP6Smtzl3X3BefNavQ1qez3DYvBdl-XkZJEn15SDoMYs';
//const token = 'BQDvp_I-7w7Frkj5G775p6CegRXqnOSAohJSQNWjyTGuLeXmtPl2R7yycfEhM4NgNwcZUxrFaShNDkZnZGSp2LtbG3YaDCJNFtquVDHLziI5eWqPKr6FE_W9Zix-R-JzgjGVbD2Y98oDfD6iYK3oOs5FMQjsf1pfKgkjv2J3_fd8lEp3V6jLy6MumoJYUeCRylczxcDm3fFMSxvnSyNCqMikZh0O_Gdts9U5C5VEVPbegBDzcTAHBoImiq0k5iS1ZuyZdRhYYdHCQfCs4P15fpTlr-V2dCceRC6uqJ3nBMgAQSecZ-tqZldWDQQUHwJjBv9pBS-3G5sE5Ssg5r85eR5hQ_8H7X6aFjHi4ppSkaovZTs';
//const token = 'BQBd-57FJjV_-3Z_L7JfCK3e0O1cXasiXSbVadExV9j7JNiGqcplOnMTOduUcw48DrYGlLYiGGoHqoiQm61znP3ulNj6lloE96kjZhmXJek91QRKitUrHylMLOOtLEh_znX_hGFScYR5o37vTybH6yTy-2gNXx-mAorbjwvyd06i-Md1vFa1il4v2mz_JUaujogbFyBOsRgzB8jrDWf5TLZI7Guq-CC0JEg6f1AhilMa5Bh6OKP_ICo4lJWoUEkjC6ah-gp-ESvupW_kB9GLROlmERwxdPg8nIZjod9C3VGL8m8PUqIsYJOycocuG-CZP69uskL0eQBYRaV73xUjogFIR_-3A-3ARgUpt-7fbt1lNTM';

//const token = 'BQAihFkTwz8cRZe9f2AkH3qu5d8mB05DKGjspOXaCSwhENSsYYvaAaizQMp4N5jW5Bh1Ouksez93J6TmsrwOuDAVXXySTWLqoh6Kri3M73w_1ANT9NMYU4iZze-uIzbbWWSZext_tCskYx9B6rIXOL7NMfN_BevQvSrHE9NPQAOveS7oHSNSI0tG4Fx-PL_3E67yxaNHtqXFJF1ffPAXJ_yHcx_xgLJlaUt23NESO1uQhAWFqOmZeKT1Sf9g_HJfP6o_VFd2MTqMWKykLLgiSg_VYTE0zxAXPPPEhITbXLVZTJ3A8UogvbBDluKezxvt0K88A_Cc6ppKRxGgKd0P9nTCo5b1_j-_xMwCx7EBmGmbSUY';

/*

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accesToken}`
    },
    method:method,
    body:JSON.stringify(body)
  });
  if(res.ok)
    return await res.json();
  throw new Error ("Could do it ");
}




async function createPlaylist(){
  return await fetchWebApi(
    `v1/users/${id}/playlists`, 'POST', {
      "name": "Test 2.3 from The main page",
      "description": "The firsts with my token",
      "public": false
  }).then(playlist => {
    /*fetchWebApi(
      `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
      'POST'
    );
    //return playlist;

    console.log(playlist.id);
  }).catch(error => {console.log(error);});
}

const createdPlaylist = await createPlaylist();
//console.log(createdPlaylist.name, createdPlaylist.id); */
    

     






export {Spotify};