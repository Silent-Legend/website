# Portfolio Folder Structure

## Current Structure

```
images/Portfolio/
├── Visual_Effects/
│   └── Explosion.jpeg
├── Motion_Graphics/
│   └── Digital_Iris.jpeg
├── Graphic_Design/
│   ├── KW Typographic Portrait.png (thumbnail)
│   └── Kate_Winslet/
│       ├── KW Final.png
│       ├── KW Color.png
│       ├── KW BW.png
│       ├── KW small.png
│       ├── KW medium.png
│       └── KW large.png
├── Photography/
│   └── Sattelite_View.jpeg
├── Photo_Manipulation/
│   └── Soldier.jpeg
└── AI_Art/
    ├── AI ART.png
    └── Split.jpeg
```

## How It Reflects in the Portfolio Section

### Category Mapping
The folder structure directly maps to the portfolio categories:

- **Visual_Effects** → `.visual-effects` class in HTML
- **Motion_Graphics** → `.motion-graphics` class in HTML
- **Graphic_Design** → `.graphic-design` class in HTML
- **Photography** → `.photography` class in HTML
- **Photo_Manipulation** → `.photo-manipulation` class in HTML
- **AI_Art** → `.ai-art` class in HTML

### Image Path Structure
- **Thumbnail images** (shown in portfolio grid): `images/Portfolio/{Category}/{filename}`
- **Detail images** (shown in modal/details): `images/Portfolio/{Category}/{ProjectFolder}/{filename}`

### Example: Kate Winslet Project
- **Category**: Graphic Design
- **Thumbnail**: `images/Portfolio/Graphic_Design/KW Typographic Portrait.png`
- **Detail Images**: `images/Portfolio/Graphic_Design/Kate_Winslet/KW Final.png`, etc.

## Adding New Projects

### For projects with multiple images:
1. Create a project folder: `images/Portfolio/{Category}/{ProjectName}/`
2. Place all project images in that folder
3. Place the thumbnail in the category folder: `images/Portfolio/{Category}/thumbnail.png`
4. Update HTML:
   - Set `src` attribute to thumbnail path
   - Set `data-detail-images` to array of project folder images

### For single-image projects:
1. Place image directly in category folder: `images/Portfolio/{Category}/image.jpg`
2. Update HTML:
   - Set `src` attribute to image path
   - Set `data-detail-images` to same image (or leave empty if no detail view needed)

## Benefits of This Structure

1. **Organized by Category**: Easy to find images by service type
2. **Scalable**: Can add unlimited projects per category
3. **Maintainable**: Clear hierarchy makes updates simple
4. **Consistent**: All portfolio images follow the same pattern
5. **Filter-Friendly**: Folder structure matches HTML filter classes

