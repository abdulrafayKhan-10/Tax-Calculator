var radioBtn1 = document.getElementById("radioBtn1");
var radioBtn2 = document.getElementById("radioBtn2");
var insuranceAmountElement = document.getElementById("div_insuranceamount");
if (radioBtn1 && radioBtn2 && insuranceAmountElement) {
    radioBtn1.addEventListener("change", function () {
        if (radioBtn1 === null || radioBtn1 === void 0 ? void 0 : radioBtn1.checked) {
            insuranceAmountElement.style.display = "block";
        }
        else {
            insuranceAmountElement.style.display = "none";
        }
    });
    radioBtn2.addEventListener("change", function () {
        if (radioBtn2 === null || radioBtn2 === void 0 ? void 0 : radioBtn2.checked) {
            insuranceAmountElement.style.display = "none";
        }
        else {
            insuranceAmountElement.style.display = "block";
        }
    });
}
else {
    console.error("Radio button element or insurance amount element not found");
}
function submitBtn() {
    var name = document.getElementById("ID_fullname");
    var CNIC = document.getElementById("ID_CNIC");
    var NTN = document.getElementById("ID_NTN");
    var jobdesignation = document.getElementById("ID_jobdesignation");
    var salary = document.getElementById("ID_salary");
    var insuranceamount = document.getElementById("ID_insuranceamount");
    if (name && CNIC && jobdesignation && salary) {
        var grossSalary = parseInt(salary.value);
        var taxRate = void 0;
        // Determine tax rate based on salary range
        if (grossSalary >= 100000 && grossSalary <= 150000) {
            taxRate = 0.05;
        }
        else if (grossSalary > 150000 && grossSalary <= 200000) {
            taxRate = 0.06;
        }
        else if (grossSalary > 200000 && grossSalary <= 300000) {
            taxRate = 0.08;
        }
        else {
            console.error("Salary out of range for tax calculation.");
            return;
        }
        // Calculate tax
        var deductions = insuranceamount ? parseInt(insuranceamount.value) : 0;
        var tax = (grossSalary - deductions) * taxRate;
        var salaryAfterTax = grossSalary - tax;
        // Generate NTN if not provided
        if (!NTN) {
            NTN = document.createElement("input");
            NTN.id = "ID_NTN";
            NTN.value = generateNTN();
            document.body.appendChild(NTN);
        }
        // Generate tax receipt
        var mainContainer = document.getElementById("main_div");
        mainContainer.style.display = "none";
        generateTaxReceipt(name.value, CNIC.value, NTN.value, jobdesignation.value, grossSalary, deductions, tax, salaryAfterTax, taxRate);
    }
    else {
        console.error("Required input fields not found.");
    }
}
// Function to generate NTN number
function generateNTN() {
    // Logic to generate NTN number goes here
    return "1234567890";
}
// Function to generate tax receipt
function generateTaxReceipt(name, CNIC, NTN, jobdesignation, grossSalary, deductions, tax, salaryAfterTax, taxRate) {
    var resultDiv = document.getElementById("div_result");
    resultDiv.innerHTML =
        "<div class=\"receipt-container\">\n<div class=\"receipt-header\">\n  <h2 class=\"receipt-heading\">Tax Receipt</h2>\n  <div class=\"logo\"></div>\n</div>\n<div class=\"receipt-details\">\n  <div class=\"receipt-info\">\n    <strong>Name:</strong> ".concat(name, "<br>\n    <strong>CNIC:</strong> ").concat(CNIC, "<br>\n    <strong>NTN:</strong> ").concat(NTN, "<br>\n      <strong>Job Designation:</strong> ").concat(jobdesignation, "<br>\n  </div>\n  <div class=\"receipt-financials\">\n    <strong>Gross Salary:</strong> ").concat(grossSalary, " Rs<br>\n    <strong>Deductions:</strong> ").concat(deductions, " Rs<br>\n    <strong>Tax:</strong> ").concat(tax, " Rs<br>\n    <strong>Salary After Tax:</strong> ").concat(salaryAfterTax, " Rs<br>\n    <strong>Tax Rate:</strong> ").concat((taxRate * 100), "%<br>\n  </div>\n</div>\n</div>");
}
