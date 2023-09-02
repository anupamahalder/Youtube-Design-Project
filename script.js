const handleCategory = async() =>{
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    //get the tab container
    const tabContainer = document.getElementById('tab-container');
    const actualData = data.data;
    //loop through the category and create element
    actualData.forEach((category_item) => {
        //create a div for each category
        // console.log(category_item);
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab" onclick="handleLoadCategories('${category_item.category_id}')">
            <button class="py-2 px-3 text-gray-700 rounded-md bg-gray-300 hover:bg-red-600 hover:text-white">${category_item.category}</button>
        </a> 
        `;
        tabContainer.appendChild(div);
    });
}
const handleLoadCategories = async(categoryId)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    // console.log(data.data);
    //get the card container
    const cardContainer = document.getElementById('card-container');
    //clear the div
    cardContainer.innerHTML = '';
    data.data?.forEach((video)=>{
        console.log(video);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="w-72 bg-base-100 mx-auto">
            <div class="h-44 py-4">
                <img class="h-full w-full object-cover rounded-md" src=${video?.thumbnail} alt="thumbnail" />
            </div>
            <div class="flex gap-2 text-center">
                <div class="avatar">
                    <div class="w-10 rounded-full">
                    <img src=${video?.authors[0]?.profile_picture} />
                    </div>
                </div>
                <div>
                    <h1 class="text-center font-bold">${video?.title}</h1>
                </div>
            </div>
            <div class="pl-12 text-gray-500 text-xs">
                <p class="pb-1">${video?.authors[0]?.profile_name}</p>
                <p>${video?.others?.views} views</p>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
}

handleCategory();
// handleLoadCategories("1000");