const numBtns = document.querySelectorAll(".num-btn"); 
for (let numBtn of numBtns) {
  numBtn.addEventListener("click",()=>{console.log(`${numBtn.innerText}`);})
}
