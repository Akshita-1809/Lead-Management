// Get DOM elements
const form = document.getElementById("leadForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const statusInput = document.getElementById("status");
const tableBody = document.getElementById("leadTableBody");
const filter = document.getElementById("filter");

// Load leads from localStorage or set to empty array
let leads = JSON.parse(localStorage.getItem("leads")) || [];

// Save leads to localStorage
function saveLeads() {
  localStorage.setItem("leads", JSON.stringify(leads));
}

// Render leads in table
function renderLeads() {
  const selectedStatus = filter.value;
  tableBody.innerHTML = "";
  leads
    .filter(lead => selectedStatus === "All" || lead.status === selectedStatus)
    .forEach((lead, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.status}</td>
        <td><button onclick="deleteLead(${index})">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
}

// Delete a lead
function deleteLead(index) {
  leads.splice(index, 1);
  saveLeads();
  renderLeads();
}

// Add lead
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const lead = {
    name: nameInput.value,
    email: emailInput.value,
    status: statusInput.value,
  };
  leads.push(lead);
  saveLeads();
  renderLeads();
  form.reset();
});

// Filter by status
filter.addEventListener("change", renderLeads);

// Initial render
renderLeads();