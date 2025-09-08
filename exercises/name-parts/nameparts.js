const name = "Marcus Dahl Kukuk Lars Wagner";
// Opdel navnet i tre dele: fornavn, mellemnavn og efternavn
// Brug slice og indexOf / lastIndexOf
// Antag at der altid er tre dele i navnet = 2 mellemrum
// indexOf og lastIndexOf bruges til at finde positionen af mellemrum
// indexOf(" ") = positionen af det første mellemrum
// lastIndexOf(" ") = positionen af det sidste mellemrum
// slice fra 0 til første mellemrum = fornavn
// slice fra første mellemrum + 1 til sidste mellemrum = mellemnavn
// slice fra sidste mellemrum + 1 til slutningen af strengen = efternavn
let firstName = name.slice(0, name.indexOf(" ")); // Første del af navnet
let middleName = name.slice(name.indexOf(" ") + 1, name.lastIndexOf(" ")); // Midterste del af navnet
let lastName = name.slice(name.lastIndexOf(" ") + 1); // Sidste del af navnet
console.log(firstName);
console.log(middleName);
console.log(lastName);
