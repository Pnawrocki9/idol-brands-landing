# 🔧 Szybka Instrukcja - Naprawa Dokumentów

## ✅ Co zostało naprawione?

Problem: **Dokumenty dodane w CMS nie były widoczne online**

Przyczyna: Pliki Base64 były zbyt duże dla GitHub API (limit 1MB)

Rozwiązanie: **Osobny system synchronizacji dla dokumentów**

---

## 🎯 Jak teraz działają dokumenty?

### 1️⃣ W Panelu Admin:

Po dodaniu/usunięciu dokumentów zobaczysz **NIEBIESKI** komunikat:

```
📌 Ważne: Po dodaniu lub usunięciu dokumentów, kliknij przycisk 
"Opublikuj dokumenty online" poniżej, aby synchronizować zmiany z serwerem.
```

### 2️⃣ Dwa Osobne Przyciski:

**🟢 Zielony przycisk** (prawy dolny róg):
- Tekst: "📤 Publikuj Treści Online"
- Publikuje: teksty, nagłówki, ustawienia
- **NIE publikuje dokumentów**

**🔵 Niebieski przycisk** (pod listą dokumentów):
- Tekst: "📤 Opublikuj dokumenty online"  
- Publikuje: **TYLKO dokumenty**
- Pojawia się automatycznie w sekcji "Manage Shared Documents"

---

## 📝 Krok po Kroku:

1. Wejdź do panelu admin (`admin.html`)
2. Przewiń do sekcji **"Manage Shared Documents"**
3. Kliknij "Choose Files" i wybierz dokumenty
4. Dokumenty pojawią się na liście (lokalnie)
5. **Kliknij niebieski przycisk "📤 Opublikuj dokumenty online"**
6. Poczekaj na komunikat: "✅ Dokumenty opublikowane!"
7. Gotowe! Dokumenty są teraz dostępne online

---

## 🧪 Testowanie:

Otwórz plik: `/test-documents-sync.html` w przeglądarce

Lub użyj konsoli:
```javascript
// Sprawdź lokalne dokumenty
JSON.parse(localStorage.getItem('documents'))

// Załaduj z serwera
await window.documentsSync.load()

// Opublikuj
await window.documentsSync.save()
```

---

## 📂 Nowe Pliki:

1. `netlify/functions/documents.js` - funkcja Netlify do dokumentów
2. `documents-sync.js` - skrypt synchronizacji
3. `documents-data.json` - przechowywanie dokumentów
4. `test-documents-sync.html` - narzędzie testowe

## 🔄 Zmodyfikowane Pliki:

1. `cms-sync.js` - wykluczono dokumenty
2. `admin.html` - dodano skrypty i komunikat
3. `your-documents.html` - dodano documents-sync.js
4. `your-documents-pl.html` - dodano documents-sync.js

---

## ⚠️ Ważne:

- Dokumenty są nadal przechowywane jako Base64
- Limit rozmiaru: ~2-3MB na dokument
- Większe pliki wymagałyby zewnętrznego storage (S3, Cloudinary)
- Pamiętaj o kliknięciu **obu** przycisków gdy zmieniasz treści **i** dokumenty

---

## 🆘 Jeśli coś nie działa:

1. Otwórz konsolę przeglądarki (F12)
2. Sprawdź czy są błędy
3. Otwórz `test-documents-sync.html`
4. Kliknij wszystkie przyciski testowe
5. Sprawdź czy funkcje Netlify są wdrożone

---

## ✨ Sukces!

Teraz dokumenty powinny się synchronizować prawidłowo! 🎉
