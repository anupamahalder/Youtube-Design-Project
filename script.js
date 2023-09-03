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
            <button class="p-2 text-gray-700 rounded-md bg-gray-300 hover:bg-red-600 hover:text-white">${category_item.category}</button>
        </a> 
        `;
        tabContainer.appendChild(div);
    });
}
const handleLoadCategories = async(categoryId)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    // console.log(data);
    //get the card container
    const cardContainer = document.getElementById('card-container');
    //get the data not found div
    const noDataContainer = document.getElementById('no-data-div');
    //clear the div
    cardContainer.innerHTML = '';
    if(data.status == false){
        const div = document.createElement('div');
        div.innerHTML=`
            <div class="w-full h-full flex justify-center text-center mx-auto">
                <div class="w-full">
                    <div class="w-full my-6 justify-center">
                        <img class="mx-auto" src="./images/Icon.png" alt="data not found!">
                    </div>
                    <div class="py-5 w-60 border border-red-500 mx-auto">
                        <h1 class="p-5">Oops!! Sorry, There is no content here</h1>
                    </div>
                </div>
            </div>
        `;
        noDataContainer.appendChild(div);
        return;
    }
    noDataContainer.innerHTML = "";
    data.data?.forEach((video)=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="w-72 bg-base-100 mx-auto py-3">
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
                    <h1 class="text-center pt-1 font-bold">${video?.title}</h1>
                </div>
            </div>
            <div class="pl-12 pt-1 text-gray-500 text-xs">
                <div class="flex gap-1 pb-1">
                    <div><p>${video?.authors[0]?.profile_name}</p></div>
                    <div><img src=${video.authors[0].verified?"./images/verified.png":"."} alt=""></div>
                </div> 
                <p>${video?.others?.views}</p>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
}

handleCategory();
// handleLoadCategories("1000");