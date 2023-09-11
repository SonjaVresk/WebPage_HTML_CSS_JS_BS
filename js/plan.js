
// Animacija autocomplete forme:
window.addEventListener('load', function() {
  var auto = document.querySelector('#auto');
  auto.classList.add('move');
});

let token =JSON.parse(sessionStorage.getItem('myToken')); //dohvaća token iz session storage

console.log(token); 

const url = 'https://www.fulek.com/data/api/supit/curriculum-list/hr';

async function getCourses() {
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
  
    const selectedCourses = []; // Polje za selektirane kolegije
  
    $('#txtName').autocomplete({
      source: (request, response) => {
        const filteredData = data.data.filter((course) => {
          return !selectedCourses.includes(course.id);
        });
        const term = request.term.toLowerCase();
        const matches = filteredData.filter((course) => {
          return course.kolegij.toLowerCase().indexOf(term) >= 0;
        });
        response(matches.map((course) => ({
          label: course.kolegij,
          value: course.id,
        })));
      },
      minLength: 2,
      select: (event, ui) => {
        event.preventDefault(); //sprječava da se u label-u prikazuje defaultno Id
        const selectedCourseId = ui.item.value;
        
        // Provjera je li odabrani kolegij već u polju
        if (selectedCourses.includes(selectedCourseId)) {
          console.log(`Kolegij ${ui.item.label} (ID: ${selectedCourseId}) je već odabran.`);
          return false; // Sprječava odabir već selektiranog kolegija
        } else {
          selectedCourses.push(selectedCourseId);
          console.log(`Odabrani kolegij: ${ui.item.label} (ID: ${selectedCourseId})`);
          $("#course-table").css("visibility", "visible")  //postavlja vidljivost tablice
          displayCourse(selectedCourseId);
        }        
      },
      
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
 
    //Prikaz kolegija u tablici

    function displayCourse(courseId) {
      const url = `https://www.fulek.com/data/api/supit/get-curriculum/${courseId}`;
      fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => response.json())
        .then(data => {
          //$('#course-table tbody').empty();
          $('#course-table tbody').append(`
            <tr data-id="${data.data.id}">
              <td>${data.data.kolegij}</td>
              <td>${data.data.ects}</td>
              <td>${data.data.sati}</td>
              <td>${data.data.predavanja}</td>
              <td>${data.data.vjezbe}</td>
              <td>${data.data.tip}</td>
              <td><button class="delete-button btn btn-danger">Delete</button></td>
            </tr>
          `);
          $('#course-table .delete-button').on('click', (event) => {
            const row = $(event.target).closest('tr'); //dohvati red u kojem je delete button
            const id = row.attr('data-id'); //dohvati id kolegija
            row.remove();
            console.log(`Deleted course with ID ${id}`);
            updateTotalValues();
          });
          updateTotalValues();
        })
        .catch(error => console.error(`Error fetching course details: ${error}`));
    }

    // Zbrajanje bodova i sati

    function updateTotalValues() {
      let totalEcts = 0;
      let totalSati = 0;
      let totalPredavanja = 0;
      let totalVjezbe = 0;
    
      $('#course-table tbody tr').each((index, element) => {
        const row = $(element);
        const ects = parseInt(row.find('td:eq(1)').text()); //ćelija na indeksu 1
        const sati = parseInt(row.find('td:eq(2)').text());
        const predavanja = parseInt(row.find('td:eq(3)').text());
        const vjezbe = parseInt(row.find('td:eq(4)').text());
    
        totalEcts += ects;
        totalSati += sati;
        totalPredavanja += predavanja;
        totalVjezbe += vjezbe;
      });
    
      $('#total-ects').text(totalEcts.toFixed(0));  //broj decimala
      $('#total-sati').text(totalSati.toFixed(0));
      $('#total-predavanja').text(totalPredavanja.toFixed(0));
      $('#total-vjezbe').text(totalVjezbe.toFixed(0));
    }
}

getCourses();