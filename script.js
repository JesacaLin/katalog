"use strict";

//might not need this:
/* const modalButton = document.querySelector(".btn-open");
modalButton.addEventListener("click", function () {
  //on click, clears the list out, might not need.
  talentList.innerHTML = "";
  console.log("clicked");
});
*/

const initialPerson = [
  {
    category: "Photographer",
    name: "Emmy Park",
    email: "Emmy@emmypark.com",
    phone: "111-222-3333",
    portfolio: "http://www.google.com",
    relevantWork: "http://www.google.com",
    country: "United States",
    state: "New York",
    city: "New York",
  },
  {
    category: "Video",
    name: "Person Two",
    email: "Person@emmypark.com",
    phone: "111-444-3333",
    portfolio: "http://www.google.com",
    relevantWork: "http://www.google.com",
    country: "England",
    state: "",
    city: "London",
  },
];
//SELECT DOM ELEMENTS
const talentList = document.querySelector(".talentList");

//CREATE DOM ELEMENTS: RENDER TALENT LIST
talentList.innerHTML = "";

//LOAD DATA FROM SUPABASE
loadTalent();

async function loadTalent() {
  const res = await fetch(
    "https://xmbmbdtgbybujizevhyc.supabase.co/rest/v1/Contributor",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtYm1iZHRnYnlidWppemV2aHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3NDI0NTcsImV4cCI6MTk4OTMxODQ1N30.yPMNK6UEyRtmZJ76PkMGtEyXGJpqHVUc4oZ0XlVxlnQ",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtYm1iZHRnYnlidWppemV2aHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3NDI0NTcsImV4cCI6MTk4OTMxODQ1N30.yPMNK6UEyRtmZJ76PkMGtEyXGJpqHVUc4oZ0XlVxlnQ",
      },
    }
  );
  //TRANSLATE TO JSON
  const data = await res.json();

  createTalentList(data);
}

// createTalentList(initialPerson);

function createTalentList(dataArray) {
  const htmlArr = dataArray.map(
    (person) => `<tbody>
      <tr class="cardTop">
        <th scope="row" class="tableName pt-4 ps-4">
          <h5 class="name">${person.name}</h5>
        </th>
        <td class="pt-4">${person.category}</td>
        <td></td>
        <td></td>
        <td></td>
      
        <td class="pt-4">${person.country}</td>
        <td class="pt-4">${person.state}</td>
        <td class="pt-4">${person.city}</td>
        </tr>
        <tr>
        <td class="pb-4 ps-4 pt-3">${person.phone}</td>
        <td class="pt-3">${person.email}</td>
        <td></td>
        
        <td></td>
        <td class="pt-3"><button><a href='${person.portfolio}'>Portfolio</a></button></td>
        <td class="pt-3"><button><a href="${person.relevantWork}">Relevant Work</a></button></td>
        </tr>
      </tbody>`
  );
  const html = htmlArr.join("");
  talentList.insertAdjacentHTML("afterbegin", html);
}
