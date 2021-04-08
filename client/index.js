document.addEventListener('DOMContentLoaded',function(){
fetch('http://localhost:3000/getAll').then(res=>res.json()).then
(data=>loadHTMLTable(data['data']));
});
function loadHTMLTable(data){
    const table=document.querySelector('table tbody');
    console.log(data);
        if(data.length===0){
            table.innerHTML="<tr><td class='no-data' colspan='5'>No Data</td></tr>"
            return;
        }
        tableHtml="";
        data.forEach(function({id,name,date_added}) {
            console.log(id);
            tableHtml+=`<tr><td>${id}</td><td>${name}</td><td>${new Date(date_added).toLocaleString()}</td>`;
            tableHtml+=`<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
            tableHtml+=`<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        });
        table.innerHTML=tableHtml;
}




document.querySelector('table tbody').addEventListener('click',function(event){
    console.log(event.target);
    console.log(event.target.dataset.id);
    if(event.target.className ==="delete-row-btn"){
//        console.log(event.target.dataset);
        deleteRowById(event.target.dataset.id);
    }
    if(event.target.className ==="edit-row-btn"){
                showUp(event.target.dataset.id);
    }

});


document.querySelector('#update-row-btn').addEventListener('click',function(event){
    const Id=document.querySelector('#update-id-input').value;
    const Name=document.querySelector('#update-name-input').value;
    console.log("index.js: "+Id+" "+Name);
    fetch('http://localhost:3000/update',{
        method:'PATCH',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            id:Id,
            name:Name  
        })
    }).then(response => response.json())
        .then(data=>{if(data.success){
            location.reload();
        }
    })
    });

    
document.querySelector('#search-btn').addEventListener('click',function(event){
    const name=document.querySelector('#search-input').value;
    console.log("index.js: "+name);
    fetch('http://localhost:3000/search/' + name)
    .then(res=>res.json()).then
        (data=>loadHTMLTable(data['data']));
});
        

function deleteRowById(id){
    fetch('http://localhost:3000/delete/' + id,{
    method:'DELETE',
    })
    .then(response => response.json())
    .then(data=>{if(data.success){
    location.reload();
    }
});
}

function showUp(id){
    const updateSection=document.querySelector('#update-row');
    updateSection.style.display="inline-block";
    const ID=document.querySelector('#update-id-input');
    ID.value=id;
}

    

document.querySelector('#add-name-btn').addEventListener('click',function(event){
    console.log("index.js>>>Pressed add button>>");
    const nameInput=document.querySelector('#name-input');
     const name=nameInput.value;
     nameInput.value="";
     //location.reload();
     fetch('http://localhost:3000/insert',{
         headers:{
             'Content-Type' : 'application/json'
         },
         method:'POST',
         body:JSON.stringify({name:name})
     })
     .then(response => response.json())
     .then(data=>insertRowDataTable(data['data']));
});



function insertRowDataTable(data){
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            console.log(data.id+" "+data.name+" "+data.dateAdded);
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";
    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

