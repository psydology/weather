// // /* Global Variables */
// const feel =  document.querySelector("#feelings").value;
// const d = new Date();
// const newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();
// const apiKey = '2347199b7b202ff9893a858d23753dd0';
// document.getElementById('generate').addEventListener('click', getWeather);

// // Create a new date instance dynamically with JS
// async function getWeather(){
//     try{
//         const zipCode =  document.querySelector("#zip").value;
//         const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric` ;
//         if(!zipCode){
//             alert("you must add a zip code");
//             return;
//         }else{
//             getData (baseURL).then(data => postData("/addData", {
//               temp: data.main.temp,
//               date: newDate,
//               feelings: feel,
//             })
//             ). Then (() => updateUI() )
//         }
        
//         }catch(err){
//         console.log(err)
//     }
// }
// const getData = async (baseURL)=>{
   
//     const req = await fetch (baseURL);
//     try {
//         const data = await req.json();
//         return(data);
//     } catch (error) {
//        console.log(error)
//     }

// }
// const postData = async (url = "/", data = {})=> {
//     await fetch(url, {
//         "method": "POST",
//         "credentials": "same-origin",
//         headers: {"Content-Type": "application/json"},
//         body:  JSON.stringify(data)
//         }) ;
//         try {
//             return;
//         } catch (error) {
//             console.log(error);
//         }
// }

// const updateUI = async () => {
//     const request = await fetch('/all');
//     try{
//       const allData = await request.json();
//       document.getElementById('temp').innerHTML = allData[0].temp;
//       document.getElementById('content').innerHTML = allData[0].feelings;
//       document.getElementById('date').innerHTML = allData[0].date;

//     }catch(error){
//       console.log("error", error);
//     }
// }

//======================================================
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

const apiKey = "&appid=2347199b7b202ff9893a858d23753dd0&units=metric";

const d = new Date();

const newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// eventlistner for show the data when press on the button generator

document.getElementById("generate").addEventListener("click", performAction);

//the main function

function performAction() {
  //getting some values

  const newZip = document.getElementById("zip").value;

  const feelings = document.getElementById("feelings").value;

  //helper function 1 that takes 3 arguments

  getWeather(baseURL, newZip, apiKey).then(function (data) {
    console.log(data);

    //helper 2 that takes 2 argements

    postData("/addData", {
      date: newDate,

      temp: data.main.temp,

      content: feelings,
    });
    
  }).then(updateUI)
}

//helper function 1 that takes 3 arguments then fetch on the complete url then return data

const getWeather = async (url, zip, api) => {
  const res = await fetch(url + zip + api);

  try {
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//helper 2 that tales 2 argument fetching on rout and post the data to the server

const postData = async (url = "", data = {}) => {
  console.log(data);
  // document.getElementById("temp").innerHTML = "temp is: " + data.temp;
  // document.getElementById("content").innerHTML = data.content;
  // document.getElementById("date").innerHTML = "today is " + data.date;

  const response = await fetch(url, {
    method: "post",

    credentials: "same-origin",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();

    console.log(newData);

    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
      const request = await fetch('/all');
      
      try{
            const allData = await request.json();
            console.log(allData)
            document.getElementById('temp').innerHTML = allData[0].temp;
            document.getElementById('content').innerHTML = allData[1].content;
            document.getElementById('date').innerHTML = allData[0].date;
  
       }catch(error){
         console.log("error", error);
       }
   }


