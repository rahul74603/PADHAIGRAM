// Firebase SDK इम्पोर्ट करें
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase Config (Ensure this matches your index.html config)
const firebaseConfig = {
    apiKey: "AIzaSyAfwTimyJUXnP2koJIcyDnmhg-w9Kr67QU",
    authDomain: "padhaigram.firebaseapp.com",
    databaseURL: "https://padhaigram-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "padhaigram",
    storageBucket: "padhaigram.firebasestorage.app",
    messagingSenderId: "1084864272994",
    appId: "1:1084864272994:web:5a8ee9c0bd0ba6ca350f3b"
};

// Firebase App Initialize करें
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 📌 **Live Jobs Load करना**
function loadJobs() {
    const jobListings = document.getElementById("job-listings");
    const jobsRef = ref(db, "jobs");  // Firebase Database Path

    onValue(jobsRef, (snapshot) => {
        jobListings.innerHTML = ""; // पहले से मौजूद डेटा हटा दें
        snapshot.forEach((childSnapshot) => {
            const job = childSnapshot.val();
            const jobCard = `
                <div class="col-md-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${job.title}</h5>
                            <p class="card-text">${job.description}</p>
                            <a href="${job.link}" class="btn btn-primary">Apply Now</a>
                        </div>
                    </div>
                </div>
            `;
            jobListings.innerHTML += jobCard;
        });
    });
}

// 📌 **Study Material Load करना**
function loadStudyMaterial() {
    const materialListings = document.getElementById("material-listings");
    const materialsRef = ref(db, "study-material");  // Firebase Database Path

    onValue(materialsRef, (snapshot) => {
        materialListings.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const material = childSnapshot.val();
            const materialCard = `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${material.title}</h5>
                            <a href="${material.pdfLink}" class="btn btn-outline-primary">Download PDF</a>
                        </div>
                    </div>
                </div>
            `;
            materialListings.innerHTML += materialCard;
        });
    });
}

// **फ़ंक्शन कॉल करें**
loadJobs();
loadStudyMaterial();
