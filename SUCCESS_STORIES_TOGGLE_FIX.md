# Success Stories Toggle - Naprawa

## Problem
Przycisk w CMS do ukrywania/pokazywania Success Stories był już dodany, ale nie działał poprawnie. Linki do Success Stories nie były ukrywane po wyłączeniu przełącznika w panelu administracyjnym.

## Przyczyna
Funkcja `updateSuccessStoriesVisibility()` ukrywała tylko elementy `<a>`, ale w stopce linki były opakowane w elementy `<li>`. Ukrywanie tylko linku (`<a>`) pozostawiało widoczny element listy, przez co linki nadal były widoczne (lub zostawiały puste miejsce).

## Rozwiązanie
Zaktualizowano funkcję `updateSuccessStoriesVisibility()` w obu plikach:
- `/workspace/auth.js` (dla stron w folderze głównym)
- `/workspace/landing/auth.js` (dla stron w folderze landing)

### Zmiany w kodzie:

```javascript
function updateSuccessStoriesVisibility() {
  const showSuccessStories = localStorage.getItem('showSuccessStories') !== 'false';
  const allLinks = document.querySelectorAll('a[href*="success-stories"]');
  
  allLinks.forEach(link => {
    // Sprawdź czy link jest w elemencie <li> (np. w stopce)
    const parentLi = link.closest('li');
    const elementToHide = parentLi || link;
    
    if (showSuccessStories) {
      elementToHide.style.display = '';
    } else {
      elementToHide.style.display = 'none';
    }
  });
}
```

### Kluczowe zmiany:
1. Dodano `link.closest('li')` aby znaleźć rodzica `<li>` jeśli istnieje
2. Używamy `parentLi` do ukrycia jeśli istnieje, w przeciwnym razie ukrywamy sam link
3. Dodano wywołanie `updateSuccessStoriesVisibility()` w funkcji `updateNav()` w `/workspace/auth.js`

## Jak to działa teraz

1. Administrator wchodzi do panelu CMS (`admin.html`)
2. W sekcji "Navigation Settings" znajduje się przełącznik "Success Stories Page"
3. Po wyłączeniu przełącznika (unchecked):
   - Wartość w localStorage: `showSuccessStories = 'false'`
   - Funkcja `updateSuccessStoriesVisibility()` znajduje wszystkie linki zawierające "success-stories"
   - Dla każdego linku sprawdza czy jest w `<li>` i ukrywa odpowiedni element
4. Po włączeniu przełącznika (checked):
   - Wartość w localStorage: `showSuccessStories = 'true'`
   - Wszystkie linki do Success Stories są ponownie widoczne

## Lokalizacje gdzie linki są ukrywane

Na każdej stronie znajdują się zazwyczaj 3 linki do Success Stories:
1. **Nawigacja desktop** - link bezpośredni w menu górnym
2. **Nawigacja mobile** - link w rozwijanym menu mobilnym
3. **Stopka** - link w liście (`<li>`) w dolnej części strony

Wszystkie te linki są teraz poprawnie ukrywane/pokazywane.

## Testowanie

Aby przetestować funkcjonalność:
1. Otwórz panel CMS: `landing/admin.html`
2. Zaloguj się jako administrator
3. Wyłącz przełącznik "Success Stories Page"
4. Odwiedź dowolną stronę (np. `landing/index.html`, `landing/index-pl.html`)
5. Sprawdź czy linki Success Stories są ukryte w:
   - Menu górnym (desktop)
   - Menu mobilnym
   - Stopce strony
6. Wróć do panelu CMS i włącz przełącznik
7. Odśwież stronę - linki powinny być znowu widoczne
