import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const firebaseConfig = {
  databaseURL: "https://onestoppopshop-cffc9-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
function writeProductData(prodId, name, price, imageUrl, weightAmount, weightType, descript, star1Rate, star2Rate, star3Rate, star4Rate, star5Rate, quantity) {
  const database = getDatabase(app);
  const reference = ref(database, 'products/' + prodId);


  set(reference, {
    name: name,
    price: price,
    product_Image : imageUrl,
    weight_Amount : weightAmount,
    weight_Type : weightType,
    prod_description: descript,
    num_1_Stars: star1Rate,
    num_2_Stars: star2Rate,
    num_3_Stars: star3Rate,
    num_4_Stars: star4Rate,
    num_5_Stars: star5Rate,
    quantity

  })
}
writeProductData("1", "12oz Coca-cola", "1.15", "./assets/12ozcokecan.jpeg", "12", "oz", "something", 1, 2, 3, 4, 5, 7);
//writeUserData("testtwo", "t2", "testtwo@gmail.com", "./assets/12ozbigredcan.jpg");

