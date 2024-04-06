/* 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. 
(Make sure you get back JSON by including the json query key, specific to this API.*/
const baseURL = "http://numbersapi.com";
axios
  .get(`${baseURL}/3?json`)
  .then((resp) => {
    console.log(resp.data.text);
  })
  .catch((err) => {
    console.log(err);
  });

/* 2. Figure out how to get data on multiple numbers in a single request. Make that request and 
when you get the data back, put all of the number facts on the page. */
let numberFacts = [];
const ul2 = document.querySelector(".q-2 ul");

for (let i = 1; i < 5; i++) {
  numberFacts.push(axios.get(`${baseURL}/${i}?json`));
}

Promise.all(numberFacts)
  .then((numbersArr) => {
    numbersArr.forEach((resp) => {
      const li = document.createElement("li");
      li.innerText = resp.data.text;
      ul2.append(li);
    });
  })
  .catch((err) => console.log(err));

/* 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
 *(Note: You’ll need to make multiple requests for this.)* */
let faveNumFacts = [3, 3, 3, 3];
const ul3 = document.querySelector(".q-3 ul");

faveNumFacts = faveNumFacts.map(num => axios.get(`${baseURL}/${num}?json`))

Promise.all(faveNumFacts)
  .then((numbersArr) => {
    numbersArr.forEach((resp) => {
      const li = document.createElement("li");
      li.innerText = resp.data.text;
      ul3.append(li);
    });
  })
  .catch((err) => console.log(err));
