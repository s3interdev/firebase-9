/** import the functions you need from the SDKs you need */
import { initializeApp } from 'firebase/app';
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
