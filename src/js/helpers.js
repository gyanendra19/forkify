const timeout = async function(s){
    return new Promise(function(_, reject){
        setTimeout(() => reject(new Error(`Fetching took too long 💥💥`)), s * 1000)
    })
}


export const getJSON = async function (url) {
   try{
 let res = await Promise.race ([fetch(url), timeout(7)]);
 let data = await res.json();

 if (!res.ok) throw new Error(`${data.message} (${res.status})`)
 return data;
   }catch(err){
     throw err  
 }
}

export const sendJSON = async function (url, uploadData) {
   try{
 let res = await Promise.race ([fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type' : 'application/json',
  },
  body : JSON.stringify(uploadData)
 }), timeout(7)]);
 let data = await res.json();
 console.log(res, data)

 if (!res.ok) throw new Error(`${data.message} (${res.status})`)
 return data;
   }catch(err){
     throw err  
 }
}

