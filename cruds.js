var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var updateButton = document.getElementById(" updateButton");
var warningName = document.getElementById("warningName");
var warningPrice = document.getElementById("warningPrice");
var warningCategory = document.getElementById("warningCategory");
var warningDesc = document.getElementById("warningDesc");



// localStorage Old Data *************************** /

var productContainer;

if (localStorage.getItem("productList") == null) {

    productContainer = [];
}

else {

    productContainer = JSON.parse(localStorage.getItem("productList"));
    displayProducts();
};

// Add Product ************************************** /

function addProduct() {


    if (checkInputs() == true) {

        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            categroy: productCategoryInput.value,
            desc: productDescInput.value
        }
        productContainer.push(product);
        localStorage.setItem("productList", JSON.stringify(productContainer));
        document.getElementById("updateButton").innerHTML = 'Add Product';
        displayProducts();
        clearForm();
        stopWarningMessage();



    }
    else {
        WarningMessage();

    }
};

// clear Form *************************************** /

function clearForm() {

    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
};

//  View In Table *********************************** /

function displayProducts() {
    var cartona = ``;

    for (var i = 0; i < productContainer.length; i++) {
        cartona += `
        <tr>
        <td> ${i + 1}</td>
        <td> ${productContainer[i].name} </td>
        <td> ${productContainer[i].price} </td>
        <td> ${productContainer[i].categroy} </td>
        <td> ${productContainer[i].desc} </td>
        <td><button onclick="updateProduct(${i})" class=" btn btn-outline-warning ">Update </button>  </td>
        <td><button onclick="deleteProduct (${i})" class=" btn btn-outline-danger ">Delete </button>  </td>
         </tr>        
        `
    }
    document.getElementById("tableBody").innerHTML = cartona;
};

//  Chick Input ************************************* /

function checkInputs() {

    var regexName = /^[A-Z][a-z]{3,8}$/;
    var regexNumber = /^[1-9][0-9]{1,9}$/;
    var regexCategory = /^[A-Z][a-z]{1,8}$/;
    var regexDesc = /^[A-Z][a-z]{1,200}$/;


    if (regexName.test(productNameInput.value) == true && regexNumber.test(productPriceInput.value) == true
        && regexCategory.test(productCategoryInput.value) == true && regexDesc.test(productDescInput.value) == true) {

        return true;
    }
    else {


        return false;
    }
};

// Delete Item ************************************** /

function deleteProduct(index) {

    productContainer.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productContainer));
    displayProducts();


};

// search Product *********************************** /

function searchProduct(searchTerm) {

    var cartona = ``;

    for (var i = 0; i < productContainer.length; i++)
        if (productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true || productContainer[i].categroy.toLowerCase().includes(searchTerm.toLowerCase()) == true) {

            cartona += `
        <tr>
        <td> ${i + 1}</td>
        <td> ${productContainer[i].name} </td>
        <td> ${productContainer[i].price} </td>
        <td> ${productContainer[i].categroy} </td>
        <td> ${productContainer[i].desc} </td>
        <td><button onclick="updateProduct(`+ i + `)" class=" btn btn-outline-warning ">Update </button>  </td>
        <td><button onclick="deleteProduct (`+ i + `)" class=" btn btn-outline-danger ">Delete </button>  </td> </tr>`;

        }
       
    document.getElementById("tableBody").innerHTML = cartona;

};

// update Item ************************************** /

function updateProduct(index) {

    productNameInput.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].categroy;
    productDescInput.value = productContainer[index].desc;
    deleteProduct(index);
    document.getElementById("updateButton").innerHTML = 'Update';

};

// Warning Message ********************************** /

function WarningMessage() {

    var warningMessage = `<div class="bg-danger text-white m-auto my-3 w-75 text-center " >
    Sorry,Everyone Must Be Filled.
   </div>`

    document.getElementById(`warning`).innerHTML = warningMessage;

};

// Stop Warning Message ***************************** /

function stopWarningMessage() {

    document.getElementById(`warning`).innerHTML = ""

};

// Validation *************************************** /

function validName() {

    var regex = /^[A-Z][a-z ]{3,8}$/;
    if (regex.test(productNameInput.value) == true) {

        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        warningName.classList.add("d-none");

    }
    else {
        productNameInput.classList.add("is-invalid");
        warningName.classList.remove("d-none");

    }
};
productNameInput.addEventListener("keyup", validName);

function validPrice() {

    var regex = /^[1-9][0-9]{1,9}$/;
    if (regex.test(productPriceInput.value) == true) {

        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        warningPrice.classList.add("d-none");

    }
    else {
        productPriceInput.classList.add("is-invalid");
        warningPrice.classList.remove("d-none");

    }
};
productPriceInput.addEventListener("keyup", validPrice);

function validCategory() {

    var regex = /^[A-Z][a-z .]{1,8}$/;
    if (regex.test(productCategoryInput.value) == true) {

        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");
        warningCategory.classList.add("d-none");

    }
    else {
        productCategoryInput.classList.add("is-invalid");
        warningCategory.classList.remove("d-none");

    }
};
productCategoryInput.addEventListener("keyup", validCategory);

function validDesc() {

    var regex = /^[A-Z][a-z ]{1,200}$/;
    if (regex.test(productDescInput.value) == true) {

        productDescInput.classList.add("is-valid");
        productDescInput.classList.remove("is-invalid");
        warningDesc.classList.add("d-none");

    }
    else {
        productDescInput.classList.add("is-invalid");
        warningDesc.classList.remove("d-none");

    }
};
productDescInput.addEventListener("keyup", validDesc);