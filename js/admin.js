// js/admin.js
import { db, auth } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc, 
    orderBy, 
    query 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

let editingId = null;

// Vérifier l'authentification
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadDates();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const dateForm = document.getElementById('dateForm');
    const cancelBtn = document.getElementById('cancelBtn');

    // Soumettre le formulaire
    dateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const dateData = {
            date: document.getElementById('date').value,
            ville: document.getElementById('ville').value,
            pays: document.getElementById('pays').value,
            lieu: document.getElementById('lieu').value,
            soldOut: document.getElementById('soldOut').checked,
            timestamp: new Date()
        };

        try {
            if (editingId) {
                // Modifier une date existante
                await updateDoc(doc(db, 'dates', editingId), dateData);
                resetForm();
            } else {
                // Ajouter une nouvelle date
                await addDoc(collection(db, 'dates'), dateData);
            }
            
            dateForm.reset();
            loadDates();
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'enregistrement');
        }
    });

    // Annuler la modification
    cancelBtn.addEventListener('click', resetForm);
});

// Charger et afficher les dates
async function loadDates() {
    try {
        const q = query(collection(db, 'dates'), orderBy('date'));
        const querySnapshot = await getDocs(q);
        const datesList = document.getElementById('dates-list');
        
        datesList.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const date = doc.data();
            const dateElement = createDateElement(doc.id, date);
            datesList.appendChild(dateElement);
        });
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
    }
}

// Créer un élément de date
function createDateElement(id, date) {
    const div = document.createElement('div');
    div.className = 'date-item';
    
    const formattedDate = new Date(date.date).toLocaleDateString('fr-FR');
    
    div.innerHTML = `
        <div class="date-info">
            <div class="date-main">
                <span class="date-date">${formattedDate}</span>
                <span class="date-location">${date.ville}, ${date.pays}</span>
            </div>
            <div class="date-details">
                <span class="date-venue">${date.lieu}</span>
                ${date.soldOut ? '<span class="sold-out">SOLD OUT</span>' : ''}
            </div>
        </div>
        <div class="date-actions">
            <button onclick="editDate('${id}')" class="edit-btn">Modifier</button>
            <button onclick="deleteDate('${id}')" class="delete-btn">Supprimer</button>
        </div>
    `;
    
    return div;
}

// Modifier une date
window.editDate = async (id) => {
    try {
        const docSnap = await getDocs(collection(db, 'dates'));
        let dateData = null;
        
        docSnap.forEach((doc) => {
            if (doc.id === id) {
                dateData = doc.data();
            }
        });

        if (dateData) {
            document.getElementById('date').value = dateData.date;
            document.getElementById('ville').value = dateData.ville;
            document.getElementById('pays').value = dateData.pays;
            document.getElementById('lieu').value = dateData.lieu;
            document.getElementById('soldOut').checked = dateData.soldOut;
            
            editingId = id;
            document.getElementById('form-title').textContent = 'Modifier la date de concert';
            document.getElementById('submitBtn').textContent = 'Modifier';
            document.getElementById('cancelBtn').style.display = 'inline-block';
        }
    } catch (error) {
        console.error('Erreur lors de la modification:', error);
    }
};

// Supprimer une date
window.deleteDate = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette date ?')) {
        try {
            await deleteDoc(doc(db, 'dates', id));
            loadDates();
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            alert('Erreur lors de la suppression');
        }
    }
};

// Réinitialiser le formulaire
function resetForm() {
    editingId = null;
    document.getElementById('form-title').textContent = 'Ajouter une date de concert';
    document.getElementById('submitBtn').textContent = 'Ajouter';
    document.getElementById('cancelBtn').style.display = 'none';
    document.getElementById('dateForm').reset();
}
