import CinemaOperations from "./CinemaOperations";

if (customElements.get("cinema-operations")) {
    window.location.reload();
} else {
    customElements.define("cinema-operations", CinemaOperations);
}
