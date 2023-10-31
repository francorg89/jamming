


const client_id = '86c02dba04e54276ac091792491525eb';
const redirect_uri = "https://playlistmakerediter.netlify.app/" //'http://localhost:3000/';
const baseSPUrl = "https://api.spotify.com";

var accessToken;
let expTime;





let Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

        if(window.location.href.match(/access_token=([^&]*)/)){

            accessToken=window.location.href.match(/access_token=([^&]*)/)[1];
            expTime=Number(window.location.href.match(/expires_in=([^&]*)/)[1]);
            window.setTimeout(()=> accessToken=undefined,expTime*1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
         
        console.log("Obviusly this is gonna print ");//ERASE
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public,playlist-modify-private&redirect_uri=${redirect_uri}`;
        }
    },
    search(term){
        const endpoint=`${baseSPUrl}/v1/search?type=track&q=${term}`;
        
        if(!accessToken)
            accessToken = Spotify.getAccessToken();
        const headers = {
            headers:{Authorization: `Bearer ${accessToken}`}
            };
        return fetch(endpoint,headers)
                .then(response=>response.json())
                .then(jsonResponse => {
                
                    let array = jsonResponse.tracks.items;
                    let newArray = [];
                
            
                    for (let i = 0; i<array.length ;i++) 
                        newArray[i] = {name:array[i].name, artist: array[i].artists[0].name,  album: array[i].album.name, id: array[i].id, uri:array[i].uri}; 
                
                
                    
                    return newArray;
            
                });
    },
    savePLaylist(name , uris){
        if(!accessToken)
            accessToken = Spotify.getAccessToken();
        
        let user_id ;
        let playlist_id;
        fetch(`${baseSPUrl}/v1/me`,{headers:{Authorization: `Bearer ${accessToken}`}})
                    .then(response => {
                        if(response.ok)
                            return response.json();
                        throw new Error("Request failed");
                    }).then(jsonResponse => {
                        user_id = jsonResponse.id;
                        const arg2 = {
                            headers:{Authorization: `Bearer ${accessToken}`},
                            method:'POST',
                            body:JSON.stringify({
                                "name":name,
                                "description":"PLaylist made with jamming",
                                })

                            };
                        fetch(`${baseSPUrl}/v1/users/${user_id}/playlists`,arg2)
                            .then(response => {
                                if(response.ok)
                                    return response.json();
                                throw new Error ("Fail to make a playlist")

                            }
                            ).then(jsonResponse => {
                                playlist_id = jsonResponse.id;
                                const arg2 =  { headers:{Authorization: `Bearer ${accessToken}`},
                                                method:'POST'};
                                
                                fetch(`${baseSPUrl}/v1/playlists/${playlist_id}/tracks?uris=${uris}`,arg2)
                                    .then(response => {
                                        if(response.ok)
                                            return response.json();
                                        throw new Error("Error adding tracks");
                                    })
                                    .then(jsonResponse => {
                                        window.alert("PLaylist created");
                                        })
                                    .catch(error => {console.log(error)});
                                
                                }
                            ).catch(error => {console.log(error);});
                    }).catch(error => {console.log(error);});

    

    }
} /*
    
            
            /*
            

            
            
    
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