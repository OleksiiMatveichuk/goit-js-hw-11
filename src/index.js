import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { getImages } from './axiosPhotos';
// Notiflix.Notify.success().failure().warning().info();

const form = document.querySelector('.search-form');
const input = form.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const createResult = async evt => {
  evt.preventDefault();

  const arr = await getImages(input.value);

  addMarkup(arr);
};

const addMarkup = arr => {
  console.log('1111 :>> ', arr);
  const result = arr
    .map(
      el =>
        `<div class="photo-card">
  <img src="${el.webformatURL}" alt="${el.tags} data-img='${el.largeImageURL}' " loading="lazy" />
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
  gallery.innerHTML = result;
};

form.addEventListener('submit', createResult);
