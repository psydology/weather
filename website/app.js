
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
            document.getElementById('temp').innerHTML = `temp is : ${allData.temp}`;
            document.getElementById('content').innerHTML = `I feel : ${allData.content}`;
            document.getElementById('date').innerHTML = `today is : ${allData.date}`;
  
       }catch(error){
         console.log("error", error);
       }
   }


