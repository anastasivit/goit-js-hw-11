var form=document.getElementById("search-form"),gallery=document.querySelector(".gallery"),loadMoreBtn=document.querySelector(".load-more"),page=1;function clearGallery(){gallery.innerHTML="",page=1,loadMoreBtn.style.display="none"}function searchImages(e){var a="https://pixabay.com/api/?key=".concat("36785926-9df8e575763dc5d4ea5ec1ee8","&q=").concat(e,"&image_type=photo&orientation=horizontal&safesearch=true&page=").concat(page,"&per_page=").concat(40);fetch(a).then((function(e){return e.json()})).then((function(e){0!==e.hits.length?(e.hits.forEach((function(e){var a=createImageCard(e);gallery.appendChild(a)})),e.totalHits>40*page?loadMoreBtn.style.display="block":(showNotification("We're sorry, but you've reached the end of search results."),loadMoreBtn.style.display="none"),page++):showNotification("Sorry, there are no images matching your search query. Please try again.")})).catch((function(e){console.error("Error:",e),showNotification("An error occurred. Please try again later.")}))}function createImageCard(e){var a=document.createElement("div");a.className="photo-card";var t=document.createElement("img");t.src=e.webformatURL,t.alt=e.tags,t.loading="lazy";var o=document.createElement("div");return o.className="info",o.innerHTML='\n    <p class="info-item"><b>Likes:</b> '.concat(e.likes,'</p>\n    <p class="info-item"><b>Views:</b> ').concat(e.views,'</p>\n    <p class="info-item"><b>Comments:</b> ').concat(e.comments,'</p>\n    <p class="info-item"><b>Downloads:</b> ').concat(e.downloads,"</p>\n  "),a.appendChild(t),a.appendChild(o),a}function showNotification(e){notiflix.Notify.info(e,{position:"center",timeout:3e3})}form.addEventListener("submit",(function(e){e.preventDefault();var a=form.searchQuery.value;""!==a.trim()&&(clearGallery(),searchImages(a))})),loadMoreBtn.addEventListener("click",(function(){searchImages(form.searchQuery.value)}));
//# sourceMappingURL=index.b51dae6f.js.map