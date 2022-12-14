/** import the functions you need from the SDKs you need */
import { initializeApp } from 'firebase/app';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from 'firebase/firestore';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
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
const db = getFirestore(app);
const auth = getAuth(app);

/** collection reference */
const collRef = collection(db, 'books');

/** queries */
const qry = query(collRef, orderBy('createdAt'));

/** get collection data
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
*/

/** realtime collection data */
const unsubscibeCollection = onSnapshot(qry, (snapshot) => {
	let books = [];

	snapshot.docs.forEach((doc) => {
		books.push({ ...doc.data(), id: doc.id });
	});

	console.log(books);
});

/** adding documents */
const addBookForm = document.querySelector('.add');

addBookForm.addEventListener('submit', (e) => {
	e.preventDefault();

	addDoc(collRef, {
		title: addBookForm.title.value,
		author: addBookForm.author.value,
		createdAt: serverTimestamp(),
	}).then(() => {
		addBookForm.reset();
	});
});

/** deleting documents */
const deleteBookForm = document.querySelector('.delete');

deleteBookForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const docRef = doc(db, 'books', deleteBookForm.id.value);

	deleteDoc(docRef).then(() => {
		deleteBookForm.reset();
	});
});

/** get a single document */
const docRef = doc(db, 'books', 'n9DMYkV6LTWOlfbBbNSI');

const unsubscribeDocument = onSnapshot(docRef, (doc) => {
	console.log(doc.data(), doc.id);
});

/** updating a document */
const updateBookForm = document.querySelector('.update');

updateBookForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const docRef = doc(db, 'books', updateBookForm.id.value);

	updateDoc(docRef, { title: 'Updated Title' }).then(() => {
		updateBookForm.reset();
	});
});

/** signing users up */
const signupForm = document.querySelector('.signup');

signupForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signupForm.email.value;
	const password = signupForm.password.value;

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredentials) => {
			//console.log('User created: ', userCredentials.user);
			signupForm.reset();
		})
		.catch((err) => {
			console.log(err.message);
		});
});

/** sign users out */
const signoutButton = document.querySelector('.signout');

signoutButton.addEventListener('click', () => {
	signOut(auth)
		.then(() => {
			//console.log('User signed out.');
		})
		.catch((err) => {
			console.log(err.message);
		});
});

/** signing users in */
const signinForm = document.querySelector('.signin');

signinForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signinForm.email.value;
	const password = signinForm.password.value;

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredentials) => {
			//console.log('User signed in: ', userCredentials.user);
			signinForm.reset();
		})
		.catch((err) => {
			console.log(err.message);
		});
});

/** subscribing to auth changes */
const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
	console.log('User status changed: ', user);
});

/** unsubscribe from changes */
const unsubscribeButton = document.querySelector('.unsubscribe');

unsubscribeButton.addEventListener('click', () => {
	console.log('Unsubscribing...');
	unsubscibeCollection();
	unsubscribeDocument();
	unsubscribeAuth();
});
