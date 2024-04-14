//console.log("connection check")

//inputlar
//ekle butonu
//listeleyen eleman

const harcamaInput = document.querySelector("#harcama");
//console.log(harcamaInput)
const fiyatInput = document.querySelector("#fiyat");
//console.log(fiyatInput)
const formBtn = document.querySelector(".ekle-btn");
//console.log(formBtn)
const list = document.querySelector(".list");
//console.log(list);
const totalInfo = document.querySelector("#total-info");
//console.log(totalInfo)
const nameInput = document.getElementById("name-input");

const statusCheck = document.getElementById("status-input");
//console.log(statusCheck)
const selectFilter=document.getElementById("filter-select")
//console.log(selectFilter)

const userName = localStorage.getItem("name");
nameInput.value = userName;

nameInput.addEventListener("change", (e) => {
  localStorage.setItem("name", e.target.value);
});

//console.log(nameInput);
formBtn.addEventListener("click", addExpense);

list.addEventListener("click", handleClick);

selectFilter.addEventListener("change", handleFilter)

let toplam = 0;
function updateToplam(fiyatBilgisi) {
  toplam += Number(fiyatBilgisi);
  totalInfo.innerText = toplam;
}

function addExpense(e) {
  e.preventDefault();
  //console.log("addExpense")

  if (!harcamaInput.value || !fiyatInput.value) {
    alert("Please, Fill all the blanks");
  } else {
    const harcamaDiv = document.createElement("div");
    harcamaDiv.classList.add("expense");
    if (statusCheck.checked) {
      harcamaDiv.classList.add("paid");
    }
    harcamaDiv.innerHTML = `<h2>${harcamaInput.value}</h2>
      <h2 id="value">${fiyatInput.value}</h2>
      <div class="buttons">
      <img id= "payment" src="./images/pay.png" alt="" />
      <img id= "remove"  src="./images/remove.png" alt="" />
          </div>`;
    list.appendChild(harcamaDiv);
    //console.log(harcamaDiv);
    updateToplam(fiyatInput.value);
  }

  harcamaInput.value = "";
  fiyatInput.value = "";
}

function handleClick(e) {
  //console.log(e.target)

  let tiklanilanEleman = e.target;
  if (tiklanilanEleman.id === "remove") {
    //console.log("silme")
    const kapsayiciElement = tiklanilanEleman.parentElement.parentElement;

    const deletedPrice = kapsayiciElement.querySelector("#value").innerText;
    //console.log(deletedPrice);
    updateToplam(-Number(deletedPrice));
    kapsayiciElement.remove();
  }
}

function handleFilter(e){
 // console.log("filtre çalıştı")

const items=list.childNodes
// console.log(items)
const filterValue=e.target.value
//console.log(filterValue)
items.forEach((item)=>{
switch(filterValue){
  case "all":
    item.style.display="flex";
    break;
  case "paid":
    if(!item.classList.contains("paid")){
      item.style.display="none";
    }else{
      item.style.display="flex";
    }
    break;
  case "unpaid":
    if(item.classList.contains("paid")){
      item.style.display="none"
    }else{
      item.style.display= "flex"
    }
    break;
}
})
}
