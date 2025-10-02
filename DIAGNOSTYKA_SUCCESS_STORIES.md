# Diagnostyka problemu z ukrywaniem Success Stories

## Szybka diagnoza w konsoli przeglądarki

### Krok 1: Otwórz konsolę
1. Otwórz dowolną stronę (np. `/landing/index.html` lub `/landing/index-pl.html`)
2. Naciśnij **F12** aby otworzyć narzędzia deweloperskie
3. Przejdź do zakładki **Console**

### Krok 2: Sprawdź obecny stan

Wklej do konsoli i naciśnij Enter:

```javascript
console.log('Wartość showSuccessStories:', localStorage.getItem('showSuccessStories'));
```

**Wyniki:**
- `null` lub `"true"` = Success Stories powinny być WIDOCZNE
- `"false"` = Success Stories powinny być UKRYTE

### Krok 3: Znajdź wszystkie linki Success Stories

```javascript
const links = document.querySelectorAll('a[href*="success-stories"]');
console.log('Znaleziono linków:', links.length);
links.forEach((link, i) => {
    const parentLi = link.closest('li');
    const element = parentLi || link;
    console.log(`Link ${i+1}:`, link.textContent.trim(), 
                '| display:', element.style.display || 'default',
                '| w <li>:', !!parentLi);
});
```

**Oczekiwane wyniki:**
- Powinno znaleźć 3 linki (desktop menu, mobile menu, footer)
- Jeśli `showSuccessStories = "false"`, wszystkie powinny mieć `display: "none"`

### Krok 4: Ręczne ukrycie (test)

```javascript
localStorage.setItem('showSuccessStories', 'false');
location.reload();
```

### Krok 5: Ręczne pokazanie (test)

```javascript
localStorage.setItem('showSuccessStories', 'true');
location.reload();
```

---

## Pełny skrypt diagnostyczny

Wklej całość do konsoli:

```javascript
(function diagnose() {
    console.log('=== DIAGNOSTYKA SUCCESS STORIES ===');
    
    // 1. Sprawdź localStorage
    const setting = localStorage.getItem('showSuccessStories');
    console.log('1. localStorage.showSuccessStories:', setting);
    console.log('   Interpretacja:', setting !== 'false' ? 'WIDOCZNE ✅' : 'UKRYTE ❌');
    
    // 2. Znajdź linki
    const links = document.querySelectorAll('a[href*="success-stories"]');
    console.log('\n2. Znalezione linki:', links.length);
    
    if (links.length === 0) {
        console.warn('   ⚠️ PROBLEM: Nie znaleziono żadnych linków!');
        return;
    }
    
    // 3. Szczegóły każdego linku
    console.log('\n3. Szczegóły linków:');
    links.forEach((link, i) => {
        const parentLi = link.closest('li');
        const element = parentLi || link;
        const computedDisplay = window.getComputedStyle(element).display;
        
        console.log(`   Link #${i+1}:`);
        console.log('     - Tekst:', link.textContent.trim());
        console.log('     - href:', link.getAttribute('href'));
        console.log('     - W <li>:', !!parentLi);
        console.log('     - style.display:', element.style.display || '(pusty)');
        console.log('     - computed display:', computedDisplay);
        console.log('     - Widoczny:', computedDisplay !== 'none' ? '✅' : '❌');
    });
    
    // 4. Sprawdź czy funkcja istnieje
    console.log('\n4. Funkcja updateSuccessStoriesVisibility:');
    console.log('   Istnieje:', typeof updateSuccessStoriesVisibility === 'function' ? '✅' : '❌ BRAK!');
    
    // 5. Test funkcji
    if (typeof updateSuccessStoriesVisibility === 'function') {
        console.log('\n5. Test wywołania funkcji...');
        updateSuccessStoriesVisibility();
        console.log('   ✅ Funkcja została wykonana');
        
        // Sprawdź ponownie stan linków
        console.log('\n6. Stan po wywołaniu funkcji:');
        links.forEach((link, i) => {
            const parentLi = link.closest('li');
            const element = parentLi || link;
            const computedDisplay = window.getComputedStyle(element).display;
            console.log(`   Link #${i+1}: ${computedDisplay !== 'none' ? '✅ WIDOCZNY' : '❌ UKRYTY'}`);
        });
    }
    
    // 7. Sprawdź czy auth.js jest załadowany
    console.log('\n7. Inne funkcje z auth.js:');
    console.log('   - isLoggedIn:', typeof isLoggedIn === 'function' ? '✅' : '❌');
    console.log('   - updateNav:', typeof updateNav === 'function' ? '✅' : '❌');
    
    console.log('\n=== KONIEC DIAGNOSTYKI ===');
})();
```

---

## Możliwe problemy i rozwiązania

### Problem 1: Funkcja nie istnieje
**Objawy:** `typeof updateSuccessStoriesVisibility === 'undefined'`

**Przyczyna:** Plik `auth.js` nie został załadowany

**Rozwiązanie:** Sprawdź czy na dole strony jest:
```html
<script src="auth.js"></script>
```

### Problem 2: Linki nie zostały znalezione
**Objawy:** `links.length === 0`

**Przyczyna:** Strona nie ma linków do Success Stories lub używa innego wzorca URL

**Rozwiązanie:** Sprawdź czy są linki zawierające "success-stories" w href

### Problem 3: Funkcja nie jest wywoływana
**Objawy:** Linki mają `style.display = ""` (pusty) zamiast `"none"`

**Przyczyna:** Funkcja `updateSuccessStoriesVisibility()` nie została wywołana przy ładowaniu strony

**Rozwiązanie:** Sprawdź czy funkcja `updateNav()` wywołuje `updateSuccessStoriesVisibility()`

### Problem 4: Ustawienie nie jest zapisywane
**Objawy:** Po odświeżeniu admin.html przełącznik wraca do stanu włączonego

**Przyczyna:** localStorage może być zablokowany lub wyczyszczony

**Rozwiązanie:**
1. Sprawdź czy localStorage działa: `localStorage.setItem('test', '123'); localStorage.getItem('test');`
2. Sprawdź ustawienia przeglądarki (cookies i localStorage muszą być włączone)

---

## Szybkie akcje naprawcze

### Wymuszenie ukrycia (obejście)
```javascript
// Ustaw na "false" i odśwież
localStorage.setItem('showSuccessStories', 'false');
location.reload();
```

### Wymuszenie pokazania
```javascript
// Ustaw na "true" i odśwież
localStorage.setItem('showSuccessStories', 'true');
location.reload();
```

### Reset do domyślnego stanu
```javascript
// Usuń ustawienie (domyślnie będą widoczne)
localStorage.removeItem('showSuccessStories');
location.reload();
```

### Ukryj natychmiastowo bez odświeżania
```javascript
document.querySelectorAll('a[href*="success-stories"]').forEach(link => {
    const parentLi = link.closest('li');
    const element = parentLi || link;
    element.style.display = 'none';
});
```

---

## Kontakt z deweloperem

Jeśli problem nadal występuje, uruchom pełny skrypt diagnostyczny i wyślij wyniki (skopiuj z konsoli).

Przydatne informacje:
- Przeglądarka i wersja: `navigator.userAgent`
- Czy localStorage działa: `typeof Storage !== "undefined"`
- URL strony: `window.location.href`
