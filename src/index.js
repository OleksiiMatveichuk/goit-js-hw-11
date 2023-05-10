import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './axiosPhotos';
// Notiflix.Notify.success().failure().warning().info();

const form = document.querySelector('.search-form');
const input = form.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMarkup = `<div class="more">Loading...</div>`;
const loading = document.querySelector('.more');

const createResult = async evt => {
  evt.preventDefault();

  const arr = await getImages(input.value);

  gallery.innerHTML = '';
  addMarkup(arr);
  gallery.insertAdjacentHTML('afterend', loadMarkup);
};

const addMarkup = arr => {
  if (!arr.length) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  const result = arr
    .map(
      el =>
        `<div class="photo-card">
  <a href='${el.largeImageURL}'><img src="${el.webformatURL}" alt="${el.tags} data-img='${el.largeImageURL}' " loading="lazy"  width='350'/></a>
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
  // gallery.innerHTML = result;
  gallery.insertAdjacentHTML('beforeend', result);
};

form.addEventListener('submit', createResult);

// const endlessSrol = async (entr, obs) => {
//   if (entr[0].isIntersecting) {
//     const arr = await getImages(input.value, 2);
//     addMarkup(arr);
//   }
// };
// const observer = new IntersectionObserver(endlessSrol);
// observer.observe(loading);

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
lightbox.on('show.simplelightbox', console.log('qwerty :>> ', 'qwerty'));
