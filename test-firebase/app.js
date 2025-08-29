const initialData = {
  "items": [
        {
            "name":"item 1",
            "price": 23,
            "description": "Lorem ipsium dolorr"
        },
        {
            "name":"item 2",
            "price": 54,
            "description": "Lorem ipsium dolor3"
        }
    ]
}

const metaData = {
    "creationDate":"23-09-2003",
    "lastEditedBy": "Kay",
}

const endPoint = "https://testing-realtime-databas-d1fb9-default-rtdb.firebaseio.com/cart.json";

async function replaceData(){
    const response = await fetch(endPoint, {
        method: "PUT",
        body: JSON.stringify(initialData)
    });

    if(!response.ok){
        console.log("Error!!!!");
        throw new Error("Error sending data to Firebase :(");
    }

    // const data = await response.json();

    console.log("Sent data Successfully!");
}

async function appendingData(){
    //sending data to Firebase with "POST" method will add the sent data to the root of the main object in the backend file and generate a prop name for it then return the generated prop name back to the client
    const response = await fetch(endPoint, {
        method: "POST",
        body: JSON.stringify(metaData)
    });

    if(!response.ok){
        console.log("Error!!!!");
        throw new Error("Error appending data in Firebase :(");
    }

    const data = await response.json();

    console.log("New data block sent successfully and appended to cart object. New data block's prop name is below.");
    console.log(data.name);
}

async function fetchData(){
    const response = await fetch(endPoint);

    if(!response.ok){
      console.log("Error!!!!");
      throw new Error("Error fetching data to Firebase :(");
    }

    const data = await response.json();

    console.log("Successful!");
    console.log(data);
}

async function backendConnection(){
    console.log("Sending fresh data to replace existing backend data..>>>>");
    await replaceData();

    console.log("Sending new data block to add..>>>>");
    await appendingData();

    console.log("Fetching all data..>>>>");
    await fetchData();
    
    console.log("DONE!");
}

console.log("Testing..>>>>");
backendConnection();