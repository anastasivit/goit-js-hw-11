const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchQuery = form.searchQuery.value.trim();
  if (searchQuery === '') return;

  clearGallery();
  searchImages(searchQuery);
});

loadMoreBtn.addEventListener('click', () => {
  const searchQuery = form.searchQuery.value.trim();
  searchImages(searchQuery);
});

function clearGallery() {
  gallery.innerHTML = '';
  page = 1;
  loadMoreBtn.style.display = 'none';
}

async function searchImages(query) {
  const apiKey = '36785926-9df8e575763dc5d4ea5ec1ee8';
  const perPage = 40;
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.hits.length === 0) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    data.hits.forEach(image => {
      const card = createImageCard(image);
      gallery.appendChild(card);
    });

    if (data.totalHits > page * perPage) {
      loadMoreBtn.style.display = 'block';
    } else {
      showNotification(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.style.display = 'none';
    }

    page++;
  } catch (error) {
    console.error('Error:', error);
    showNotification('An error occurred. Please try again later.');
  }
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.className = 'photo-card';

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const info = document.createElement('div');
  info.className = 'info';
  info.innerHTML = `
    <p class="info-item"><b>Likes:</b> ${image.likes}</p>
    <p class="info-item"><b>Views:</b> ${image.views}</p>
    <p class="info-item"><b>Comments:</b> ${image.comments}</p>
    <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
  `;

  card.appendChild(img);
  card.appendChild(info);

  return card;
}

function showNotification(message) {
  notiflix.Notify.info(message, {
    position: 'center',
    timeout: 3000,
  });
}
