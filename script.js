document.addEventListener("DOMContentLoaded", function () {
    let employees = JSON.parse(localStorage.getItem("employees")) || jobs;

    function saveEmployees() {
        localStorage.setItem("employees", JSON.stringify(employees));
    }

    function displayJobs() {
        let jobList = document.getElementById("job-list");
        jobList.innerHTML = "";
        employees.forEach((job, index) => {
            let button = document.createElement("button");
            button.textContent = job.jobTitle;
            button.addEventListener("click", function () {
                localStorage.setItem("selectedJob", JSON.stringify(job));
                window.location.href = "employees.html";
            });
            jobList.appendChild(button);
        });
    }

    if (document.getElementById("job-list")) {
        displayJobs();
    }

    if (document.getElementById("employee-list")) {
        let selectedJob = JSON.parse(localStorage.getItem("selectedJob"));
        if (selectedJob) {
            document.getElementById("job-title").textContent = selectedJob.jobTitle;
            let employeeList = document.getElementById("employee-list");
            employeeList.innerHTML = "";
            selectedJob.employees.forEach((employee, index) => {
                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${employee.id}</td>
                    <td contenteditable="true">${employee.name}</td>
                    <td contenteditable="true">${employee.location}</td>
                    <td contenteditable="true">${employee.job}</td>
                    <td contenteditable="true">${employee.date}</td>
                    <td contenteditable="true">${employee.visa}</td>
                    <td contenteditable="true">${employee.salary}</td>
                    <td>
                        <button class="save-btn" data-index="${index}">💾 حفظ</button>
                        <button class="delete-btn" data-index="${index}">🗑️ حذف</button>
                    </td>
                `;

                employeeList.appendChild(row);
            });

            document.querySelectorAll(".save-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    let row = this.parentElement.parentElement.children;
                    selectedJob.employees[index] = {
                        id: row[0].textContent,
                        name: row[1].textContent,
                        location: row[2].textContent,
                        job: row[3].textContent,
                        date: row[4].textContent,
                        visa: row[5].textContent,
                        salary: row[6].textContent
                    };
                    saveEmployees();
                    alert("تم حفظ التعديلات!");
                });
            });

            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    selectedJob.employees.splice(index, 1);
                    saveEmployees();
                    location.reload();
                });
            });

            document.getElementById("add-employee").addEventListener("click", function () {
                let newEmployee = {
                    id: prompt("الرقم الوظيفي:"),
                    name: prompt("الاسم:"),
                    location: prompt("الموقع:"),
                    job: selectedJob.jobTitle,
                    date: prompt("تاريخ التعيين:"),
                    visa: prompt("حالة الفيزا:"),
                    salary: prompt("إجمالي الراتب:")
                };

                if (newEmployee.id && newEmployee.name) {
                    selectedJob.employees.push(newEmployee);
                    saveEmployees();
                    location.reload();
                } else {
                    alert("يرجى إدخال البيانات بشكل صحيح!");
                }
            });

            document.getElementById("back").addEventListener("click", function () {
                window.location.href = "index.html";
            });
        }
    }
});
