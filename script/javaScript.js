
async function showResult() {
    console.log("Show Result called");
    document.querySelector('#spinner').style.display = "inline-block";
    const table = document.querySelector('#table');
    const rollNo = document.querySelector('#inputRoll').value;
    fetch('/getResult', {
        method: 'POST',
        body: 'inputRoll=' + rollNo,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    }).then(d => {
        d.json().then(x => {
            console.log(" Result recived");


            for (let i = 0; i < x.length; i++) {
                let row = table.insertRow();
                let th1 = row.insertCell();
                let th2 = row.insertCell();
                th1.appendChild(document.createTextNode(x[i][0]));
                th2.appendChild(document.createTextNode(x[i][1]));
                if (x[i][1] == "Pass")
                    th2.style.color = "green"
                else
                    th2.style.color = "red"
            }
            document.querySelector('#spinner').style.display = "none";

            document.getElementById("tableDiv").className = " shadow-lg  mb-5 bg-white rounded";
        })

    })
}