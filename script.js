document.addEventListener("DOMContentLoaded", function () {
    let db;
    const request = indexedDB.open("JobDB", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("jobs")) {
            const jobStore = db.createObjectStore("jobs", { keyPath: "jobTitle" });
            jobStore.transaction.oncomplete = function () {
                const jobTransaction = db.transaction("jobs", "readwrite").objectStore("jobs");
                jobs.forEach(job => jobTransaction.add(job));
            };
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        displayJobs();
    };

    function displayJobs() {
        const jobList = document.getElementById("job-list");
        jobList.innerHTML = "";
        const transaction = db.transaction("jobs", "readonly");
        const jobStore = transaction.objectStore("jobs");
        const jobRequest = jobStore.getAll();

        jobRequest.onsuccess = function () {
            jobRequest.result.forEach(job => {
                let button = document.createElement("button");
                button.textContent = job.jobTitle;
                button.addEventListener("click", function () {
                    localStorage.setItem("selectedJob", job.jobTitle);
                    window.location.href = "employees.html";
                });
                jobList.appendChild(button);
            });
        };
    }
});
