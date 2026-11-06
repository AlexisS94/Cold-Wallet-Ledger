const CREDS = { user:"jean.mol94", pass:"@elchiki1500" };

function login(){ sessionStorage.setItem("bexa_auth", "1"); }
function logout(){ sessionStorage.removeItem("bexa_auth"); location.href = "index.html"; }
function guard(){ if(!sessionStorage.getItem("bexa_auth")) location.replace("login.html"); }