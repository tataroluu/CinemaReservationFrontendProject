import { LitElement, html, css } from "lit-element";

import "./cinema-operations";
import "./CinemaLitElement-admin";
import "./CinemaLitElement-opp";
import "./CinemaLitElement-shopping";

export default class CinemaOperations extends LitElement {
    /*    
    <cinema-lit-element-board></cinema-lit-element-board> 
    <cinema-lit-element-seat-status></cinema-lit-element-seat-status> 
    <cinema-lit-element></cinema-lit-element>   
    <cinema-operations></cinema-operations>
    <cinema-lit-element-shopping></cinema-lit-element-shopping>
    <cinema-lit-element-admin></cinema-lit-element-admin>  
    
    */

    render() {
        return html`   
        <cinema-lit-element-opp></cinema-lit-element-opp>
         `;
    }
}