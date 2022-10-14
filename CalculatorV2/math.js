const numBtns = document.querySelectorAll(".num-btn"); 
for (let i=0; i <numBtns.length;i++) {
  numBtns[i].addEventListener("click",()=>{console.log(`${numBtns[i].innerText}`);})
}
