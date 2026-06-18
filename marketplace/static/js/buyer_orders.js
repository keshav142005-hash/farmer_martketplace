// Row Reveal Animation

const rows =
document.querySelectorAll("tbody tr,tr");

rows.forEach((row,index)=>{

row.style.opacity="0";
row.style.transform="translateY(30px)";

setTimeout(()=>{

row.style.transition="0.8s";

row.style.opacity="1";

row.style.transform="translateY(0)";

},index*150);

});


// Mouse Glow Effect

document.querySelectorAll("tr").forEach(row=>{

row.addEventListener("mousemove",()=>{

row.style.transition=".3s";

row.style.boxShadow=
"0 0 20px rgba(76,175,80,.3)";

});

row.addEventListener("mouseleave",()=>{

row.style.boxShadow="none";

});

});


// Title Floating

const title =
document.querySelector("h1");

let move = 0;

setInterval(()=>{

move += 0.03;

title.style.transform =
`translateY(${Math.sin(move)*5}px)`;

},30);