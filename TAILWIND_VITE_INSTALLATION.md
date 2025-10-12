# Tailwind CSS + Vite - Dokumentacja Instalacji

## ✅ Status: Instalacja zakończona

Tailwind CSS został pomyślnie zainstalowany i skonfigurowany z Vite zgodnie z oficjalną dokumentacją: https://tailwindcss.com/docs/installation/using-vite

## 📦 Zainstalowane pakiety

```json
"devDependencies": {
  "autoprefixer": "^10.4.21",
  "postcss": "^8.5.6",
  "tailwindcss": "^3.4.18",
  "vite": "^7.1.9"
}
```

## 📁 Utworzone pliki

### 1. `tailwind.config.js`
Konfiguracja Tailwind CSS - definiuje ścieżki do plików HTML/JS do skanowania klas.

### 2. `postcss.config.js`
Konfiguracja PostCSS z pluginami Tailwind CSS i Autoprefixer.

### 3. `src/style.css`
Główny plik CSS z dyrektywami Tailwind:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. `src/main.js`
Punkt wejściowy dla Vite, który importuje style:
```javascript
import './style.css'
```

### 5. `vite.config.js`
Konfiguracja Vite dla wielostronicowej aplikacji (obsługuje wszystkie pliki HTML).

## 🔧 Dostępne komendy

```bash
# Tryb deweloperski (development server)
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu produkcyjnego
npm run preview
```

## 🔄 Jak zaktualizować istniejące pliki HTML

### Krok 1: Usuń CDN Tailwind CSS
Znajdź i **usuń** tę linię ze wszystkich plików HTML:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Krok 2: Dodaj import Vite
Dodaj tę linię w sekcji `<head>` każdego pliku HTML:
```html
<script type="module" src="/src/main.js"></script>
```

### Przykład przed i po:

**PRZED:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Moja Strona</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <!-- zawartość -->
</body>
</html>
```

**PO:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Moja Strona</title>
    <script type="module" src="/src/main.js"></script>
</head>
<body>
    <!-- zawartość -->
</body>
</html>
```

## 📝 Pliki do zaktualizowania

Znaleziono **64 pliki HTML** używające CDN Tailwind CSS. Oto niektóre z nich:
- `index.html`
- `index-pl.html`
- `about.html`
- `about-pl.html`
- `blog.html`
- `blog-pl.html`
- `success-stories.html`
- `success-stories-pl.html`
- I wiele innych w folderach `landing/`, `legal/`, `blog/`

## 🧪 Test instalacji

Utworzono plik demonstracyjny: **`example-vite-tailwind.html`**

### Test 1: Development Server
Aby przetestować instalację w trybie deweloperskim:
```bash
npm run dev
```

Następnie otwórz w przeglądarce:
```
http://localhost:5173/example-vite-tailwind.html
```

### Test 2: Production Build
Instalacja została zweryfikowana - build produkcyjny działa poprawnie:
```bash
npm run build
```
✅ Build zakończony sukcesem - wygenerowano zoptymalizowane pliki CSS z Tailwind

## 🎯 Korzyści z nowej konfiguracji

✅ **Produkcyjne środowisko** - zgodne z zaleceniami Tailwind CSS  
✅ **PurgeCSS** - automatyczne usuwanie nieużywanych styli  
✅ **Hot Module Replacement (HMR)** - błyskawiczne odświeżanie podczas rozwoju  
✅ **PostCSS** - wsparcie dla nowoczesnych funkcji CSS  
✅ **Optymalizacja** - mniejsze pliki w buildzie produkcyjnym  
✅ **Brak ostrzeżeń** - koniec z alertami o używaniu CDN w produkcji  

## 📚 Dodatkowe zasoby

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [PostCSS Documentation](https://postcss.org/)

## ⚠️ Uwagi

1. **Git ignore**: Upewnij się, że `node_modules/` i `dist/` są w `.gitignore`
2. **Deployment**: W produkcji używaj `npm run build`, który utworzy zoptymalizowany build w folderze `dist/`
3. **Autoprefixer**: Automatycznie dodaje prefiksy vendorów dla lepszej kompatybilności z przeglądarkami

## 🚀 Następne kroki

1. **Automatyczna aktualizacja** - Możesz użyć skryptu do automatycznego zastąpienia CDN we wszystkich plikach HTML
2. **Własne style** - Dodaj własne klasy i komponenty w `src/style.css`
3. **Rozszerzenie konfiguracji** - Dostosuj `tailwind.config.js` według potrzeb (kolory, fonty, itp.)

---

**Status**: ✅ Instalacja zakończona i gotowa do użycia
