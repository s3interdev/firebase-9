/** import the functions you need from the SDKs you need */
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import './style.css';

/** the web app's firebase configuration */
const firebaseConfig = {
	apiKey: 'AIzaSyDCBouBZLsjBJkoKkGARUoVkE_-xo76zA8',
	authDomain: 'the-firebase-9-dojo.firebaseapp.com',
	projectId: 'the-firebase-9-dojo',
	storageBucket: 'the-firebase-9-dojo.appspot.com',
	messagingSenderId: '228274803216',
	appId: '1:228274803216:web:53eaf44e98f1d9759cb095',
};

/** initialize firebase */
const app = initializeApp(firebaseConfig);

/** initialize services */
const db = getFirestore();

/** collection reference */
const collRef = collection(db, 'books');

/** get collection data */
getDocs(collRef)
	.then((snapshot) => {
		let books = [];
		snapshot.docs.forEach((doc) => {
			books.push({ ...doc.data(), id: doc.id });
		});
		console.log(books);
	})
	.catch((err) => {
		console.log(err.message);
	});
