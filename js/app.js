// const URL = "https://fakestoreapi.com/products";

// let data = await fetch(URL);
// data = await data.json();
// console.log(data);
// CreatList(data);

// function CreatList(data){
// cardPlace.innerHTML = data.map(item => `
//         <div class="p-2 ">
//             <div class="card text-center shadow">
//             <img src="${item.image}" class="rounded mx-auto d-block p-4" style="width: 10rem; height: 10rem" alt="...">
//             <div class="card-body">
//                 <h5 class="card-title count-title">${item.title}</h5>
//                 <p class="card-text count-row">${item.description}</p>
//                 <p class="card-text float-end"><b>$ ${item.price}</b></p>
            
//             </div>
//         </div>
// </div>`).join('');
// }

// let sortUpBtn = document.querySelector('#sort-up');
// let sortDownBtn = document.querySelector('#sort-down');
// let sort = null; //true - UP, false - DOWN

// sortUpBtn.addEventListener('click', function () {
//     sort = true;
//     Sort(data);
//     CreatList(Sort(data));
// });

// sortDownBtn.addEventListener('click', function () {
//     sort = false;
//     Sort(data);
//     CreatList(Sort(data));
// });


// function Sort(Array) {
//     let sorted;
//             if (sort) {
//                 sorted =  Array.sort((a, b) => a.price - b.price);
//             } else {
//                sorted =  Array.sort((a, b) => b.price - a.price); //сортировка по убыванию
//             }
//     return sorted;
// }



const URL = 'https://fakestoreapi.com/products';
    
let MODEL = {
            rates: [],
            search: '',
            sort: null, //true - UP, false - DOWN
            // renderList() START
            renderList: function () { 
                let s = this.search.trim().toLowerCase();
                let resultList = this.rates.filter(function (item) {
                    let txt = item.txt.toLowerCase();
                    return txt.includes(s);
                });

                if (this.sort != null) {
                    if (this.sort) {
                        resultList.sort((a, b) => a.price - b.price);
                    } else {
                        resultList.sort((a, b) => b.price - a.price); //сортировка по убыванию
                    }
                }
                let cardbody = document.getElementById('cardPlace');
                cardbody.innerHTML = resultList.map(item => `
                    <div class="p-2 ">
                        <div class="card text-center shadow">
                        <img src="${item.image}" class="rounded mx-auto d-block p-4" style="width: 10rem; height: 10rem" alt="...">
                            <div class="card-body">
                                <h5 class="card-title count-title">${item.title}</h5>
                                <p class="card-text count-row">${item.description}</p>
                                <p class="card-text float-end"><b>$ ${item.price}</b></p>
                            
                            </div>
                        </div>
                    </div>`).join(''); // END referenceList() METHOD
            }
} // END MODEL

/* LOAD DATA*/ 
let rates = await fetch(URL);
MODEL.rates = await rates.json(); // добавили полученные данные в наш объект
MODEL.renderList();
/* LOAD DATA END*/

//SEARCH
let searchInput = document.querySelector('#search');
searchInput.addEventListener('input', function () {
    MODEL.search = searchInput.value;
    MODEL.renderList();
});
//SEARCH END

// Обработчик radiobtn для сортировки
let sortUpBtn = document.querySelector('#sort-up');
let sortDownBtn = document.querySelector('#sort-down');

sortUpBtn.addEventListener('click', function () {
    MODEL.sort = true;
    MODEL.renderList();
});

sortDownBtn.addEventListener('click', function () {
    MODEL.sort = false;
    MODEL.renderList();
});