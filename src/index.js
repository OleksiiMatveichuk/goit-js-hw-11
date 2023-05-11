import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './axiosPhotos';
// Notiflix.Notify.success().failure().warning().info();

const form = document.querySelector('.search-form');
const input = form.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loading = document.querySelector('.more');
let page = 1;

loading.style.display = 'none';
const lightbox = new SimpleLightbox('.gallery a');
// lightbox.on('show.simplelightbox');

const createResult = async evt => {
  evt.preventDefault();

  const data = await getImages(input.value);
  const { hits: arr, totalHits, error } = data;
  if (!totalHits || error) {
    loading.style.display = 'none';
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  gallery.innerHTML = '';
  addMarkup(arr);
  loading.style.display = 'block';
};

const addMarkup = arr => {
  const result = arr
    .map(
      el =>
        `<div class="photo-card">
  <a href='${el.largeImageURL}'><img src="${el.webformatURL}" alt="${el.tags}" data-img='${el.largeImageURL}' " loading="lazy"  width='350'/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${el.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${el.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${el.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${el.downloads}
    </p>
  </div>
</div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', result);

  lightbox.refresh();
};

form.addEventListener('submit', createResult);

const endlessSrol = async (entr, obs) => {
  if (entr[0].isIntersecting) {
    page += 1;
    const data = await getImages(input.value, page);
    const { hits: arr, totalHits } = data;
    console.log('object :>> ', gallery.children.length, totalHits);
    if (gallery.children.length === totalHits) {
      loading.style.display = 'none';
      return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    addMarkup(arr);
  }
};
const observer = new IntersectionObserver(endlessSrol);
observer.observe(loading);
