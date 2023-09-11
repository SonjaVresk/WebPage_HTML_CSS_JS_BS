
fetch('/contactForm.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('contact').innerHTML = data;
  });