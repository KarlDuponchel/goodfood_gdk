export const convertDateToFr = (date: string) => {
    // Crée un objet Date à partir de la chaîne
    var dateObj = new Date(date);

    // Récupère le jour, le mois et l'année
    var day = String(dateObj.getDate()).padStart(2, '0'); // Ajoute un zéro si nécessaire
    var month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
    var year = dateObj.getFullYear();

    // Formate la date en JJ/MM/AAAA
    return day + '/' + month + '/' + year;
}