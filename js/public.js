// js/public.js
import { db } from './firebase-config.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

// Charger les dates pour le public
async function loadPublicDates() {
    try {
        const q = query(collection(db, 'dates'), orderBy('date'));
        const querySnapshot = await getDocs(q);
        const datesList = document.getElementById('public-dates-list');
        
        if (!datesList) return;
        
        datesList.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const date = doc.data();
            const dateElement = createPublicDateElement(date);
            datesList.appendChild(dateElement);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des dates:', error);
    }
}

function createPublicDateElement(date) {
    const div = document.createElement('div');
    div.className = 'public-date-item';
    
    const formattedDate = new Date(date.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    div.innerHTML = `
        <div class="date-left">
            <div class="date-day">${formattedDate}</div>
            <div class="date-location">
                <strong>${date.ville}, ${date.pays}</strong>
                <span>${date.lieu}</span>
            </div>
        </div>
        <div class="date-right">
            ${date.soldOut ? 
                '<span class="sold-out-badge">SOLD OUT</span>' : 
                '<button class="ticket-btn">Billets</button>'
            }
        </div>
    `;
    
    return div;
}

// Charger les dates au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadPublicDates();
});
