const pages = ['pub_representative.html', 'pub_all.html']; 
let idx = 0;  // start with first file

function pubToggle(){
    idx = (idx + 1) % pages.length; // 0→1→0→1…
    loadPubContent(pages[idx]);
}

function loadPubContent(url){
    fetch(url).then(r => r.text())
              .then(html => document.getElementById('pubContent').innerHTML = html)
              .catch(err => document.getElementById('pubContent').innerHTML = '<p >Failed to load '+url+'</p>');
    document.getElementById('pubToggle').textContent = pages[(idx + 1) % pages.length].replace('pub_', '').replace('.html','') + ' publications';
}

/* show first fragment automatically */
loadPubContent(pages[idx]);