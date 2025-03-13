const allCategories = async () => {
  const petsData = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );

  const responseData = await petsData.json();
  showCategories(responseData.categories);
};

allCategories();

const showCategories = (categories) => {
  const categoryBtns = document.getElementById("category-btns");

  for (let category of categories) {
    console.log(category);
    const catDiv = document.createElement("div");
    catDiv.innerHTML = `
                   <button class="flex btn  hover:bg-[#0E7A81] hover:text-white">
        <img src="${category.category_icon}" alt="${category.category}" width="30" height="30" />
        ${category.category}
      </button>
                  
  `;
    categoryBtns.append(catDiv);
  }
};


