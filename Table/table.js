let items = [];
let btnValue = "insert";
let indexValue;
let searchRes =[];
let isAscending = true; 

// <!-- Add Item Section -->

function addItem(){
    let name=document.getElementById("name").value;
    let category =document.getElementById("category").value;
    let year = document.getElementById("year").value;

    let isValid = true;

    document.getElementById("error").innerHTML = "";
    document.getElementById("name-error").innerHTML = "";
    document.getElementById("category-error").innerHTML = "";
    document.getElementById("year-error").innerHTML = "";
    document.getElementById("name").style.borderColor = "";
    document.getElementById("category").style.borderColor = "";
    document.getElementById("year").style.borderColor = "";

    if (name === '' && category === '' && year === '') {
        document.getElementById("error").innerHTML = "Enter Required Fields.";
        return;
    }

    if (name == '' ) {
        document.getElementById("name-error").innerHTML = "Enter the name";
        document.getElementById("name").style.borderColor = "red";
        isValid = false;
    }

    if (name.length > 256) {
        document.getElementById("name-error").innerHTML = "Name can't exceed 256 characters";
        document.getElementById("name").style.borderColor = "red";
        isValid = false;
    }
    
    if (category == '') {
        document.getElementById("category-error").innerHTML = "Enter the category";
        document.getElementById("category").style.borderColor = "red";
        isValid = false;
    }
    
    if (category.length > 256) {
        document.getElementById("category-error").innerHTML = "Category can't exceed 256 characters";
        document.getElementById("category").style.borderColor = "red";
        isValid = false;
    }

    if (year == '') {
        document.getElementById("year-error").innerHTML = "Enter the year";
        document.getElementById("year").style.borderColor = "red";
        isValid = false;
    } else if (!validYearFun()) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    
    if(btnValue == "insert"){
        const itemObj ={
            name : name,
            category :category,
            year : year
        }
    
        items.push(itemObj);
    }
    else{
        items[indexValue].name= document.getElementById("name").value;
        items[indexValue].category =document.getElementById("category").value;
        items[indexValue].year = document.getElementById("year").value ;

        btnValue="insert";
    }
    
    document.getElementById("name").value='';
    document.getElementById("category").value='';
    document.getElementById("year").value='';

    updateTable();
    
    }

// <!-- update section --> 

// function updateTable(){

//     let tbody = document.getElementById("table-body");
//     tbody.innerHTML='';

//     for (let index = 0; index < items.length; index++) {
//         const element = items[index];
//          let row = `<tr>
//                     <td> ${index+1} </td>
//                     <td> ${items[index].name}</td>
//                     <td> ${items[index].category}</td>
//                     <td> ${items[index].year}</td>
//                     <td><button class ="button-edit" onclick="editItem(${index})">Edit</button></td>
//                     <td><button class ="button-delete" onclick="deleteItem(${index})">Delete</button></td>
//                 </tr>`
//         tbody.innerHTML += row;
//     }
// }


function updateTable() {
    let tbody = document.getElementById("table-body");
    tbody.innerHTML = '';

    const textLimit = 10; 

    for (let index = 0; index < items.length; index++) {
        const element = items[index];

        let name = element.name.length > textLimit ? element.name.substring(0, textLimit) + '...' : element.name;
        let category = element.category.length > textLimit ? element.name.substring(0 , textLimit) +'...' : element.category;
        

        let row = `<tr>
                    <td> ${index + 1} </td>
                    <td onclick="expandText(this, '${element.name}', ${textLimit})"> ${name}</td>
                    <td onclick="expandText(this, '${element.category}', ${textLimit})"> ${category}</td>
                    <td> ${element.year}</td>
                    <td><button class="button-edit" onclick="editItem(${index})">Edit</button></td>
                    <td><button class="button-delete" onclick="deleteItem(${index})">Delete</button></td>
                </tr>`;

        tbody.innerHTML += row;
    }
}


function expandText(cell, fullText, textLimit) {
    
    if (cell.dataset.expanded === "true") {
        console.log("reverted");
        cell.innerText = fullText.substring(0, textLimit) + '...';
        cell.dataset.expanded = "false";  
    } else {
        console.log("expanded");
        cell.innerText = fullText;
        cell.dataset.expanded = "true"; 
    }
}

// <!-- Delete section --> 

function deleteItem(index){
    items.splice(index,1);
    updateTable();
}


// <!-- Edit section --> 

function editItem(index) {

    let item = items[index];

    document.getElementById("name").value = item.name;
    document.getElementById("category").value = item.category;
    document.getElementById("year").value = item.year;

    btnValue = "update";
    indexValue = index;
}

// <!-- Search section --> 

function searchFun() {
    let searchValue = document.getElementById("search").value.toLowerCase(); 
    searchRes = [];                     
    for (let index = 0; index < items.length; index++) {
        if (items[index].name.toLowerCase().includes(searchValue) ||
        items[index].category.toLowerCase().includes(searchValue) ||
        items[index].year.toLowerCase().includes(searchValue))
        {
            searchRes.push(items[index]); 
        }
        searchTable(); 
    }

// console.log(searchRes);

function searchTable() {
    let tbody = document.getElementById("table-body");
    tbody.innerHTML = ''; 

    if (searchRes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No data found.</td></tr>'; 
        return; 
    }

    for (let index = 0; index < searchRes.length; index++) {
        const element = searchRes[index];
        let row = `<tr>
                    <td>${index + 1}</td>
                    <td>${element.name}</td>
                    <td>${element.category}</td>
                    <td>${element.year}</td>
                    <td><button class ="button-edit" onclick="editItem(${index})">Edit</button></td>
                    <td><button class ="button-delete" onclick="deleteItem(${index})">Delete</button></td>
                </tr>`;
        tbody.innerHTML += row; 
    }
}
}

// <!-- Sorting section --> 

let currentSortedColumn = null;
function sortName() {
  items.sort((a, b) => {
    if (isAscending) {
      return a.name.localeCompare(b.name); 
    } else {
      return b.name.localeCompare(a.name); 
    }
  });
  isAscending = !isAscending;
  sortFunc();
  updateIcon('name-icon');

}

function sortCategory(){
    items.sort((a, b) => {
        if (isAscending) {
          return a.category.localeCompare(b.category); 
        } else {
          return b.category.localeCompare(a.category); 
        }
      });  
      isAscending = !isAscending;
      sortFunc();
      updateIcon('category-icon');
}

function sortYear(){
    items.sort((a, b) => {
        if (isAscending) {
          return a.year.localeCompare(b.year); 
        } else {
          return b.year.localeCompare(a.year); 
        }
      });
      isAscending = !isAscending;
      sortFunc();
      updateIcon('year-icon');

}


function sortFunc() {
    let tbody = document.getElementById("table-body");
    tbody.innerHTML = ''; 

    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        let row = `<tr>
                    <td>${index + 1}</td>
                    <td>${element.name}</td>
                    <td>${element.category}</td>
                    <td>${element.year}</td>
                    <td><button class ="button-edit" onclick="editItem(${index})">Edit</button></td>
                    <td><button class ="button-delete" onclick="deleteItem(${index})">Delete</button></td>
                </tr>`;
        tbody.innerHTML += row; 
    }
}

function updateIcon(iconId) {
    if (currentSortedColumn && currentSortedColumn !== iconId) {
        document.getElementById(currentSortedColumn).className = "fa fa-sort";
    }

    let iconSort = document.getElementById(iconId);

    if (isAscending) {
        iconSort.className = "fa fa-sort-asc";  
    } else {
        iconSort.className = "fa fa-sort-desc"; 
    }

    currentSortedColumn = iconId;
}


// <!-- Year validation section --> 

function validYearFun() {
    let validYear = document.getElementById("year").value.trim();
    let regex = /^\d{4}$/;
    let year = parseInt(validYear, 10);
    let currentYear = new Date().getFullYear();

    document.getElementById("year-error").innerHTML = "";
    document.getElementById("year").style.borderColor = "";

    if (validYear === '' ) {
        return true;
    }
    if (!regex.test(validYear) ) {
        document.getElementById("year-error").innerHTML = "Enter a valid 4-digit year";
        document.getElementById("year").style.borderColor = "red";
        return false;
    } 
    else if (year < 1 ) {
        document.getElementById("year-error").innerHTML = "Year should be greater than 1 ";
        document.getElementById("year").style.borderColor = "red";
        return false;
    }
    else if (year > currentYear) {
        document.getElementById("year-error").innerHTML = " Year should be  less than " + currentYear;
        document.getElementById("year").style.borderColor = "red";
        return false;
    }

    return true;
}
