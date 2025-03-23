document.addEventListener("DOMContentLoaded", function () {
    let employees = JSON.parse(localStorage.getItem("employees")) || jobs;

    function saveEmployees() {
        localStorage.setItem("employees", JSON.stringify(employees));
    }

    function displayJobs() {
        let jobList = document.getElementById("job-list");
        if (!jobList) return;

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

    function displayEmployees() {
        let job = JSON.parse(localStorage.getItem("selectedJob"));
        if (!job) return;

        document.getElementById("job-title").textContent = job.jobTitle;
        let employeeList = document.getElementById("employee-list");
        employeeList.innerHTML = "";

        job.employees.forEach((employee, index) => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.location}</td>
                <td>${employee.job}</td>
                <td>${employee.date}</td>
                <td>${employee.visa}</td>
                <td>${employee.salary}</td>
                <td>
                    <button onclick="editEmployee(${index})">تعديل</button>
                    <button onclick="deleteEmployee(${index})">حذف</button>
                </td>
            `;

            employeeList.appendChild(row);
        });
    }

    window.editEmployee = function (index) {
        let job = JSON.parse(localStorage.getItem("selectedJob"));
        let employee = job.employees[index];

        let newName = prompt("أدخل الاسم الجديد", employee.name);
        let newSalary = prompt("أدخل الراتب الجديد", employee.salary);

        if (newName) employee.name = newName;
        if (newSalary) employee.salary = parseFloat(newSalary);

        job.employees[index] = employee;
        localStorage.setItem("selectedJob", JSON.stringify(job));

        saveEmployees();
        displayEmployees();
    };

    window.deleteEmployee = function (index) {
        let job = JSON.parse(localStorage.getItem("selectedJob"));
        job.employees.splice(index, 1);

        localStorage.setItem("selectedJob", JSON.stringify(job));
        saveEmployees();
        displayEmployees();
    };

    window.goBack = function () {
        window.location.href = "index.html";
    };

    if (document.getElementById("job-list")) displayJobs();
    if (document.getElementById("employee-list")) displayEmployees();
});
