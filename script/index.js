const allCategories = async () => {
  const petsData = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );

  const responseData = await petsData.json();
  showCategories(responseData.categories);
  document.getElementById("status").style.display = "none";
  document.getElementById("petsContainer").style.display = "grid";
};

const showCategories = (categories) => {
  const categoryBtns = document.getElementById("category-btns");

  for (let category of categories) {
    // console.log(category);
    const catDiv = document.createElement("div");
    catDiv.innerHTML = `
                   <button onclick="petsLoad('${category.category}')" class="flex btn hover:bg-[#0E7A81] hover:text-white">
        <img src="${category.category_icon}" alt="${category.category}" width="30" height="30" />
        ${category.category}
      </button>
                  
  `;
    categoryBtns.append(catDiv);
  }
};

const petsLoad = async (categoriesName) => {
  document.getElementById("status").style.display = "none";
  document.getElementById("petsContainer").style.display = "grid";
  show("spinner");

  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoriesName}
    `
  );
  const data = await response.json();
  if (data.data) {
    displayPets(data.data);
    makeHide("spinner");
  }
};

const displayPets = (pets) => {
  if (pets.length < 1) {
    document.getElementById("petsContainer").style.display = "none";
    document.getElementById("status").style.display = "flex";
  }

  const petsContainer = document.getElementById("petsContainer");
  petsContainer.innerHTML = "";
  pets.forEach((pet) => {
    const newDiv = document.createElement("div");
    console.log(newDiv);
    newDiv.innerHTML = ` 
                  <div class="w-11/12 mx-auto card flex-1">
  <figure>
    <img class="pt-4"
      src=${pet.image}
      alt="petImg" />
  </figure>
  <div class="py-3 px-5">
    <h2 class="card-title">${pet.breed}</h2>
    <p>${pet.pet_details}</p>
    <div class="card-actions justify-end">
      <button class="btn buy-now-btn bg-[#0E7A81] text-white">Status</button>
    </div>
  </div>
</div>
    `;
    petsContainer.append(newDiv);
  });
  const allSelectBtn = document.getElementsByClassName("buy-now-btn");
  for (let btn of allSelectBtn) {
    btn.addEventListener("click", (event) => {
      const title = event.target.parentNode.parentNode.childNodes[1].innerText;

      const listContainer = document.getElementById("selected-container");
      const newDiv = document.createElement("div");
      // newDiv.classList.add("flex");
      newDiv.innerHTML = `
                    
                    <h1>${title}</h1>
                    <button class="btn bg-[#0E7A81] text-white">Available</button>
      `;
      listContainer.append(newDiv);
    });
  }
};

const makeHide = (id) => {
  document.getElementById("spinner").style.display = "none";
};
const show = (id) => {
  document.getElementById("spinner").style.display = "block";
};

petsLoad("cat");

allCategories();
