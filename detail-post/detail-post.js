// Imports
import '../auth/user.js';
import { getPost, createComment } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';

// DOM
const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postText = document.getElementById('post-text');
const addCommentForm = document.getElementById('add-comment-form');
const commentList = document.getElementById('comment-list');

// State
let error = null;
let post = null;

// Events
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        alert(error.message + '. ' + 'Please contact the administrator for more information.');
        location.replace('/');
    } else {
        displayPost();
        displayComments();
    }
});

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addCommentForm);

    const insertComment = {
        text: formData.get('text'),
        post_id: post.id,
    };
    const response = await createComment(insertComment);
    error = response.error;

    if (error) {
        displayError();
    } else {
        const comment = response.data;
        post.reddit_comments.unshift(comment);
        displayComments();
        addCommentForm.reset();
    }
});

// Display functions

function displayError() {
    if (error) {
        console.log(error);
        errorDisplay.textContent = error.message;
    }
}

function displayPost() {
    postTitle.textContent = post.title;
    postImage.src = post.image_url;
    postImage.alt = `${post.title} image`;
    postText.textContent = post.text;
}

function displayComments() {
    commentList.innerHTML = '';
    for (const comment of post.reddit_comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}
