const loadPhone = async(searchText='13',isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones,isShowAll);

}

const displayPhones = (phones,isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent ='';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    
    if(!isShowAll){
        phones = phones.slice(0,10);
    }

    

    phones.forEach(phone=>{
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;

        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            
            <div class="card-actions">
            <button onClick="handleShowDetail('${phone.slug}'); " class="btn btn-primary uppercase">Show Details</button>
            </div>
        </div>
        `;

        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}


const handleShowDetail = async(id)=>{
    

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);

    const data =  await res.json();
    const phone= data.data;
    
    showPhoneDetails(phone);
    
}

const showPhoneDetails = (phone) =>{
    console.log(phone);

    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML=`
    
    <img src="${phone.image}" />
    
    `




    show_details_modal.showModal()
}





const handleSearch = (isShowAll)=>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText,isShowAll); 
}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}


const handleShowAll = ()=>{
    handleSearch(true);
}











loadPhone();