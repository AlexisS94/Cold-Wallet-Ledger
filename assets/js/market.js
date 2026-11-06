function sparkPath(arr, w=100, h=34){
  const min = Math.min(...arr), max = Math.max(...arr), span = (max-min)||1;
  return arr.map((v,i)=>{
    const x = (i/(arr.length-1))*w;
    const y = h - ((v-min)/span)*(h-6) - 3;
    return (i?"L":"M")+x.toFixed(2)+","+y.toFixed(2);
  }).join(" ");
}

function renderTicker(){
  const box = document.getElementById("ticker");
  if(!box) return;
  box.innerHTML = COINS.filter(c=>c.sym!=="USDT").map(c=>`
    <span class="tick">${c.sym} <b>${fmtUSD(c.price)}</b>
    <span class="${c.chg>=0?'green':'red'}">${c.chg>=0?'+':''}${c.chg.toFixed(2)}%</span></span>`).join("");
}

function renderTable(){
  const body = document.getElementById("mkt-body");
  if(!body) return;
  body.innerHTML = COINS.map(c=>`
    <tr>
      <td><div class="asset">
        <div class="asset-ic" style="background:${c.color}">${c.sym.slice(0,2)}</div>
        <div><div class="asset-n">${c.name}</div><div class="asset-s">${c.sym}</div></div>
      </div></td>
      <td class="mono">${fmtUSD(c.price)}</td>
      <td class="chg ${c.chg>=0?'green':'red'}">${c.chg>=0?'+':''}${c.chg.toFixed(2)}%</td>
      <td><svg class="spark" viewBox="0 0 100 34" preserveAspectRatio="none">
        <path d="${sparkPath(c.spark)}" fill="none" stroke="${c.chg>=0?'#16c784':'#f6465d'}" stroke-width="1.6"/>
      </svg></td>
    </tr>`).join("");
}

function renderHeroChart(){
  const svg = document.getElementById("hero-chart");
  if(!svg) return;
  const c = COINS[0], d = sparkPath(c.spark, 600, 190);
  svg.innerHTML = `
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#16c784" stop-opacity=".34"/>
      <stop offset="100%" stop-color="#16c784" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${d} L600,190 L0,190 Z" fill="url(#g)"/>
    <path d="${d}" fill="none" stroke="#16c784" stroke-width="2.2" stroke-linejoin="round"/>`;
  document.getElementById("hero-price").textContent = fmtUSD(c.price);
}

// subtle live jitter for realism
function jitter(){
  document.querySelectorAll("[data-live]").forEach(el=>{
    const base = parseFloat(el.dataset.live);
    const v = base * (1 + (Math.random()-0.5)*0.0016);
    el.textContent = fmtUSD(v);
  });
}

renderTicker(); renderTable(); renderHeroChart();
setInterval(jitter, 3200);