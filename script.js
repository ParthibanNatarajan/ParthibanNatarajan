const doorScreen=document.getElementById("doorScreen");
document.getElementById("openDoors").addEventListener("click",()=>{
  doorScreen.classList.add("opening");
  setTimeout(()=>{doorScreen.classList.add("gone");document.body.classList.add("entered");},1450);
  setTimeout(()=>doorScreen.remove(),2500);
});

// Original gentle bell-like ambient motif made with Web Audio (no external/copyrighted track).
let audioCtx=null, musicTimer=null, musicOn=false, noteIndex=0;
const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46];
function playNote(){
  if(!audioCtx||!musicOn)return;
  const freq=notes[noteIndex++%notes.length], now=audioCtx.currentTime;
  const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
  osc.type="sine";osc.frequency.setValueAtTime(freq,now);
  gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.055,now+.06);gain.gain.exponentialRampToValueAtTime(.001,now+1.25);
  osc.connect(gain);gain.connect(audioCtx.destination);osc.start(now);osc.stop(now+1.3);
}
const musicToggle=document.getElementById("musicToggle");
musicToggle.addEventListener("click",async()=>{
  if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==="suspended")await audioCtx.resume();
  musicOn=!musicOn;musicToggle.setAttribute("aria-pressed",String(musicOn));
  document.getElementById("musicLabel").textContent=musicOn?"Pause music":"Play music";
  musicToggle.classList.toggle("playing",musicOn);
  if(musicOn){playNote();musicTimer=setInterval(playNote,850);}
  else{clearInterval(musicTimer);musicTimer=null;}
});

// Click-to-enlarge gallery.
const lightbox=document.getElementById("lightbox"), lightboxImage=document.getElementById("lightboxImage");
document.querySelectorAll(".photo").forEach(btn=>btn.addEventListener("click",()=>{
  lightboxImage.src=btn.dataset.image;lightbox.classList.add("show");lightbox.setAttribute("aria-hidden","false");
}));
function closeLightbox(){lightbox.classList.remove("show");lightbox.setAttribute("aria-hidden","true");}
document.getElementById("closeLightbox").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox();});

// Floating petals, created locally with CSS.
const petalField=document.querySelector(".petal-field");
function makePetal(){
  const p=document.createElement("span");p.className="petal";p.textContent=["✿","❀","✧"][Math.floor(Math.random()*3)];
  p.style.left=Math.random()*100+"%";p.style.fontSize=(12+Math.random()*13)+"px";
  p.style.animationDuration=(8+Math.random()*8)+"s";p.style.setProperty("--drift",(Math.random()*150-75)+"px");
  petalField.appendChild(p);setTimeout(()=>p.remove(),17000);
}
for(let i=0;i<12;i++)setTimeout(makePetal,i*380);
setInterval(makePetal,1100);