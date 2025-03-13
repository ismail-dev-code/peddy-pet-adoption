const allCategories = async () => {
  const petsData = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );

  const responseData = await petsData.json();
  showCategories(responseData.categories);
  document.getElementById("status").style.display = "none";
  document.getElementById("petsContainer").style.display = "block";
  
};

const showCategories = (categories) => {
  const categoryBtns = document.getElementById("category-btns");

  for (let category of categories) {
    console.log(category);
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
  // console.log(categoriesName);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoriesName}
    `
  );
  const data = await response.json();
  displayPets(data.data);
};

const displayPets = (pets) => {
  if (pets.length < 1) {
    document.getElementById("petsContainer").style.display = "none";
    document.getElementById("status").style.display = "flex";
  }

  pets.forEach((pet) => {
    const petsContainer = document.getElementById("petsContainer");
    petsContainer.innerHTML = "";
    const newDiv = document.createElement("div");
    console.log(newDiv);
    newDiv.innerHTML = ` 
                  <div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img class="pt-4"
      src=${pet.image}
      alt="petImg" />
  </figure>
  <div class="py-3 px-5">
    <h2 class="card-title">${pet.breed}</h2>
    <p>${pet.pet_details}</p>
    <div class="card-actions justify-end">
      <button class="btn bg-[#0E7A81] text-white">Buy Now</button>
    </div>
  </div>
</div>
    `;
    petsContainer.append(newDiv);
  });
};

petsLoad("cat");

allCategories();
