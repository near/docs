window.addEventListener('load', function() {
  const element = document.querySelector(".navListItemActive")

  if(element) {
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
})
