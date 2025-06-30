# Task Manager Avanzato

Sei stato assunto per costruire un **Task Manager Avanzato**, un’app web che permette agli utenti di creare, modificare, organizzare ed eliminare task in modo intuitivo ed efficiente.

L'app dovrà supportare:

- filtri avanzati
- ricerca ottimizzata
- ordinamento
- conferme di azione con modali
- prestazioni ottimizzate e fluide

---

## 📌 Milestone 1 - Setup e Routing

- Clonare e avviare il backend:

  - Utilizzeremo un backend già pronto.
  - Clonare il repository:
  [https://github.com/boolean-it/react-task-manager-back]
  - Avviare il server:

    ```bash
    npm install
    npm run start
    ```

    Dopo qualche secondo, apparirà nel terminale:

    ```
    ✅ Server in ascolto su http://localhost:3001
    ```

    Questo URL servirà per configurare il frontend.

- Impostare il frontend:
  - Creare il progetto con Vite
  - Installare `react-router-dom`
  - Configurare il router principale in `App.jsx` con `BrowserRouter`

- Definire due pagine principali:
  - **TaskList.jsx** → elenco dei task
  - **AddTask.jsx** → form per aggiungere un nuovo task

- Aggiungere una barra di navigazione con `NavLink` per muoversi tra le pagine

- Definire le rotte con `Routes` e `Route`, associando ogni percorso alla pagina corretta

---

## 📌 Milestone 2 - Setup Context API e Fetch Iniziale

- Creare un contesto globale per la gestione dei dati
- Salvare l'URL dell'API nel file `.env` del frontend
- Creare un `GlobalContext`
  - Definire `useState` per la lista dei task
  - Recuperare i dati con una richiesta GET `/tasks` in `useEffect`
  - Stampare in console per verifica
  - Avvolgere l’applicazione con `GlobalContext.Provider` in `App.jsx`

---

## 📌 Milestone 3 - Lista dei Task (Pagina)

- Mostrare la lista dei task in una tabella
- Recuperare i task dal `GlobalContext`
- Strutturare la tabella con intestazioni: Nome, Stato, Data di Creazione
- Creare `TaskRow.jsx` per una riga della tabella (title, status, createdAt)
- Assegnare colori allo stato:
  - To do → rosso
  - Doing → giallo
  - Done → verde
- Usare `React.memo()` su `TaskRow` per ottimizzare

---

## 📌 Milestone 4 - Custom Hook `useTasks()` (GET)

- Creare `useTasks()` per centralizzare la gestione dei task
  - Recupera i task con GET `/tasks`
  - Memorizza in uno `useState`
  - Definire funzioni `addTask`, `removeTask`, `updateTask` (inizialmente vuote)
  - Esportare queste funzioni e la lista dei task
- Integrare `useTasks()` nel `GlobalContext`

---

## 📌 Milestone 5 - Form per Aggiungere un Task

- In `AddTask.jsx`:
  - Input controllato per `title`
  - Textarea non controllata per `description` (con `useRef`)
  - Select non controllata per `status` con default "To do"
- Validazioni:
  - `title` non vuoto
  - `title` senza simboli speciali (`const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";`)
  - Messaggi di errore in caso di input sbagliato
- Alla pressione di "Aggiungi Task", stampare l’oggetto task in console (senza inviarlo ancora all’API)

---

## 📌 Milestone 6 - Aggiungere un Task con API (POST)

- Completare `addTask` in `useTasks()`
  - Riceve `title`, `description`, `status`
  - POST `/tasks` con body JSON
  - Se `success: true`, aggiornare lo stato
  - Se `success: false`, lanciare errore con `message`
- Gestire submit di `AddTask`:
  - Chiamare `addTask`
  - Se OK → alert di conferma + reset form
  - Se errore → alert con messaggio

---

## 📌 Milestone 7 - Pagina Dettaglio Task

- Rendere il `title` cliccabile in `TaskRow` → link a `/task/:id`
- Aggiungere la rotta `/task/:id` in `App.jsx`
- Creare `TaskDetail.jsx` con:
  - Nome
  - Descrizione
  - Stato
  - Data creazione
  - Pulsante "Elimina Task" (stampa in console per ora)

---

## 📌 Milestone 8 - Eliminazione Task (DELETE)

- Completare `removeTask` in `useTasks()`
  - DELETE `/tasks/:id`
  - Se `success: true`, rimuovere dallo stato
  - Se `success: false`, lanciare errore
- In `TaskDetail.jsx` gestire click su "Elimina Task":
  - Se confermato, mostrare alert + redirect
  - In caso di errore, mostrare alert con messaggio

---

## 📌 Milestone 9 - Modal di Conferma Eliminazione

- Creare `Modal.jsx`:
  - Props: `title`, `content`, `show`, `onClose`, `onConfirm`, `confirmText`
  - Usare `ReactDOM.createPortal`
  - Pulsanti: Annulla / Conferma
- Integrare `Modal` in `TaskDetail` per confermare l'eliminazione

---

## 📌 Milestone 10 - Modifica Task (PUT)

- Completare `updateTask` in `useTasks()`
  - PUT `/tasks/:id` con dati aggiornati
  - Se `success: true`, aggiornare stato
  - Se `success: false`, lanciare errore
- Creare `EditTaskModal.jsx`:
  - Props: `show`, `onClose`, `task`, `onSave`
  - Usa `Modal`
  - Include un form con input controllati
  - Usare `useRef` per chiamare `editFormRef.current.requestSubmit()`
- Integrare `EditTaskModal` in `TaskDetail` con pulsante "Modifica Task"
  - Alla conferma, chiamare `updateTask`
  - Mostrare alert di successo o di errore

---

## 📌 Milestone 11 - Ordinamento Task

- In `TaskList.jsx`:
  - State `sortBy` (default `createdAt`)
  - State `sortOrder` (default `1`)
- Modificare intestazioni della tabella per ordinare:
  - Se clicchi stessa colonna → inverti ordine
  - Se clicchi nuova colonna → resetta ordine
- Ordinare i task con `useMemo()`
  - `title`: alfabetico
  - `status`: To do < Doing < Done
  - `createdAt`: timestamp
  - Applicare `sortOrder`

---

## 📌 Milestone 12 - Ricerca con Debounce

- Aggiungere un input di ricerca in `TaskList.jsx`
  - Stato `searchQuery`
- Modificare `useMemo()` per filtrare + ordinare
  - Ricerca case-insensitive
- Implementare debounce con `setTimeout` + `useCallback`
  - Input non controllato (per far funzionare il debounce)

---

## 🎯 BONUS 1 - Selezione ed Eliminazione Multipla

- In `TaskRow`: aggiungere checkbox con `checked` e `onToggle`
- In `TaskList`:
  - State `selectedTaskIds`
  - Funzione `toggleSelection`
- Mostrare bottone "Elimina Selezionate" se `selectedTaskIds.length > 0`
- Completare `removeMultipleTasks` in `useTasks.js`:
  - Riceve array di ID
  - DELETE paralleli con `Promise.allSettled()`
  - In caso di errori, mostrare ID falliti
- Gestire conferma in `TaskList` con alert

---

## 🎯 BONUS 2 - Funzionalità Extra

- Formattazione date con **dayjs** (DD/MM/YYYY)
  - Installare: `npm install dayjs`
  - Usare in `TaskRow` e `TaskDetail`
- Controllare nomi duplicati in `addTask` e `updateTask`
- Sostituire `useState` con `useReducer`:
  - Creare `tasksReducer.js`
  - Definire azioni (`LOAD_TASKS`, `ADD_TASK`, `REMOVE_TASK`, ecc.)
  - Aggiornare tutte le funzioni per usare il reducer

---

Se vuoi posso anche suddividerlo in più file `.md` oppure creare una struttura di cartelle già pronta — dimmi pure!
# ex-react-task-manager
