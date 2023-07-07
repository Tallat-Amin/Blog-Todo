"use strict";
const burger = document.querySelector(".btn");
const links = document.querySelector(".links");
const modal = document.querySelector(".main-button");
const modalBox = document.querySelector(".modal");
const modalBoxAddClose = document.querySelector(".modal-close.add");
const modalBoxUpdateClose = document.querySelector(".modal-close.update");
const clear = document.querySelector(".clear-button");
const popup = document.querySelector(".popup.clear");
const cancelBTN = document.querySelector("#cancel");
const confirmBTN = document.querySelector("#confirm");
// const updateButton = document.querySelector("#updateBtn");
// const deleteButton = document.querySelector("#deleteBtn");
// const img = document.querySelector("#img");
const img = document.querySelector("input[type=file]").files[0];
// const reader = new FileReader();
// reader.addEventListener(
//   "load",
//   function () {
//     // convert image file to base64 string and save to localStorage
//     localStorage.setItem("image", reader.result);
//   },
//   false
// );

// if (img) {
//   reader.readAsDataURL(img);
// }

const title = document.querySelector("#title");
const desc = document.querySelector("#desc");
const updatedImg = document.querySelector("#updatedImg");
const updatedTitle = document.querySelector("#updatedTitle");
const updatedDesc = document.querySelector("#updatedDesc");
const modalBoxUpdate = document.querySelector(".modal.update");
const updateForm = document.querySelector("#updateForm");

burger.addEventListener("click", () => {
  links.classList.toggle("active");
});
modal.addEventListener("click", () => {
  modalBox.classList.toggle("active");
});
modalBoxAddClose.addEventListener("click", () => {
  modalBox.classList.remove("active");
});
modalBoxUpdateClose.addEventListener("click", () => {
  modalBoxUpdate.classList.remove("active");
});
clear.addEventListener("click", () => {
  popup.classList.toggle("active");
});
cancelBTN.addEventListener("click", () => {
  popup.classList.remove("active");
});
confirmBTN.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});
// FORM DATA SET
// try {
  document.addEventListener("submit", (event) => {
    // event.preventDefault();
    // console.log(typeof imgValue);

    // let imgValue = img.value;
    let titleValue = title.value;
    let descValue = desc.value;
    let existingBlogsJSON = localStorage.getItem("blogs");
    let existingBlogs = existingBlogsJSON ? JSON.parse(existingBlogsJSON) : [];

    let formData = {
      id: existingBlogs.length,
      // imgValue: imgValue,
      titleValue: titleValue,
      descValue: descValue,
    };
    existingBlogs.push(formData);

    let updatedBlogsJSON = JSON.stringify(existingBlogs);
    localStorage.setItem("blogs", updatedBlogsJSON);

    // window.location.href = "index.html";
  });
// } catch (error) {
  // console.log(error);
// }

// FORM DATA GET
document.addEventListener("DOMContentLoaded", function () {
  let blogsJSON = localStorage.getItem("blogs");
  if (blogsJSON) {
    let blogs = JSON.parse(blogsJSON);
    let blogsContainer = document.querySelector(".blogs");
    // Clear existing blogs
    blogsContainer.innerHTML = "";

    // generate HTML for each blog with map
    blogs.map((blog, index) => {
      let blogDiv = document.createElement("div");
      let blogDivImage = document.createElement("div");
      let blogDivUl = document.createElement("ul");
      let blogDivLi = document.createElement("li");

      let blogDivContent = document.createElement("div");

      blogDivImage.classList.add("blog-image");
      blogDivContent.classList.add("blog-content");

      let img = document.createElement("img");
      img.src = blog.imgValue;
      img.src = blog.imgValue;
      img.alt = "Blog Image";
      //
      blogDivImage.appendChild(img);
      blogDiv.appendChild(blogDivImage);

      let title = document.createElement("h2");
      title.textContent = "Title: " + blog.titleValue;
      blogDivContent.appendChild(title);
      blogDiv.appendChild(blogDivContent);

      let desc = document.createElement("p");
      desc.textContent = "Description:" + blog.descValue;
      blogDivContent.appendChild(desc);
      blogDiv.appendChild(blogDivContent);

      blogDivLi.appendChild(blogDiv);
      blogDivUl.appendChild(blogDivLi);
      blogsContainer.appendChild(blogDivUl);

      let buttonDiv = document.createElement("div");
      buttonDiv.classList.add("buttons");
      let updateBtn = document.createElement("button");
      updateBtn.setAttribute(`id`, `updateBtn`);
      updateBtn.textContent = "Update";
      updateBtn.addEventListener("click", () => {});

      let deleteBtn = document.createElement("button");
      deleteBtn.setAttribute(`id`, `deleteBtn`);
      deleteBtn.textContent = "Delete";
      // console.log(blogDivContent.parentNode);

      deleteBtn.addEventListener("click", () => {
        deleteBlog(blog.id);
      });
      updateBtn.addEventListener("click", () => {
        updateBlog(blog, index);
      });

      blogDiv.appendChild(buttonDiv);
      buttonDiv.appendChild(deleteBtn);
      buttonDiv.appendChild(updateBtn);
    });
  }
});
// function generateUniqueId() {
//   return "_" + Math.random().toString(36).substr(2, 9);
// }
function updateBlog(blog, blogId) {
  modalBoxUpdate.classList.toggle("active");
  updatedImg.value = blog.imgValue;
  updatedTitle.value = blog.titleValue;
  updatedDesc.value = blog.descValue;

  updateForm.addEventListener("click", () => {
    console.log("i am in");
    let updatedBlogs;
    let updatedBlogJSON = localStorage.getItem("blogs");
    if (updatedBlogJSON) {
      updatedBlogs = JSON.parse(updatedBlogJSON);
    }
    updatedBlogs[blogId].imgValue = updatedImg.value;
    updatedBlogs[blogId].titleValue = updatedTitle.value;
    updatedBlogs[blogId].descValue = updatedDesc.value;
    console.log(updatedBlogs);

    let updatedBlogsJSON = JSON.stringify(updatedBlogs);
    localStorage.setItem("blogs", updatedBlogsJSON);
    updateForm.addEventListener("click", () => {
      console.log("i am in");
    });
    window.location.href = "index.html";
  });
}
function deleteBlog(blogId) {
  console.log(blogId);
  let blogJSON = localStorage.getItem("blogs");
  if (blogJSON) {
    let blogs = JSON.parse(blogJSON);
    let updatedBlogs = blogs.filter((blogs) => blogs.id !== blogId);

    let updatedBlogsJSON = JSON.stringify(updatedBlogs);
    localStorage.setItem("blogs", updatedBlogsJSON);

    window.location.reload();

    console.log("Deleted blog with ID:", blogId);
  }
}
