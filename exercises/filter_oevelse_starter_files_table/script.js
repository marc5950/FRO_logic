const vehicles = [
	{ type: "Bus", fuel: "Diesel", passengers: 45, stops: ["Nørrebrogade", "Elmegade"] },
	{ type: "Bil", fuel: "Benzin", passengers: 4, ownedBy: "Klaus" },
	{ type: "Cykel", fuel: "Rugbrød", passengers: 0, ownedBy: "Jonas", isElectric: true },
	{ type: "Bil", passengers: 5, ownedBy: "Elon", isElectric: true },
	{ type: "MC", fuel: "Benzin", passengers: 2, ownedBy: "Fonda" },
	{ type: "Cykel", fuel: "Rugbrød", passengers: 2, ownedBy: "Vingegård", isTandem: true },
	{ type: "MC", fuel: "Benzin", passengers: 2, ownedBy: "Yolanda" },
	{ type: "Knallert", fuel: "Benzin", passengers: 1, ownedBy: "Børge" },
	{ type: "Knallert", fuel: "Benzin", passengers: 1, ownedBy: "Jonas" },
	{ type: "Løbehjul", passengers: 1, isElectric: true },
];

const electricVehicles = vehicles.filter((vehicle) => vehicle.isElectric === true);
const passengersOver2 = vehicles.filter((vehicle) => vehicle.passengers >= 2);
const vehiclesOwnedByJonas = vehicles.filter((vehicle) => vehicle.ownedBy === "Jonas");
const vehiclesFueledByRugbrodAndTandem = vehicles.filter((vehicle) => vehicle.fuel === "Rugbrød" && vehicle.isTandem === true);

const tbodyPointer = document.querySelector("tbody");
showTheseVehicles(vehicles);

const showAllButton = document.getElementById("showAll");
const isElectricButton = document.getElementById("isElectric");
const passengersOver2Button = document.getElementById("passengersOver2");
const ownedByJonasButton = document.getElementById("ownedByJonas");
const fuelRugbrodAndTandemButton = document.getElementById("fuelRugbrodAndTandem");

showAllButton.addEventListener("click", () => {
	tbodyPointer.innerHTML = "";
	showTheseVehicles(vehicles);
});
isElectricButton.addEventListener("click", () => {
	tbodyPointer.innerHTML = "";
	showTheseVehicles(electricVehicles);
});
passengersOver2Button.addEventListener("click", () => {
	tbodyPointer.innerHTML = "";
	showTheseVehicles(passengersOver2);
});
ownedByJonasButton.addEventListener("click", () => {
	tbodyPointer.innerHTML = "";
	showTheseVehicles(vehiclesOwnedByJonas);
});
fuelRugbrodAndTandemButton.addEventListener("click", () => {
	tbodyPointer.innerHTML = "";
	showTheseVehicles(vehiclesFueledByRugbrodAndTandem);
});

function showTheseVehicles(arr) {
	arr.forEach((each) => {
		if (!each.fuel) {
			each.fuel = "N/A";
		}
		if (!each.stops) {
			each.stops = "Ingen stop";
		}
		if (!each.ownedBy) {
			each.ownedBy = "Ingen ejer";
		}
		if (!each.isElectric) {
			each.isElectric = "Nej";
		} else {
			each.isElectric = "Ja";
		}
		if (!each.isTandem) {
			each.isTandem = "Nej";
		} else {
			each.isTandem = "Ja";
		}
		tbodyPointer.innerHTML += `<tr>
  <td>${each.type}</td>
  <td>${each.fuel}</td>
  <td>${each.passengers}</td> 
  <td>${each.stops}</td>
  <td>${each.ownedBy}</td>
  <td>${each.isElectric}</td>
  <td>${each.isTandem}</td>
</tr>`;
	});
}
