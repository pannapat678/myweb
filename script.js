window.send = function () {

const type = document.getElementById("type");
const phone = document.getElementById("phone");
const date = document.getElementById("date");
const location = document.getElementById("location");

if(!type.value || !phone.value || !date.value || !location.value){
alert("กรอกข้อมูลให้ครบ");
return;
}

let data = JSON.parse(localStorage.getItem("lost_items") || "[]");

data.push({
type: type.value,
phone: phone.value,
date: date.value,
location: location.value,
status: "lost",
time: new Date().toLocaleString()
});

localStorage.setItem("lost_items", JSON.stringify(data));

type.value="";
phone.value="";
date.value="";
location.value="";

render();
}

/* DELETE */
window.del = function(index){
let data = JSON.parse(localStorage.getItem("lost_items") || "[]");
data.splice(index,1);
localStorage.setItem("lost_items", JSON.stringify(data));
render();
}

/* FOUND */
window.found = function(index){
let data = JSON.parse(localStorage.getItem("lost_items") || "[]");
data[index].status = "found";
localStorage.setItem("lost_items", JSON.stringify(data));
render();
}

/* SEARCH */
window.filter = function(){
render();
}

/* RENDER */
function render(){

let val = document.getElementById("search").value.toLowerCase();
let list = document.getElementById("list");

let data = JSON.parse(localStorage.getItem("lost_items") || "[]");

list.innerHTML = "";

data.forEach((d,i)=>{

if(val && !JSON.stringify(d).toLowerCase().includes(val)) return;

list.innerHTML += `
<div class="card">
<span class="badge ${d.status}">${d.status}</span><br><br>

📦 ${d.type}<br>
📞 ${d.phone}<br>
📅 ${d.date}<br>
📍 ${d.location}<br>
⏰ ${d.time}<br><br>

<button onclick="found(${i})">✔ เจอแล้ว</button>
<button onclick="del(${i})">🗑 ลบ</button>
</div>
`;
});
}

render();