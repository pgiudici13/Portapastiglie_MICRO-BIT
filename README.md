# PortaPastiglie Micro:bit - Firmware `main.ts`

Progetto Micro:bit per un porta-pastiglie con segnalazione visiva/sonora e attivazione meccanica.
Il timing arriva da un controller esterno (Arduino), che invia codici al Micro:bit via seriale.

## Cosa fa il programma (stato attuale)

- Legge dati seriali dentro `basic.forever` usando `serial.readBuffer(0)`.
- In base al codice, accende in rosso il LED corrispondente su una delle 4 strip NeoPixel.
- Attiva una routine di allarme (`INFERMIERA()`):
  - aumenta un contatore interno;
  - avvia una melodia in loop in background;
  - porta il servo su `180°`.
- Attiva un LED di attenzione (`LED_ATTENZIONE()`).
- Se riceve il codice `29`, mostra l'effetto arcobaleno su tutte le strip.
- Se riceve un codice non valido, mostra una X sul display per 5 secondi e poi pulisce lo schermo.

## Mappa codici in ingresso (come implementata)

- `1..7` -> LED indice `1..7` sulla strip collegata a `P13` (l'indice `0` non viene usato da questa logica)
- `8..14` -> LED sulla strip collegata a `P14`
- `15..21` -> LED sulla strip collegata a `P15`
- `22..28` -> LED sulla strip collegata a `P16`
- `29` -> effetto rainbow su tutte le strip
- altro valore -> schermata errore (X)

## Hardware usato nel firmware

- **Seriale**: `P2` (RX) e `P0` (TX) a `9600`
- **Servo**: `P1`
- **NeoPixel**:
  - strip1: `P13`, 8 LED
  - strip2: `P14`, 7 LED
  - strip3: `P15`, 7 LED
  - strip4: `P16`, 7 LED
- **Reset/stop**: evento `pins.onPulsed(P2, High)` che:
  - spegne musica;
  - pulisce tutte le strip;
  - riporta il servo a `0°`.
- **Variabili presenti ma non usate nella logica**: `RESET`.

## Flusso operativo (semplice)

1. Arduino invia un byte con il codice posizione.
2. `basic.forever` legge il buffer seriale e prende il primo byte come `CODE`.
3. Se il codice e valido, il Micro:bit:
   - accende il LED della posizione;
   - attiva allarme sonoro;
   - muove servo;
   - accende LED attenzione.
4. Se arriva impulso di reset su `P2`, il sistema torna in stato neutro.
5. Alla fine del ciclo, `CODE` viene rimesso a `0` (variabile locale).

## Punti critici emersi dalle chat precedenti

Questi miglioramenti sono prioritari per affidabilita (soprattutto in un contesto reale con utenti anziani):

1. **Conflitto pin su `P2`**  
   `P2` e usato sia per seriale sia per `onPulsed`: rischio comportamenti imprevedibili.

2. **Indice LED fuori range in `LED_ATTENZIONE()`**  
   Su una strip da 8 LED gli indici validi sono `0..7`, ma il codice usa `8`.

3. **Blocco da 5 secondi nel loop principale**  
   `basic.pause(5000)` nel ramo errore puo far perdere eventi seriali.

4. **Allarme audio rilanciato a ogni comando**  
   Conviene introdurre uno stato `allarmeAttivo` per evitare restart continui.

5. **Parsing seriale poco robusto**  
   La lettura attuale (`readBuffer(0)` + primo byte) andrebbe resa piu robusta (1 byte alla volta + validazioni).

6. **Stato iniziale del servo non esplicito**  
   Buona pratica: impostare `servos.P1.setAngle(0)` all'avvio.

## Prossimi step consigliati

- Separare pin seriale e pin reset.
- Correggere l'indice del LED attenzione.
- Rendere non bloccante la gestione errore.
- Aggiungere una macchina a stati minima (`idle`, `alert`, `reset`).
- Definire un mini protocollo seriale con checksum o delimitatori.

## Contesto di design web (per documentazione/prototipo)

Se vuoi raccontare il progetto in una landing page:

- Hero: "Promemoria farmaci smart e affidabile".
- Focus: sicurezza, chiarezza visiva, segnali immediati.
- Sezione "Come funziona": codice ricevuto -> LED posizione -> allarme -> reset.
- Sezione "Componenti": Micro:bit, Arduino, servo, NeoPixel.

Per la parte grafica:

- **Canva**: mockup veloci di schermate, infografiche e icone.
- **Pixelmator Pro**: rifinitura immagini e render piu curati.

## Fonti usate

- Codice: `main.ts`
- Chat precedente: [Review microbit affidabilita](4c64d0fb-fc67-4ce3-aeb3-6e4b45d5166b)
- Chat precedente: [Landing page progetto](117d826c-51a1-4894-96d1-b2bfb818f61e)

---

Ultimo allineamento al codice: `main.ts` corrente nel repository.
