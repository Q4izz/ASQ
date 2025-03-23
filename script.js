document.addEventListener("DOMContentLoaded", function () {
    let employeesData = JSON.parse(localStorage.getItem("employees")) || jobs;

    function saveEmployees() {
        localStorage.setItem("employees", JSON.stringify(employeesData));
    }

    function displayJobs() {
        let jobList = document.getElementById("job-list");
        if (!jobList) return;

        jobList.innerHTML = "";
        employeesData.forEach((job, index) => {
            let button = document.createElement("button");
            button.textContent = job.jobTitle;
            button.addEventListener("click", function () {
                localStorage.setItem("selectedJob", index);
                window.location.href = "employees.html";
            });
            jobList.appendChild(button);
        });
    }

    function displayEmployees() {
        let employeeList = document.getElementById("employee-list");
        if (!employeeList) return;

        let jobIndex = localStorage.getItem("selectedJob");
        let job = employeesData[jobIndex];

        employeeList.innerHTML = `<h2>${job.jobTitle}</h2>`;
        job.employees.forEach((employee, index) => {
            let div = document.createElement("div");
            div.classList.add("employee");
            div.innerHTML = `
                <p><strong>الرقم الوظيفي:</strong> ${employee.id}</p>
                <p><strong>الاسم:</strong> ${employee.name}</p>
                <p><strong>الموقع:</strong> ${employee.location}</p>
                <p><strong>الوظيفة:</strong> ${employee.job}</p>
                <p><strong>تاريخ التعيين:</strong> ${employee.date}</p>
                <p><strong>حالة الفيزا:</strong> ${employee.visa}</p>
                <p><strong>إجمالي الراتب:</strong> ${employee.salary} ريال</p>
                <button onclick="editEmployee(${jobIndex}, ${index})">تعديل</button>
                <button onclick="removeEmployee(${jobIndex}, ${index})">حذف</button>
            `;
            employeeList.appendChild(div);
        });
    }

    window.goBack = function () {
        window.location.href = "index.html";
    };

    window.addEmployee = function () {
        let jobIndex = localStorage.getItem("selectedJob");
        let job = employeesData[jobIndex];

        let newEmployee = {
            id: prompt("أدخل الرقم الوظيفي:"),
            name: prompt("أدخل اسم الموظف:"),
            location: prompt("أدخل الموقع:"),
            job: job.jobTitle,
            date: prompt("أدخل تاريخ التعيين:"),
            visa: prompt("أدخل حالة الفيزا:"),
            salary: prompt("أدخل الراتب:")
        };

        job.employees.push(newEmployee);
        saveEmployees();
        displayEmployees();
    };

    window.editEmployee = function (jobIndex, employeeIndex) {
        let job = employeesData[jobIndex];
        let employee = job.employees[employeeIndex];

        employee.name = prompt("أدخل الاسم الجديد:", employee.name);
        employee.location = prompt("أدخل الموقع الجديد:", employee.location);
        employee.date = prompt("أدخل تاريخ التعيين الجديد:", employee.date);
        employee.visa = prompt("أدخل حالة الفيزا الجديدة:", employee.visa);
        employee.salary = prompt("أدخل الراتب الجديد:", employee.salary);

        saveEmployees();
        displayEmployees();
    };

    window.removeEmployee = function (jobIndex, employeeIndex) {
        let job = employeesData[jobIndex];
        job.employees.splice(employeeIndex, 1);

        saveEmployees();
        displayEmployees();
    };

    if (document.getElementById("job-list")) {
        displayJobs();
    } else {
        displayEmployees();
    }
});
