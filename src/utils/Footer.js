import footerTemplate from "../templates/footer.hbs";
import "../styles/footer.css";
const footerData = {};

const footerHtml = footerTemplate(footerData);
document.querySelector("body").innerHTML += footerHtml; // Добавить footer в конец body
