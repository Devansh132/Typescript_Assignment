// Enum 
var PubgRank;
(function (PubgRank) {
    PubgRank["Bronze"] = "Bronze";
    PubgRank["Silver"] = "Silver";
    PubgRank["Gold"] = "Gold";
    PubgRank["Platinum"] = "Platinum";
    PubgRank["Diamond"] = "Diamond";
})(PubgRank || (PubgRank = {}));

// Function to submit form data
function submitForm(data) {
    try {
        console.log("Form submitted:", data);
        userStorage.addItem(data);

        showLoader(); // Show loader before processing form data

        setTimeout(() => {
            const gameCardElement = document.getElementById("game-card-x");
            if (gameCardElement) {
                gameCardElement.innerHTML = `
                    <h3>${data.name}'s Game Card</h3>
                    <p>Email: ${data.email}</p>
                    <p>Message: ${data.message}</p>
                    <p>Pubg Rank: ${data.PubgRank}</p>
                    <p>Cod Rank: ${data.CodRank}</p>
                    <p>Velorant Rank: ${data.VelorantRank}</p>
                `;

                hideLoader(); // Hide loader after processing form data

                const gameCardContentElement = document.getElementById("game-card-content");
                if (gameCardContentElement) {
                    gameCardContentElement.classList.remove("hidden");
                }
            }
        }, 2000); 
    } catch (error) {
        alert("Fill the form please..:", error);
        hideLoader(); 
    }
}

// Function to show loader
function showLoader() {
    const loaderElement = document.createElement("div");
    loaderElement.id = "loader";

    const loadingText = document.createElement("p");
    loadingText.innerText = "Loading...";
    loadingText.classList.add("loader-text"); 

    loaderElement.appendChild(loadingText);

    loaderElement.classList.add("loader-container"); 

    document.body.appendChild(loaderElement);
}



function hideLoader() {
    const loaderElement = document.getElementById("loader");
    if (loaderElement) {
        loaderElement.remove();
    }
}


// Generic class for data storage
class DataStorage {
    constructor() {
        this.data = [];
    }

    addItem(item) {
        try {
            this.data.push(item);
        } catch (error) {
            console.error("Error adding item to storage:", error);
        }
    }

    getItemById(id) {
        try {
            return this.data.find(item => item.id === id);
        } catch (error) {
            console.error("Error retrieving item from storage:", error);
            return undefined;
        }
    }

    getAllItems() {
        try {
            return [...this.data];
        } catch (error) {
            console.error("Error retrieving all items from storage:", error);
            return [];
        }
    }
}
var userStorage = new DataStorage();

function displayGameCard(user) {
    const gameCardContentElement = document.getElementById("game-card-content");
    if (gameCardContentElement) {
        gameCardContentElement.classList.remove("hidden");
    }
    const gameCardElement = document.getElementById("game-card-x");
    if (user && gameCardElement) {
        gameCardElement.innerHTML =
            `<h3>${user.name}'s Game Card</h3>
            <p>Email: ${user.email}</p>
            <p>Message: ${user.message}</p>
            <p>Pubg Rank: ${user.ranks.PubgRank}</p>
            <p>Cod Rank: ${user.ranks.CodRank}</p>
            <p>Velorant Rank: ${user.ranks.VelorantRank}</p>`;
    }
}

// validate form data
function validateForm(formData) {
    return new Promise((resolve, reject) => {
        if (!formData.name || !formData.email || !formData.message) {
            reject(new Error("Please fill in all required fields."));
        } else {
            resolve();
        }
    });
}


var form = document.getElementById("myForm");
if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            const citizenshipInput = document.getElementById("citizenshipInput").value.toLowerCase();

            if (citizenshipInput === 'yes' || citizenshipInput === 'no') {
                const formData = {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    message: document.getElementById("message").value,
                    PubgRank: document.getElementById("PubgRank").value,
                    CodRank: parseInt(document.getElementById("CodRank").value, 10),
                    VelorantRank: document.getElementById("VelorantRank").value,
                    citizenship: citizenshipInput === 'yes',
                };

                await validateForm(formData);
                submitForm(formData);
            } else {
                alert("Please type 'yes' or 'no' for citizenship.");
            }
        } catch (error) {
            alert("Fill the form", error);
        }
    });
}

