let btn = document.getElementById('my-form');
btn.addEventListener('submit', saveBookmark);

function saveBookmark(e){
  
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

  if(!siteName || !siteUrl){
    alert('Please fill the form !!');
    return false;
  }

  let bookmark = {
    name: siteName,
    url: siteUrl
  };

  if(localStorage.getItem('bookmarks') === null)
  {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  } else{
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }

  fetchBookmark();

  document.getElementById('siteName').value = '';
  document.getElementById('siteUrl').value = '';
  e.preventDefault();
}


function fetchBookmark() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  let content = document.getElementById('content');

  content.innerHTML = '';
  for(let i = 0; i < bookmarks.length; i++){
   let name = bookmarks[i].name;
   let url = bookmarks[i].url;

   content.innerHTML += 
    `<div class="container">
    <div class="row align-items-baseline mx-3">
      <h3 class="text-left">${name}</h3>
      <a class="btn btn-primary btn-sm ml-3" href="${url}">Visit</a>
      <button class="del btn btn-sm btn-danger ml-3" onClick="deleteBookmark('${url}')">Delete</button>
    </div>
    </div>`
  }

};

function deleteBookmark(url){

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for(let i = 0; i < bookmarks.length; i++){
      if(bookmarks[i].url === url){
        bookmarks.splice(i, 1);
      }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


  fetchBookmark();
}