'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const grid=document.querySelector('#product-grid-container');if(!grid)return;
 // Remove only generated contents; keep all other catalogue sections intact.
 const area=el('div','container my-4');area.id='togyz-catalog-features';grid.before(area);grid.replaceChildren();
 const controls=el('div','row g-2 mb-3');area.append(controls);
 const search=el('input','form-control');search.type='search';const searchCol=el('div','col-12 col-md-4');searchCol.append(search);controls.append(searchCol);
 const cat=el('select','form-select');const catCol=el('div','col-6 col-md-2');catCol.append(cat);controls.append(catCol);
 const sizeFilter=el('select','form-select');const sizeCol=el('div','col-6 col-md-2');sizeCol.append(sizeFilter);controls.append(sizeCol);
 const maxPrice=el('input','form-control');maxPrice.type='number';maxPrice.min='0';maxPrice.value='50000';const priceCol=el('div','col-6 col-md-2');priceCol.append(maxPrice);controls.append(priceCol);
 const sort=el('select','form-select');const sortCol=el('div','col-6 col-md-2');sortCol.append(sort);controls.append(sortCol);
 const reset=el('button','btn btn-outline-dark mb-3');reset.type='button';area.append(reset);
 const resultCount=el('p','text-muted');resultCount.setAttribute('role','status');area.append(resultCount);
 const feedback=el('div');feedback.id='catalog-feedback';area.append(feedback);
 function options(select,rows){select.replaceChildren();rows.forEach(([value,label])=>{const o=el('option','',label);o.value=value;select.append(o);});}
 function paintControls(){const oldCat=cat.value,oldSize=sizeFilter.value,oldSort=sort.value;search.placeholder=tr('search');maxPrice.setAttribute('aria-label',tr('maxPrice'));reset.textContent=tr('reset');options(cat,[['',tr('all')],['shirts',tr('catShirts')],['pants',tr('catPants')],['skirts',tr('catSkirts')],['dresses',tr('catDresses')]]);options(sizeFilter,[['',tr('all')],...['S','M','L','XL'].map(s=>[s,s])]);options(sort,[['','—'],['low',tr('sortLow')],['high',tr('sortHigh')]]);cat.value=oldCat;sizeFilter.value=oldSize;sort.value=oldSort;}
 function translated(p){return p[language()==='kz'?'nameKz':language()==='ru'?'nameRu':'nameEn'];}
 function render(){grid.replaceChildren();let count=0;outfitsData.forEach(outfit=>{
 const items=outfit.productIds.map(id=>productsData.find(p=>p.id===id)).filter(Boolean);
 let selected=items.filter(p=>[p.nameKz,p.nameRu,p.nameEn].some(s=>s.toLocaleLowerCase().includes(search.value.trim().toLocaleLowerCase()))&&(!cat.value||p.category===cat.value)&&(!sizeFilter.value||p.sizes.includes(sizeFilter.value))&&p.price<=Number(maxPrice.value||0));
 if(!selected.length)return;count+=selected.length;if(sort.value==='low')selected.sort((a,b)=>a.price-b.price);if(sort.value==='high')selected.sort((a,b)=>b.price-a.price);
 const col=el('div','col-12 col-md-6 col-lg-4 mb-4');const card=el('article','card h-100 shadow-sm product-card');col.append(card);grid.append(col);
 const photo=el('img','card-img-top img-fluid');photo.src=outfit.image;photo.alt=`Outfit ${outfit.id}`;photo.loading='lazy';photo.addEventListener('error',()=>{photo.alt=`Outfit ${outfit.id} — image unavailable`;});card.append(photo);
 const body=el('div','card-body d-flex flex-column');card.append(body);body.append(el('h2','h4 text-center',`${outfit.id}-ОБРАЗ`));body.append(el('p','fw-bold text-center',money(items.reduce((s,p)=>s+p.price,0))));
 const show=el('button','btn btn-outline-dark mb-2',tr('viewItems'));show.type='button';body.append(show);
 const list=el('div','d-none mb-2');body.append(list);
 selected.forEach(p=>{const row=el('div','border rounded p-2 mb-2');list.append(row);const img=el('img','img-fluid rounded mb-2');img.src=p.image;img.alt=translated(p);img.loading='lazy';img.addEventListener('error',()=>img.classList.add('d-none'));row.append(img);row.append(el('p','fw-semibold mb-1',translated(p)+' — '+money(p.price)));const sizes=el('select','form-select mb-2');p.sizes.forEach(s=>{const opt=el('option','',s);opt.value=s;sizes.append(opt);});sizes.setAttribute('aria-label',tr('labelSize'));row.append(sizes);const add=el('button','btn btn-dark w-100',tr('btnAddToCart'));add.type='button';add.addEventListener('click',()=>{if(addCart(p.id,sizes.value))statusMessage(feedback,translated(p)+': '+tr('added'));});row.append(add);});
 show.addEventListener('click',()=>list.classList.toggle('d-none'));
 const addAll=el('button','btn btn-outline-secondary',tr('addAll'));addAll.type='button';addAll.addEventListener('click',()=>{selected.forEach(p=>addCart(p.id,p.sizes[0]));statusMessage(feedback,tr('added')+' — '+selected.length);});body.append(addAll);
 });resultCount.textContent=tr('count')+': '+count;if(!count)grid.append(el('p','text-center py-5',tr('noResults')));
 }
 [search,maxPrice].forEach(n=>n.addEventListener('input',render));[cat,sizeFilter,sort].forEach(n=>n.addEventListener('change',render));reset.addEventListener('click',()=>{search.value='';cat.value='';sizeFilter.value='';maxPrice.value=50000;sort.value='';render();});document.addEventListener('togyz:language',()=>{paintControls();render();});paintControls();render();
});