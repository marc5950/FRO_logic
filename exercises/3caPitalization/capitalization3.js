let name = "PetEr";

// Løsning med substring
/* name = name.substring(0, 2).toLowerCase() 
+ name.substring(2, 3).toUpperCase() 
+ name.substring(3).toLowerCase(); */

// Alternativ med slice
name =
	name.slice(0, 2).toLowerCase() + // PetEr -> pe
	name[2].toUpperCase() + // PetEr -> T
	name.slice(3).toLowerCase(); // PetEr -> er

console.log(name);

let newName = "mARcus dAhl kuKuk lars wAGner";
//Første bogstav i hvert navn skal være stort

/* //Løsning med split, loop og join
let nameParts = newName.split(" "); // laver et array med alle navnene
// for loop til at gå igennem hvert navn i arrayet
// i er indexet i arrayet
// i < nameParts.length fordi loopet skal køre så mange gange som der er navne i arrayet
// nameParts[i] er hvert navn i arrayet
// hver del af navnet laves om til stort forbogstav + resten småt
for (let i = 0; i < nameParts.length; i++) {
	nameParts[i] = nameParts[i].slice(0, 1).toUpperCase() + nameParts[i].slice(1).toLowerCase();
}
newName = nameParts.join(" "); // laver arrayet om til en streng igen */

// Alternativ med split, map og join
newName = newName
	.split(" ")
	.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
	.join(" ");

console.log(newName);
