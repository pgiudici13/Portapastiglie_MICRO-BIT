---
name: microbit-main-report-web-designer
description: Analizza il file main.ts di un progetto Micro:bit e genera un report tecnico dettagliato con mappatura logica, flusso eventi, I/O hardware e rischi. Include anche un briefing operativo specifico per il sub-agente web-designer-spaziale. Use when the user asks to explain what main.ts does, requests a detailed Micro:bit behavior report, or asks to brief web-designer-spaziale on system function.
---

# Microbit Main Report + Web Designer Brief

## Obiettivo
Produrre un report dettagliato su `main.ts` (Micro:bit) e un briefing chiaro per il sub-agente `web-designer-spaziale`, spiegando esattamente la funzione del sistema nel mondo reale.

## Input richiesto
- File target: `main.ts` nella root del workspace (o path indicato dall'utente).
- Contesto eventuale del progetto (nome dispositivo, uso pratico, pubblico target).

## Workflow
1. Leggi integralmente `main.ts`.
2. Identifica e descrivi:
   - Variabili globali e stato condiviso.
   - Funzioni custom e relativi effetti collaterali.
   - Event handlers (`pins.onPulsed`, `basic.forever`, seriale, input digitali).
   - Mappa dei codici/valori in ingresso e comportamento risultante.
   - Uscite hardware (servo, NeoPixel, audio, display LED).
3. Ricostruisci il flusso end-to-end:
   - Da input seriale/pin a output visivi/sonori/meccanici.
   - Stato di reset/spegnimento e condizioni di errore/fallback.
4. Evidenzia rischi o punti deboli:
   - Off-by-one sugli indici LED.
   - Lettura seriale e robustezza.
   - Reazioni a codici non validi.
5. Scrivi il report con il formato obbligatorio sotto.
6. Aggiungi un briefing finale per `web-designer-spaziale` con indicazioni narrative e UX concrete.

## Formato output obbligatorio

### 1) Riassunto rapido
- 4-8 bullet che spiegano cosa fa il firmware in pratica.

### 2) Architettura logica
- Elenco di funzioni/eventi principali.
- Ruolo di ogni blocco (input, logica, output).

### 3) Mappa comportamento per codice
- Tabella o elenco strutturato:
  - `1..7`
  - `8..14`
  - `15..21`
  - `22..28`
  - `29`
  - fallback/errore

### 4) Flusso operativo passo-passo
- Sequenza temporale: ricezione dato -> decisione -> attuazione -> reset/stato successivo.

### 5) Rischi e miglioramenti
- Bug possibili, edge case, miglioramenti pratici suggeriti.

### 6) Brief per web-designer-spaziale (obbligatorio)
- Sezione intitolata `Brief per web-designer-spaziale`.
- Deve includere:
  - **Missione del dispositivo**: cosa risolve e per chi.
  - **Momento d'uso**: come viene usato nella realta.
  - **Segnali chiave da rappresentare nel sito**: allarme sonoro, LED rossi per posizione, servo di attuazione, reset.
  - **Gerarchia contenuti landing**: Hero, problema, funzionamento a step, componenti hardware, demo stati, CTA.
  - **Tone of voice**: professionale, affidabile, immediato.
  - **Vincoli di accuratezza**: non inventare feature assenti dal firmware.

## Regole di qualita
- Non inventare API o pin non presenti nel file.
- Cita sempre i simboli reali (`INFERMIERA`, `LED_ATTENZIONE`, `basic.forever`, ecc.).
- Se un comportamento e ambiguo, dichiaralo come assunzione.
- Mantieni linguaggio chiaro e concreto, adatto anche a principianti tecnici.

## Applicazione specifica a questo progetto (quando il file coincide)
Se `main.ts` contiene logica con:
- seriale su `P2/P0` a `9600`,
- 4 strip NeoPixel su `P13..P16`,
- servo su `P1`,
- allarme audio e LED di attenzione,
allora specifica che il sistema agisce come pannello di segnalazione posizioni con escalation visiva/sonora e comando di reset via impulso su `P2`.
