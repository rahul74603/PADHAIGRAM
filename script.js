// Firebase SDK इम्पोर्ट करें
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// ✅ **Firebase Config (सही किया हुआ)**
const firebaseConfig = {
    apiKey: "AIzaSyAfwTimyJUXnP2koJIcyDnmhg-w9Kr67QU",
    authDomain: "padhaigram.firebaseapp.com",
    databaseURL: "https://padhaigram-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "padhaigram",
    storageBucket: "padhaigram.appspot.com",  // ✅ **सही Storage URL**
    messagingSenderId: "1084864272994",
    appId: "1:1084864272994:web:5a8ee9c0bd0ba6ca350f3b"
};

// 🔹 **Firebase App Initialize करें**
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ **Live Jobs Load करने का Function**
function loadJobs() {
    const jobListings = document.getElementById("job-listings");
    if (!jobListings) return; // **अगर ID नहीं मिली तो कोड आगे न बढ़े**

    jobListings.innerHTML = `<p>Loading jobs...</p>`; // ✅ **Loading Message**  

    try {
        const jobsRef = ref(db, "jobs"); // **Firebase Database Path**

        onValue(jobsRef, (snapshot) => {
            jobListings.innerHTML = ""; // **पहले से मौजूद डेटा हटा दें**
            
            if (!snapshot.exists()) {
                jobListings.innerHTML = `<p>No jobs available</p>`; // **डेटा नहीं है तो मैसेज दिखाएं**
                return;
            }

            snapshot.forEach((childSnapshot) => {
                const job = childSnapshot.val();
                const jobCard = `
                    <div class="col-md-6 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${job.title || "No Title"}</h5>
                                <p class="card-text">${job.description || "No Description"}</p>
                                <a href="${job.link || "#"}" class="btn btn-primary">Apply Now</a>
                            </div>
                        </div>
                    </div>
                `;
                jobListings.insertAdjacentHTML("beforeend", jobCard); // ✅ **Better Performance**
            });
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        jobListings.innerHTML = `<p>Error loading jobs. Please try again.</p>`;
    }
}

// ✅ **Study Material Load करने का Function**
function loadStudyMaterial() {
    const materialListings = document.getElementById("material-listings");
    if (!materialListings) return;

    materialListings.innerHTML = `<p>Loading study materials...</p>`;

    try {
        const materialsRef = ref(db, "study-material"); 

        onValue(materialsRef, (snapshot) => {
            materialListings.innerHTML = ""; 

            if (!snapshot.exists()) {
                materialListings.innerHTML = `<p>No study materials available</p>`;
                return;
            }

            snapshot.forEach((childSnapshot) => {
                const material = childSnapshot.val();
                const materialCard = `
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${material.title || "No Title"}</h5>
                                <a href="${material.pdfLink || "#"}" class="btn btn-outline-primary">Download PDF</a>
                            </div>
                        </div>
                    </div>
                `;
                materialListings.insertAdjacentHTML("beforeend", materialCard);
            });
        });
    } catch (error) {
        console.error("Error fetching study materials:", error);
        materialListings.innerHTML = `<p>Error loading study materials. Please try again.</p>`;
    }
}

// ✅ **फ़ंक्शन कॉल करें**
loadJobs();
loadStudyMaterial();
