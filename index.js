var data = [
  {
    account_number: "456723",
    name: "Naveen Singh",
    email: "ns@gmail.com",
    current_balance: "45660",
    transaction: [],
    address: "45/2, Vihar Ganj Road, Delhi-700001",
    city: "Delhi",
    branch: "Mayur Vihar",
    contact: "(+91) 4512084853",
  },
  {
    account_number: "425723",
    name: "Manoj Singh",
    email: "ms@gmail.com",
    current_balance: "73260",
    transaction: [],
    address: "35/5, Kumar Villa Road, Bhopal-700004",
    city: "Delhi",
    branch: "Mayur Vihar",
    contact: "(+91) 4512084853",
  },
  {
    account_number: "456893",
    name: "Afridi Wara",
    email: "aw@gmail.com",
    current_balance: "22160",
    transaction: [],
    address: "45/2, Vihar Ganj Road, Delhi-700001",
    city: "Delhi",
    branch: "Mayur Vihar",
    contact: "(+91) 4512084853",
  },
  {
    account_number: "456023",
    name: "Kavita Sur",
    email: "ks@gmail.com",
    current_balance: "17160",
    transaction: [],
    address: "45/2, Vihar Ganj Road, Delhi-700001",
    city: "Delhi",
    branch: "Mayur Vihar",
    contact: "(+91) 4512084853",
  },
  {
    account_number: "456153",
    name: "Ranjan Goyal",
    email: "rg@gmail.com",
    current_balance: "24000",
    transaction: [],
    address: "45/2, Vihar Ganj Road, Delhi-700001",
    city: "Delhi",
    branch: "Mayur Vihar",
    contact: "(+91) 4512084853",
  },
];

window.onload = () => {
  var tbody = document.getElementById("tbody");

  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("TR");
    let td1 = document.createElement("TD");
    td1.innerText = data[i].account_number;
    let td2 = document.createElement("TD");
    td2.innerText = data[i].name;
    let td3 = document.createElement("TD");
    td3.innerText = data[i].email;
    let td4 = document.createElement("TD");
    td4.innerText = "₹ " + data[i].current_balance;
    let td5 = document.createElement("TD");
    let btn = document.createElement("BUTTON");
    btn.innerHTML = "View";
    btn.setAttribute("class", "btn btn-success");
    btn.onclick = function () {
      console.log(data[i].account_number);
      document.getElementsByClassName("details")[0].style.display = "block";
      document.getElementsByClassName("details")[0].style.height = "100%";
      document.getElementById("set_name").innerHTML = data[i].name;
      document.getElementById("set_email").innerHTML = data[i].email;
      document.getElementById("set_current_balance").innerHTML =
        "₹ " + data[i].current_balance;
      document.getElementById("set_account_number").innerHTML =
        data[i].account_number;

      document.getElementById("set_address").innerHTML = data[i].address;
      document.getElementById("set_city").innerHTML = data[i].city;
      document.getElementById("set_branch").innerHTML = data[i].branch;
      document.getElementById("set_contact").innerHTML = data[i].contact;
    };
    td5.appendChild(btn);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);
  }
};

function update_customer_table(
  recipent_accno,
  transfer_amt,
  sender_accno,
  sender_new_balance
) {
  var table = document.getElementById("tbody");
  for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];
    console.log(row.cells[2].innerHTML);
    if (row.cells[0].innerHTML == sender_accno) {
      row.cells[3].innerHTML = "₹ " + sender_new_balance;
    }
    if (row.cells[0].innerHTML == recipent_accno) {
      row.cells[3].innerHTML =
        "₹ " + parseFloat(row.cells[3].innerHTML) + parseFloat(transfer_amt);
    }
  }
}

function update_transfer_table(
  recipent_accno,
  transfer_amt,
  sender_accno,
  sender_name,
  recipent_name
) {
  var tbody = document.getElementById("transfer_tbody");

  let tr = document.createElement("TR");
  let td1 = document.createElement("TD");
  td1.innerText = sender_name;
  let td2 = document.createElement("TD");
  td2.innerText = sender_accno;
  let td3 = document.createElement("TD");
  td3.innerText = recipent_name;
  let td4 = document.createElement("TD");
  td4.innerText = recipent_accno;
  let td5 = document.createElement("TD");
  td5.innerText = "₹ " + transfer_amt;

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tbody.appendChild(tr);
}
function transfer() {
  var recipent_name, sender_name;

  var curr_balance = parseFloat(
    document.getElementById("set_current_balance").innerHTML
  );
  var transfer_amt = document.getElementById("transfer_amt").value;
  if (transfer_amt <= curr_balance) {
    let sender_accno = document.getElementById("set_account_number").innerHTML;
    let recipent_accno = document.getElementById("recipent_accno").value;
    let sender_new_balance = curr_balance - transfer_amt;
    document.getElementById("set_current_balance").innerHTML =
      "₹ " + sender_new_balance;

    for (let i = 0; i < data.length; i++) {
      if (data[i].account_number == recipent_accno) {
        recipent_name = data[i].name;
        data[i].current_balance =
          parseFloat(data[i].current_balance) + transfer_amt;
        let obj = {
          Received: transfer_amt,
          From: sender_accno,
        };
        data[i].transaction.push(obj);
      }
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].account_number == sender_accno) {
        sender_name = data[i].name;
        data[i].current_balance = sender_new_balance;
        let obj = {
          Sent: transfer_amt,
          To: recipent_accno,
        };
        data[i].transaction.push(obj);
      }
    }
    update_customer_table(
      recipent_accno,
      transfer_amt,
      sender_accno,
      sender_new_balance
    );

    update_transfer_table(
      recipent_accno,
      transfer_amt,
      sender_accno,
      sender_name,
      recipent_name
    );
  } else {
    alert("Not enough balance available or incorrect account number");
  }
}

function show_transfer_div() {
  document.getElementById("transfer_div").style.display = "flex";
}
function close_transfer_div() {
  document.getElementById("transfer_div").style.display = "none";
}

function show_customer_table() {
  location.href = "#cust_tab";
}

function show_transfer_table() {
  console.log(2);
  document.getElementsByClassName("transfer_table_container")[0].style.height =
    "100%";
}
function close_transfer_table_container() {
  document.getElementsByClassName("transfer_table_container")[0].style.height =
    "0%";
}

function close_detail_container() {
  document.getElementsByClassName("details")[0].style.height = "0%";
}
