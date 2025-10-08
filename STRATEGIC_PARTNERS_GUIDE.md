# Strategic Partners Section - Implementation Guide

## Overview
A new "Strategic Partners" section has been added to both English and Polish versions of the Fashion homepage (`index-fashion.html` and `index-fashion-pl.html`). This section appears just before the "Ready to Start Your Fashion Empire" section.

## Features
- ✅ Fully CMS-manageable (texts and logos)
- ✅ Support for multiple partners
- ✅ Separate EN and PL translations for titles/subtitles
- ✅ Optional website URLs for partners (clickable logos)
- ✅ Responsive grid layout (2 columns on mobile, 3 on tablet, 4 on desktop)
- ✅ Elegant hover effects (grayscale to color transition)
- ✅ Easy add/edit/delete functionality in admin panel

## Setup Instructions

### 1. Upload the PAKO LORENTE Logo
Upload your PAKO LORENTE logo to the `/images/` directory with the filename:
```
pako-lorente-logo.png
```

The logo should be:
- Format: PNG or JPG
- Recommended size: 300-500px width
- Transparent background preferred for best appearance

### 2. Access CMS Management
1. Go to the admin panel: `admin.html`
2. Scroll down to the **🤝 Strategic Partners** section
3. You'll see the management interface

### 3. Configure Section Titles
- **Title (EN)**: Default is "Strategic Partners"
- **Title (PL)**: Default is "Strategiczni Partnerzy"
- **Subtitle (EN)**: Default is "Working with industry leaders to bring you the best fashion solutions"
- **Subtitle (PL)**: Default is "Współpracujemy z liderami branży, aby zapewnić Ci najlepsze rozwiązania modowe"

### 4. Manage Partners

#### Add a New Partner
1. In the "Add New Partner" section, fill in:
   - **Partner Name**: e.g., "PAKO LORENTE"
   - **Logo Path**: e.g., "images/pako-lorente-logo.png"
   - **Website URL**: (optional) e.g., "https://pakolorente.com"
2. Click "Add Partner"

#### Edit Existing Partners
- Simply update the fields in the partner's row
- Changes are saved when you click "Save All Changes"

#### Delete a Partner
- Click the 🗑️ (trash) icon next to the partner you want to remove

### 5. Save Changes
After making any changes:
1. Click the "Save All Changes" button at the bottom
2. You'll see a green success message
3. Refresh the fashion homepage to see your changes

## Technical Details

### Data Storage
All partner data is stored in localStorage:
- `partnersTitle` - English title
- `partnersTitlePl` - Polish title
- `partnersSubtitle` - English subtitle
- `partnersSubtitlePl` - Polish subtitle
- `strategicPartners` - JSON array of partner objects

### Partner Object Structure
```javascript
{
  "name": "PAKO LORENTE",
  "logo": "images/pako-lorente-logo.png",
  "url": "https://pakolorente.com" // optional
}
```

### Default Content
If no partners are configured, the system automatically adds PAKO LORENTE as the default partner on first load.

## Styling & Design
- **Section background**: Light gray (`bg-gray-50`)
- **Partner cards**: White background with subtle shadow
- **Hover effect**: Logos transition from grayscale to color
- **Responsive**: Automatically adjusts grid columns based on screen size
- **Professional appearance**: Clean, modern design matching the site's aesthetic

## Pages Affected
1. `index-fashion.html` (English Fashion Homepage)
2. `index-fashion-pl.html` (Polish Fashion Homepage)
3. `admin.html` (Admin Panel - new management section)

## Notes
- Partners are shared between EN and PL versions (same logos)
- Only the section titles/subtitles differ between languages
- Logos should be optimized for web (compressed, appropriate size)
- If a logo fails to load, the partner name will be displayed as fallback

## Support
If you need to add more partners or modify the section layout, you can:
1. Use the admin panel for content management
2. Edit the HTML directly in the page files for structural changes
3. Modify the CSS classes for styling adjustments

---

**Created**: October 8, 2025  
**Implementation**: Strategic Partners Section with full CMS integration
