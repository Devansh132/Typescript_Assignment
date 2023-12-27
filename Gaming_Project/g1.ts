// Enum 
enum PubgRank {
  Bronze = "Bronze",
  Silver = "Silver",
  Gold = "Gold",
  Platinum = "Platinum",
  Diamond = "Diamond",
}

// Interface for form data
interface FormData {
  name: string;
  email: string;
  message: string;
  PubgRank: PubgRank;
  CodRank: number;
  VelorantRank: string;
}

// Function to submit form data
function submitForm(data: FormData): void {
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
    alert("Fill the form please..:" + error.message);
    hideLoader();
  }
}

// Function to show loader
function showLoader(): void {
  const loaderElement = document.createElement("div");
  loaderElement.id = "loader";

  const loadingText = document.createElement("p");
  loadingText.innerText = "Loading...";
  loadingText.classList.add("loader-text");

  loaderElement.appendChild(loadingText);

  loaderElement.classList.add("loader-container");

  document.body.appendChild(loaderElement);
}

function hideLoader(): void {
  const loaderElement = document.getElementById("loader");
  if (loaderElement) {
    loaderElement.remove();
  }
}

// Generic class for data storage
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T): void {
    try {
      this.data.push(item);
    } catch (error) {
      console.error("Error adding item to storage:", error);
    }
  }

  getItemById(id: number): T | undefined {
    try {
      return this.data.find((item) => (item as any).id === id);
    } catch (error) {
      console.error("Error retrieving item from storage:", error);
      return undefined;
    }
  }

  getAllItems(): T[] {
    try {
      return [...this.data];  // create a shallow copy
    } catch (error) {
      console.error("Error retrieving all items from storage:", error);
      return [];
    }
  }
}

const userStorage = new DataStorage<Partial<FormData>>();

function displayGameCard(user: FormData): void {
  const gameCardContentElement = document.getElementById("game-card-content");
  if (gameCardContentElement) {
    gameCardContentElement.classList.remove("hidden");
  }
  const gameCardElement = document.getElementById("game-card-x");
  if (user && gameCardElement) {
    gameCardElement.innerHTML = `<h3>${user.name}'s Game Card</h3>
            <p>Email: ${user.email}</p>
            <p>Message: ${user.message}</p>
            <p>Pubg Rank: ${user.PubgRank}</p>
            <p>Cod Rank: ${user.CodRank}</p>
            <p>Velorant Rank: ${user.VelorantRank}</p>`;
  }
}

// validate form data
function validateForm(formData: FormData): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!formData.name || !formData.email || !formData.message) {
      reject(new Error("Please fill in all required fields."));
    } else {
      resolve();
    }
  });
}

const form = document.getElementById("myForm");
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const citizenshipInput = (document.getElementById("citizenshipInput") as HTMLInputElement).value.toLowerCase();

      if (citizenshipInput === "yes" || citizenshipInput === "no") {
        const formData: FormData = {
          name: (document.getElementById("name") as HTMLInputElement).value,
          email: (document.getElementById("email") as HTMLInputElement).value,
          message: (document.getElementById("message") as HTMLInputElement).value,
          PubgRank: (document.getElementById("PubgRank") as HTMLInputElement).value as PubgRank,
          CodRank: parseInt((document.getElementById("CodRank") as HTMLInputElement).value, 10),
          VelorantRank: (document.getElementById("VelorantRank") as HTMLInputElement).value,
        };

        await validateForm(formData);
        submitForm(formData);
      } else {
        alert("Please type 'yes' or 'no' for citizenship.");
      }
    } catch (error) {
      alert("Fill the form" + error.message);
    }
  });
}
