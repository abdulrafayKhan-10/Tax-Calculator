var radioBtn1: HTMLInputElement | null = document.getElementById("radioBtn1") as HTMLInputElement;
var radioBtn2: HTMLInputElement | null = document.getElementById("radioBtn2") as HTMLInputElement;
var insuranceAmountElement: HTMLElement | null = document.getElementById("div_insuranceamount");

if (radioBtn1 && radioBtn2 && insuranceAmountElement) {
   
     radioBtn1.addEventListener("change", function (){
        if (radioBtn1?.checked) {
            insuranceAmountElement.style.display = "block";
        }
        else{
              insuranceAmountElement.style.display = "none";
          }
        })
     radioBtn2.addEventListener("change", function (){
        if (radioBtn2?.checked) {
            insuranceAmountElement.style.display = "none";
        }
        else{
              insuranceAmountElement.style.display = "block";
          }
        })
} else {
  console.error("Radio button element or insurance amount element not found");
}

function submitBtn(){
    let name: HTMLInputElement | null = document.getElementById("ID_fullname") as HTMLInputElement;
    let CNIC: HTMLInputElement | null = document.getElementById("ID_CNIC") as HTMLInputElement;
    let NTN: HTMLInputElement | null = document.getElementById("ID_NTN") as HTMLInputElement;
    let jobdesignation: HTMLInputElement | null = document.getElementById("ID_jobdesignation") as HTMLInputElement;
    let salary: HTMLInputElement | null = document.getElementById("ID_salary") as HTMLInputElement;
    let insuranceamount: HTMLInputElement | null = document.getElementById("ID_insuranceamount") as HTMLInputElement;
    

    if (name && CNIC && jobdesignation && salary) {
      let grossSalary = parseInt(salary.value);
      let taxRate: number;

      // Determine tax rate based on salary range
      if (grossSalary >= 100000 && grossSalary <= 150000) {
          taxRate = 0.05;
      } else if (grossSalary > 150000 && grossSalary <= 200000) {
          taxRate = 0.06;
      } else if (grossSalary > 200000 && grossSalary <= 300000) {
          taxRate = 0.08;
      } else {
          console.error("Salary out of range for tax calculation.");
          return;
      }

      // Calculate tax
      let deductions = insuranceamount ? parseInt(insuranceamount.value) : 0;
      let tax = (grossSalary - deductions) * taxRate;
      let salaryAfterTax = grossSalary - tax;

      // Generate NTN if not provided
      if (!NTN) {
          NTN = document.createElement("input");
          NTN.id = "ID_NTN";
          NTN.value = generateNTN();
          document.body.appendChild(NTN);
      }

      // Generate tax receipt
      let mainContainer: HTMLElement | null = document.getElementById("main_div") as HTMLElement;
      mainContainer.style.display="none";
      generateTaxReceipt(name.value, CNIC.value, NTN.value, jobdesignation.value, grossSalary, deductions, tax, salaryAfterTax, taxRate);
  } else {
      console.error("Required input fields not found.");
  }
}

// Function to generate NTN number
function generateNTN(): string {
  // Logic to generate NTN number goes here
  return "1234567890";
}

// Function to generate tax receipt
function generateTaxReceipt(name: string, CNIC: string, NTN: string, jobdesignation: string, grossSalary: number, deductions: number, tax: number, salaryAfterTax: number, taxRate: number) {
  let resultDiv = document.getElementById("div_result") as HTMLBodyElement;
  resultDiv.innerHTML=
`<div class="receipt-container">
<div class="receipt-header">
  <h2 class="receipt-heading">Tax Receipt</h2>
  <div class="logo"></div>
</div>
<div class="receipt-details">
  <div class="receipt-info">
    <strong>Name:</strong> ${name}<br>
    <strong>CNIC:</strong> ${CNIC}<br>
    <strong>NTN:</strong> ${NTN}<br>
      <strong>Job Designation:</strong> ${jobdesignation}<br>
  </div>
  <div class="receipt-financials">
    <strong>Gross Salary:</strong> ${grossSalary} Rs<br>
    <strong>Deductions:</strong> ${deductions} Rs<br>
    <strong>Tax:</strong> ${tax} Rs<br>
    <strong>Salary After Tax:</strong> ${salaryAfterTax} Rs<br>
    <strong>Tax Rate:</strong> ${(taxRate * 100)}%<br>
  </div>
</div>
</div>`;
}



