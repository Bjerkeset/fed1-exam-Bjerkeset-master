const listContainer = document.querySelector("#js-list-container");

function generateCardHTML(post) {
  const { name, author, description, readtime } = post.attributes;

  return `
    <div class="blog__card">
      <div class="card__item card__item--readtime">
        <p>Read time: ${readtime} min</p>
      </div>
      <div class="card__item card__item--title">
        <h4>${name}</h4>
      </div>
      <div class="card__item card__item--description">
        <p>${description}</p>
      </div>
      <div class="card__item card__item--author">
        <p>By: ${author}</p>
      </div>
      <div class="card__item card__item--btn">
        <a> READ </a>
      </div>
    </div>
  `;
}

function generateShowBlogsButtonHTML() {
  return `
    <div class="show-blogs__btn">
      <a href=""><button class="button button--view-all-posts">View All Posts</button></a>
    </div>
  `;
}

async function fetchBlogPosts() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/blog-posts-homepages"
    );

    if (!response.ok) {
      throw new Error(`ERROR: ${response.status}`);
    }

    const responseData = await response.json();
    const data = responseData.data;
    const container = listContainer;

    // Create a card container
    const cardContainer = document.createElement("div");
    cardContainer.className = "card__container";
    container.appendChild(cardContainer);

    for (let i = 0; i < data.length; i++) {
      const post = data[i];
      const cardHTML = generateCardHTML(post);

      // Create a blog card and append it to the card container
      const blogCardWrapper = document.createElement("div");
      blogCardWrapper.className = "blog__card";
      blogCardWrapper.innerHTML = cardHTML;
      cardContainer.appendChild(blogCardWrapper);
    }

    const showBlogsButtonHTML = generateShowBlogsButtonHTML();
    const showBlogsButtonWrapper = document.createElement("div");
    showBlogsButtonWrapper.className = "show-blogs__btn";
    showBlogsButtonWrapper.innerHTML = showBlogsButtonHTML;
    container.appendChild(showBlogsButtonWrapper);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
}

fetchBlogPosts();
