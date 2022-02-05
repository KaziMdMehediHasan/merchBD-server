/*-----------------following  are  the dependencies-------------------*/
import { initializeApp } from 'firebase/app';
import { getFirestore,collection, addDoc,getDocs,query, where } from "firebase/firestore";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import 'dotenv/config';
/*--------------------above are dependencies------------------------*/
const firebaseApp = initializeApp({
  apiKey:process.env.API_KEY,
  authDomain:process.env.AUTH_DOMAIN,
  projectId:process.env.PROJECT_ID,
  storageBucket:process.env.STORAGE_BUCKET,
  messagingSenderId:process.env.MESSAGING_SENDER_ID,
  appId:process.env.APP_ID,
});

const db = getFirestore();
const port = process.env.PORT || 5000;
const app = express();

/*------------------MiddleWare--------------------*/
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
/*------------------End of MiddleWare--------------------*/


//storing user data to the database
app.post('/users', async (req,res) => {
  const userData = req.body;
  console.log(userData);
  const docRef = await addDoc(collection(db, 'users'), { userData });
  console.log("Document written with ID: ", docRef.id);
  if (docRef.id) { res.status(200).json('Successfully created User') }; 
})



//read the stored data

app.get('/users', async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  // console.log(querySnapshot);
  let usersArray = [];
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().userData);
    // pushing all the data to the newly created array
    usersArray.push(doc.data().userData);
});

  // sending response to client
  res.json(usersArray);
})

// fetching data that the specificUser uploaded
app.get('/specificUser/:email', async (req, res) => {
  const usersCollection = await getDocs(collection(db, "users"));
  let usersArray = [];
  usersCollection.forEach((doc) => {
    // console.log(doc.id, '=>', doc.data());
    usersArray.push(doc.data().userData);
  });
  const dataSpecific = usersArray.filter((user) => user.userEmail == req.params.email);
  // console.log(dataSpecific);
  res.json(dataSpecific);
  // console.log(usersCollection);
  // const q = query(usersCollection, where("userEmail", "==", req.params.email));

  // const specificList = [];
  // const querySnapshot  = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  // // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());
  // });
  // console.log(querySnapshot);
  // // console.log(q);
  // res.send(querySnapshot);
})

app.get('/', (req,res) => {
  res.send('Welcome to MerchBD server');
})
app.listen(port, () => {
    console.log('server is running on port'+port);
})