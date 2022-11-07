// imports
import '../auth/user.js';
import { createPost, uploadImage } from '../fetch-utils.js';

// DOM Elements
const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');

// state
let error = null;

// Events

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/preview-img.png';
    }
});

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(postForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `simple_reddit/${randomFolder}/${imageFile.name}`;
    const imageUrl = await uploadImage('images', imagePath, imageFile);

    const post = {
        title: formData.get('title'),
        text: formData.get('text'),
        url: formData.get('url'),
        image_url: imageUrl,
    };

    const response = await createPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

// Display functions

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
