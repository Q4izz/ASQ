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

        // Update the page title with the job title
        document.querySelector('h1').textContent = `قائمة الموظفين - ${job.jobTitle}`;
        
        // Clear the table body
        employeeList.innerHTML = "";
        
        // Calculate totals
        let totalEmployees = job.employees.length;
        let totalSalary = 0;
        
        // Create table rows instead of divs
        job.employees.forEach((employee, index) => {
            // Add to total salary
            totalSalary += Number(employee.salary);
            
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.location}</td>
                <td>${employee.job}</td>
                <td>${employee.date}</td>
                <td>${employee.visa}</td>
                <td>${employee.salary} درهم</td>
                <td>
                    <button onclick="editEmployee(${jobIndex}, ${index})">تعديل</button>
                    <button onclick="removeEmployee(${jobIndex}, ${index})">حذف</button>
                </td>
            `;
            employeeList.appendChild(row);
        });
        
        // Update summary section
        updateSummary(totalEmployees, totalSalary);
    }
    
    function updateSummary(employeeCount, totalSalary) {
        let employeeCountElement = document.getElementById("employee-count");
        let totalSalaryElement = document.getElementById("total-salary");
        
        if (employeeCountElement && totalSalaryElement) {
            employeeCountElement.textContent = `العدد الإجمالي للموظفين: ${employeeCount}`;
            totalSalaryElement.textContent = `إجمالي الرواتب: ${totalSalary} درهم`;
        }
    }

    window.goBack = function () {
        window.location.href = "index.html";
    };

    window.addEmployee = function () {
        let jobIndex = localStorage.getItem("selectedJob");
        let job = employeesData[jobIndex];

        // Get and validate employee ID
        let id = prompt("أدخل الرقم الوظيفي:");
        if (!id) return; // User cancelled or entered empty value
        
        // Get and validate name
        let name = prompt("أدخل اسم الموظف:");
        if (!name) return;
        
        // Get location
        let location = prompt("أدخل الموقع:");
        if (!location) location = "غير محدد";
        
        // Get hire date
        let date = prompt("أدخل تاريخ التعيين:");
        if (!date) date = "غير محدد";
        
        // Get visa status
        let visa = prompt("أدخل حالة الفيزا:");
        if (!visa) visa = "غير محدد";
        
        // Get and validate salary
        let salary = prompt("أدخل الراتب:");
        if (!salary) salary = "0";
        
        // Make sure salary is a number
        if (isNaN(salary)) {
            alert("الرجاء إدخال رقم صحيح للراتب");
            salary = "0";
        }

        let newEmployee = {
            id: id,
            name: name,
            location: location,
            job: job.jobTitle,
            date: date,
            visa: visa,
            salary: salary
        };

        job.employees.push(newEmployee);
        saveEmployees();
        displayEmployees();
    };

    window.editEmployee = function (jobIndex, employeeIndex) {
        let job = employeesData[jobIndex];
        let employee = job.employees[employeeIndex];

        // Get updated values with current values as defaults
        let name = prompt("أدخل الاسم الجديد:", employee.name);
        if (name === null) name = employee.name; // User cancelled, keep original
        
        let location = prompt("أدخل الموقع الجديد:", employee.location);
        if (location === null) location = employee.location;
        
        let date = prompt("أدخل تاريخ التعيين الجديد:", employee.date);
        if (date === null) date = employee.date;
        
        let visa = prompt("أدخل حالة الفيزا الجديدة:", employee.visa);
        if (visa === null) visa = employee.visa;
        
        let salary = prompt("أدخل الراتب الجديد:", employee.salary);
        if (salary === null) {
            salary = employee.salary;
        } else if (isNaN(salary)) {
            alert("الرجاء إدخال رقم صحيح للراتب");
            salary = employee.salary;
        }

        // Update employee data
        employee.name = name;
        employee.location = location;
        employee.date = date;
        employee.visa = visa;
        employee.salary = salary;

        saveEmployees();
        displayEmployees();
    };

    window.removeEmployee = function (jobIndex, employeeIndex) {
        // Add confirmation before deleting
        if (confirm("هل أنت متأكد من حذف هذا الموظف؟")) {
            let job = employeesData[jobIndex];
            job.employees.splice(employeeIndex, 1);
            saveEmployees();
            displayEmployees();
        }
    };

    // Initialize displays
    if (document.getElementById("job-list")) {
        displayJobs();
    } else {
        displayEmployees();
    }
});
