export function renderPost(post) {
    const li = document.createElement('li');

    const detailA = document.createElement('a');

    detailA.href = `/detail-post/?id=${post.id}`;

    const img = document.createElement('img');
    img.src = post.image_url;

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.text;

    const url = document.createElement('a');
    url.href = post.url;

    detailA.append(h2, img, url);
    li.append(detailA);

    return li;
}

export function renderComment(comment) {
    const li = document.createElement('li');
    li.textContent = comment.text;
    return li;
}
