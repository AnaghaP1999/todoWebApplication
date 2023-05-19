function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("pswd").value;
  msg1.innerHTML="";
  msg2.innerHTML="";
  if(username == 'admin' && password == '12345') {
    window.location.assign('main-page.html');
    alert("Login Successfully");
  } else {  
    try {
        if(username != "admin")throw "wrong username"
        if(password != "12345")throw "wrong password"
    } catch (error) {
        msg1.innerHTML = error
        msg2.innerHTML = error
    } 
  }
}

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
      const checkbox = document.createElement('input');
      if(item.completed == true) {
        checkbox.checked = true;
      }
      checkbox.type = 'checkbox';
      checkboxCell.appendChild(checkbox);
      row.appendChild(checkboxCell);
      
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

function checkCheckboxCount() {
  return new Promise((resolve, reject) => {
    const checkboxes = document.querySelectorAll('#data-table input[type="checkbox"]');
   
    let checkedCount = 0;

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {

        checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

        if (checkedCount === 5) {
          resolve();
        } else {
          reject();
        }
      });
    });
  });
}


checkCheckboxCount()
  .then(() => {
    alert('You have checked five checkboxes!');
  })
  .catch(() => {

  });
