

document.addEventListener('DOMContentLoaded', async (e) => {

    try {
        e.preventDefault();

        let totalData = await fetch('http://localhost:4000/getExpense');

        let totalJsonData = await totalData.json();



        //console.log(totalJsonData.alldata)

        totalJsonData.alldata.forEach(element => {

            addUserToScreen(element)
        });

        // loadHtmlData(totalJsonData['data'])
    } catch (err) {
        console.log(err);


    }
})

function addUserToScreen(data) {
    const tbody = document.querySelector('table tbody')

    var tr = document.createElement('tr');

    var TotalHtml = `<td>${data.expense}</td>
       <td>${data.description}</td><td>${data.item}</td>
       <td><button class="del-button btn btn-danger" type="submit"  id =${data.id} onclick ="deleteDataOnScreen('${data.id}')">Delete</button></td>
        <td><button class="edit-button btn btn-primary" type="submit" id="${data.id}${data.expense}" onclick="editData('${data.id}' , '${data.id}${data.expense}')" >Edit</button></td>
        `
    tr.innerHTML = TotalHtml;

    tbody.appendChild(tr)
}





// insert record to db and display

const formbutton = document.querySelector('#expenseaddbutton');

formbutton.onclick = async function (e) {
    try {
        e.preventDefault();

        const expense = document.querySelector('#expense').value;
        const description = document.querySelector('#desc').value;
        const item = document.querySelector('#item').value;



        let fetchData = await fetch('http://localhost:4000/addexpense', {
            headers: {
                'Content-Type': 'application/json',

            },
            method: "POST",
            body: JSON.stringify({ expense: expense, description: description, item: item })
        })


        let jsonFetchdata = await fetchData.json()

        var objectData = jsonFetchdata['InsertedData']['data'];


        document.querySelector('#expense').value = "";
        document.querySelector('#desc').value = "";
        document.querySelector('#item').value = "";
        addUserToScreen(objectData);


    } catch (err) {
        console.log(err)
    }



}


async function deleteDataOnScreen(id) {

    try {
        let deleteData = await fetch('http://localhost:4000/deleteuser/' + id, {
            method: "DELETE"
        })

        document.getElementById(id).parentElement.parentElement.remove();

    } catch (err) {
        console.log(err);
    }
}


async function editData(id, editbuttonid) {

    try {

        document.getElementById('addexpensebox').style.display = 'none';


        document.getElementById('updatebox').style.display = 'block';
        console.log(editbuttonid)


        let getData = await fetch('http://localhost:4000/getExpense/' + id);

        let getDataJson = await getData.json();

        let getDataObj = getDataJson['fethchedSingleData'];
        console.log(getDataObj.expense, getDataObj.description, getDataObj.item)
        document.querySelector('#expense').value = getDataObj.expense
        document.querySelector('#desc').value = getDataObj.description
        document.querySelector('#item').value = getDataObj.item


        document.getElementById('expenseupdatebutton').onclick = async function (e) {
            e.preventDefault();
            var expense = document.getElementById('expense').value;
            var description = document.getElementById('desc').value;
            var item = document.getElementById('item').value

            console.log(e.target);

            let editedData = await fetch('http://localhost:4000/expensechange', {
                headers: {
                    'Content-Type': 'application/json',

                },
                method: "PUT",
                body: JSON.stringify({ id: id, expense: expense, description: description, item: item })

            })

            let jsonEditedData = await editedData.json();
            //updatedData
            console.log(jsonEditedData['updatedData'])
            var myUpdatedObj = jsonEditedData['updatedData']
            console.log(editbuttonid)
            console.log(document.getElementById(editbuttonid));
            // console.log(document.getElementById(editbuttonid).parentElement.parentElement.cells[0])
            document.getElementById(editbuttonid).parentElement.parentElement.cells[0].innerHTML = myUpdatedObj.expense
            document.getElementById(editbuttonid).parentElement.parentElement.cells[1].innerHTML = myUpdatedObj.description
            document.getElementById(editbuttonid).parentElement.parentElement.cells[2].innerHTML = myUpdatedObj.item

            document.getElementById('expense').value = "";
            document.getElementById('desc').value = "";
            document.getElementById('item').value = "";


            document.getElementById('addexpensebox').style.display = 'block';
            document.getElementById('updatebox').style.display = 'none';



        }

    } catch (err) {
        console.log(err)
    }
}

