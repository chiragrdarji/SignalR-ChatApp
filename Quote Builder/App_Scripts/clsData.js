
//Customer Data Start //

var CustomerDataKey = 'clsuserdata';

function StoreCustomerdata(obj) {
    localStorage.setItem(CustomerDataKey, JSON.stringify(obj));
}

function RetrieveStoredCustomerdata() {

    if (typeof (Storage) != "undefined") {
        if (localStorage.getItem(CustomerDataKey) != null) {
            var retrievedObject = localStorage.getItem(CustomerDataKey);
            return JSON.parse(retrievedObject);
        }
    }
    return CustomerData;
}

function RemoveStoredCustomerdata() {
    if (typeof (Storage) != "undefined") {
        if (localStorage.getItem(CustomerDataKey) != null) {
            localStorage.removeItem(CustomerDataKey);
        }
    }
}

//Customer Data end //

//Modules Data Start//

var ModulesDataKey = 'modulesdata';

function StoreModulesData(obj) {
    localStorage.setItem(ModulesDataKey, JSON.stringify(obj));
}

function RetrieveStoredModulesData() {

    if (typeof (Storage) != "undefined") {
        if (localStorage.getItem(ModulesDataKey) != null) {
            var retrievedObject = localStorage.getItem(ModulesDataKey);
            return JSON.parse(retrievedObject);
        }
    }
    return listofModules;
}

function RemoveStoredModulesData() {
    if (typeof (Storage) != "undefined") {
        if (localStorage.getItem(ModulesDataKey) != null) {
            localStorage.removeItem(ModulesDataKey);
        }
    }
}

//Modules Data End//

// Add-ons Data Start //

var AddonsDataKey = 'addonsdata';

function StoreAddonsData(obj) {
    localStorage.setItem(AddonsDataKey, JSON.stringify(obj));
}

function RetrieveStoredAddonsData() {

    if (typeof (Storage) != "undefined") {
        if (localStorage.getItem(AddonsDataKey) != null) {
            var retrievedObject = localStorage.getItem(AddonsDataKey);
            return JSON.parse(retrievedObject);
        }
    }
    return listofAddOns;
}

function RemoveStoredAddonsData() {
    if (typeof (Storage) != "undefined") {
        if (localStorage.getItem(AddonsDataKey) != null) {
            localStorage.removeItem(AddonsDataKey);
        }
    }
}


// Add-ons Data End //



