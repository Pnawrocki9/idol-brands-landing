# Instrukcja: Jak ukryć zakładkę Success Stories

## Krok po kroku:

### 1. Wyłącz zakładkę Success Stories w CMS
1. Otwórz panel administracyjny: `/landing/admin.html`
2. Zaloguj się jako administrator
3. Na górze strony znajdziesz sekcję **"Navigation Settings"** (niebieskie tło)
4. Kliknij w przełącznik **"Success Stories Page"** aby go WYŁĄCZYĆ
5. Napis przy przełączniku zmieni się z "Visible" na "**Hidden**"
6. Pojawi się komunikat: "Navigation settings saved automatically"

✅ **Gotowe! Zmiana została zapisana.**

---

### 2. Sprawdź efekt na stronach

**WAŻNE:** Musisz **odświeżyć strony** aby zobaczyć efekt!

#### Sprawdź stronę angielską:
1. Otwórz `/landing/index.html` w nowej karcie (lub odśwież jeśli już ją masz otwartą - **F5**)
2. Sprawdź czy zakładka "Success Stories" zniknęła z:
   - Menu górnego (desktop)
   - Menu mobilnego (hamburger)
   - Stopki strony

#### Sprawdź stronę polską:
1. Otwórz `/landing/index-pl.html` w nowej karcie (lub odśwież - **F5**)
2. Sprawdź czy zakładka "Success Stories" zniknęła z:
   - Menu górnego (desktop)
   - Menu mobilnego (hamburger)
   - Stopki strony

---

### 3. Jak włączyć z powrotem?

1. Wróć do `/landing/admin.html`
2. Kliknij w przełącznik **"Success Stories Page"** aby go WŁĄCZYĆ
3. Napis zmieni się na "**Visible**"
4. Odśwież strony (`F5`) - zakładka powinna się pojawić

---

## Dlaczego muszę odświeżać strony?

Przełącznik zapisuje ustawienie w **localStorage** przeglądarki. JavaScript na każdej stronie:
- Czyta to ustawienie przy załadowaniu strony (funkcja `updateSuccessStoriesVisibility()`)
- Ukrywa lub pokazuje wszystkie linki do Success Stories

Strony które są już załadowane **nie wiedzą** o zmianie dopóki ich nie odświeżysz.

---

## Nie musisz:
- ❌ Wciskać żadnego przycisku "Publikuj"
- ❌ Zapisywać ręcznie - wszystko dzieje się automatycznie
- ❌ Wylogowywać się i logować ponownie

## Musisz tylko:
- ✅ Kliknąć przełącznik
- ✅ **Odświeżyć strony** gdzie chcesz zobaczyć efekt (F5)

---

## Debugowanie

Jeśli nadal nie działa, sprawdź w konsoli przeglądarki (F12 → Console):

```javascript
// Sprawdź wartość ustawienia
localStorage.getItem('showSuccessStories')
// Powinno zwrócić: 'false' (ukryte) lub 'true' (widoczne)
```

Możesz też ręcznie ustawić wartość:
```javascript
// Ukryj Success Stories
localStorage.setItem('showSuccessStories', 'false');
location.reload(); // Odśwież stronę

// Pokaż Success Stories
localStorage.setItem('showSuccessStories', 'true');
location.reload(); // Odśwież stronę
```
