document.addEventListener("DOMContentLoaded", function () {
    let employeesData = JSON.parse(localStorage.getItem("employees")) || jobs;

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
        
        // Create table rows
        job.employees.forEach((employee) => {
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

    // Initialize displays
    if (document.getElementById("job-list")) {
        displayJobs();
    } else {
        displayEmployees();
    }
});
