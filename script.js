// Login function
function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("pswd").value;
  msg1.innerHTML = "";
  msg2.innerHTML = "";
  if (username == "admin" && password == "12345") {
    window.location.assign('main-page.html');
    alert("Login Successfully");
  } else {
    try {
      if (username != "admin") throw "Wrong username";
      if (password != "12345") throw "Wrong password";
    } catch (error) {
      msg1.innerHTML = error;
      msg2.innerHTML = error;
    }
  }
}

// Populate table with data from API
function createCheckbox(checked) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;
  return checkbox;
}

// Populate table with data from API
const tableBody = document.querySelector('#data-table tbody');

fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const row = document.createElement('tr');

      const idCell = document.createElement('td');
      idCell.textContent = item.id;
      row.appendChild(idCell);

      const userIdCell = document.createElement('td');
      userIdCell.textContent = item.userId;
      row.appendChild(userIdCell);

      const titleCell = document.createElement('td');
      titleCell.textContent = item.title;
      row.appendChild(titleCell);

      const checkboxCell = document.createElement('td');
      const checkbox = createCheckbox(item.completed);
      checkboxCell.appendChild(checkbox);
      row.appendChild(checkboxCell);

      tableBody.appendChild(row);
    });

    // Check checkbox count using Promise
    checkCheckboxCount()
      .then(() => {
        alert(' Congrats. 5 Tasks have been Successfully Completed');
      })
      .catch(() => {
         console.log("Task not completed");
      });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Check checkbox count using Promise
function checkCheckboxCount() {
  return new Promise((resolve, reject) => {
    const checkboxes = document.querySelectorAll('#data-table input[type="checkbox"]');
    let checkedCount = 0;

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          checkedCount++;
        } else {
          checkedCount--;
        }

        if (checkedCount === 5) {
          resolve();
        } 
      });
    });
  });
}