// js/auth.js
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Vérifier si l'utilisateur est connecté
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Utilisateur connecté
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'admin.html';
        }
    } else {
        // Utilisateur non connecté
        if (window.location.pathname.includes('admin.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Formulaire de connexion
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                await signInWithEmailAndPassword(auth, email, password);
                window.location.href = 'admin.html';
            } catch (error) {
                errorMessage.textContent = 'Identifiants incorrects';
                console.error('Erreur de connexion:', error);
            }
        });
    }

    // Bouton de déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Erreur de déconnexion:', error);
            }
        });
    }
});
