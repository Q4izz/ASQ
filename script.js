document.addEventListener("DOMContentLoaded", function () {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

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

    function displayEmployees() {
        let job = JSON.parse(localStorage.getItem("selectedJob"));
        if (!job) {
            window.location.href = "index.html";
            return;
        }

        employees = job.employees;
        let employeeList = document.getElementById("employee-list");
        employeeList.innerHTML = "";

        employees.forEach((employee, index) => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.location}</td>
                <td>${employee.job}</td>
                <td>${employee.date}</td>
                <td>${employee.visa}</td>
                <td>${employee.salary} ريال</td>
                <td><button onclick="editEmployee(${index})">تعديل</button></td>
                <td><button onclick="removeEmployee(${index})">حذف</button></td>
            `;

            employeeList.appendChild(row);
        });
    }

    function editEmployee(index) {
        let employee = employees[index];

        let newName = prompt("تعديل الاسم:", employee.name);
        let newLocation = prompt("تعديل الموقع:", employee.location);
        let newSalary = prompt("تعديل الراتب:", employee.salary);

        if (newName) employee.name = newName;
        if (newLocation) employee.location = newLocation;
        if (newSalary) employee.salary = parseFloat(newSalary);

        saveEmployees();
        displayEmployees();
    }

    function removeEmployee(index) {
        if (confirm("هل أنت متأكد أنك تريد حذف هذا الموظف؟")) {
            employees.splice(index, 1);
            saveEmployees();
            displayEmployees();
        }
    }

    function addEmployee() {
        let newEmployee = {
            id: prompt("رقم الوظيفة:"),
            name: prompt("الاسم:"),
            location: prompt("الموقع:"),
            job: prompt("الوظيفة:"),
            date: prompt("تاريخ التعيين:"),
            visa: prompt("حالة الفيزا:"),
            salary: parseFloat(prompt("إجمالي الراتب:")) || 0
        };

        employees.push(newEmployee);
        saveEmployees();
        displayEmployees();
    }

    function goBack() {
        window.location.href = "index.html";
    }

    if (document.getElementById("job-list")) {
        displayJobs();
    } else {
        displayEmployees();
    }

    document.getElementById("add-employee").addEventListener("click", addEmployee);
    document.getElementById("go-back").addEventListener("click", goBack);
});
