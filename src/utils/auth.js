import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

let user_data;

const firebaseConfig = {
  apiKey: "AIzaSyDmDrmpgSch-rWKJ-o06xcjdVu99HvEVNA",
  authDomain: "project30-06.firebaseapp.com",
  projectId: "project30-06",
  storageBucket: "project30-06.appspot.com",
  messagingSenderId: "766127515377",
  appId: "1:766127515377:web:248817fdc57a08e6a0ab50",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// отримуємо посилання на елементи авторизації

const loginButton = document.querySelector("#login-button"),
  logoutButton = document.querySelector("#logout-button"),
  user_icon = document.querySelector("#user_icon");

// подія кліку по кнопці логін
loginButton.addEventListener("click", (e) => {
  e.preventDefault(); // Перенесено сюда

  const provider = new GoogleAuthProvider();
  console.log(provider);

  signInWithPopup(auth, provider)
    .then((resp) => {
      const user = resp.user;
      console.log("User has been logged in");

      localStorage.setItem("user", JSON.stringify(user));

      updateUI(user);
    })
    .catch((err) => {
      console.error("Error during sign-in: ", err);
    });
});

logoutButton.addEventListener("click", (e) => {
  e.preventDefault(); // Перенесено сюда

  signOut(auth)
    .then(() => {
      console.log("User has been logged out");
      localStorage.removeItem("user");
      updateUI(null);
    })
    .catch((err) => {
      console.error("Error during sign-out: ", err);
    });
});

// отримати стан авторизації юзера

auth.onAuthStateChanged((user) => {
  if (user) {
    const savedUserData = localStorage.getItem("user");
    if (savedUserData) {
      user_data = JSON.parse(savedUserData);
    }
    updateUI(user_data);
  } else {
    updateUI(null);
  }
});

function updateUI(user) {
  if (user) {
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
    user_icon.style.display = "block";
    user_icon.src = user.photoURL;
  } else {
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
    user_icon.style.display = "none";
  }
}

console.log("Login button:", loginButton);
console.log("Logout button:", logoutButton);
console.log("User icon:", user_icon);
