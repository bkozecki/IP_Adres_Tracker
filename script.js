let userInput = document.getElementById("userInput");
const adress = document.getElementById("adress");
const userLocation = document.getElementById("location");
const timezone = document.getElementById("timezone"); // add offset value dynamically using the API
const isp = document.getElementById("isp");
const icon = document.querySelector(".icon");
const infoWrap = document.querySelector(".info_wrap");
const mapWrap = document.getElementById("map");

let map = L.map("map").setView([1, 0], 13);

// get ip location

async function myIp(input) {
  input = userInput.value;
  try {
    const data = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_xZ68jDbEpdJg11UtMdGPexZMbZGco&ipAddress=${input}`
    );
    const dataProcessed = await data.json();

    const { isp: userIsp, ip: userIP } = dataProcessed;
    const {
      city: userCity,
      country: userCountry,
      timezone: userTimezone,
    } = dataProcessed.location;

    const { lat, lng } = dataProcessed.location;
    let cords = [lat, lng];

    isp.textContent = userIsp;
    adress.textContent = userIP;
    userLocation.textContent = `${userCity}, ${userCountry}`;
    timezone.textContent = `UTC ${userTimezone}`;
    infoWrap.classList.add("info--active");

    // show map

    map = L.map("map").setView(cords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(cords).addTo(map).openPopup();
  } catch (error) {
    console.error(error);
    alert("Ups! Something went wrong, please reload try again!");
  }
}

icon.addEventListener("click", () => {
  map.remove();
  myIp();
});
userInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  map.remove();
  myIp();
});
