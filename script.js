const weddingDate = new Date("2027-02-12T08:30:00+05:30").getTime();
function updateCountdown(){
  const now=Date.now(), diff=weddingDate-now;
  if(diff<=0){document.querySelector(".countdown").innerHTML="<p class='eyebrow'>THE CELEBRATION DAY IS HERE</p>";return;}
  const d=Math.floor(diff/86400000), h=Math.floor(diff%86400000/3600000), m=Math.floor(diff%3600000/60000), s=Math.floor(diff%60000/1000);
  document.getElementById("days").textContent=d;
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("minutes").textContent=String(m).padStart(2,"0");
  document.getElementById("seconds").textContent=String(s).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);