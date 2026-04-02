<style>
    
body {
    background-color: #000;
    color: #fff;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
    display: flex;
    min-height: 100vh;
    box-sizing: border-box;
}

h1, h2 {
    margin-top: 0;
    margin-bottom: 0;
}

/* MAIN CONTAINER */
.main-container {
    width: 75%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-grow: 1;
    padding-bottom: 50px;
    align-items: flex-start;
}

/* LEFT COLUMN */
.left-column {
    flex-basis: 33.33%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: sticky;
    top: 0;
    height: 90vh;
    padding-right: 20px;
    box-sizing: border-box;
}

.left-content {
    width: 75%;
    margin-top: 14vh;
}

.left-content h1, .left-content h2 {
    margin: 0;
}

.description-text {
    color: #ddd;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.5;
    margin-top: 16px;
    margin-bottom: 16px;
}

/* LEFT NAV LINKS */
.left-content nav a {
    color: #fff;
    text-decoration: none;
    display: block;
    margin: 10px 0;
    padding: 5px 0px;
    transition: color 0.3s;
}

.left-content nav a:hover {
    color: #b3ff00;
}

.left-content nav a.active {
    color: #b3ff00;
    font-weight: bold;
}

/* RIGHT COLUMN */
.right-column-wrapper {
    flex-basis: 66.66%;
    flex-grow: 1;
    overflow-y: auto;
    margin-top: 0.5vh;
    padding-top: 16vh;
    padding-left: 20px;
    box-sizing: border-box;
    position: relative;
}

.right-column-wrapper h2 {
    margin: 0 0 8px 0;
}

#about-me p, .right-column-wrapper p {
    color: #ddd;
    line-height: 1.5;
    margin-bottom: 16px;
}

.content-section {
    padding: 32px 0;
}

/* TIMELINE */
.timeline {
    position: relative;
    padding: 20px 0 2px 30px;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #444;
}

.timeline-item-link {
    position: relative;
    display: block;
    margin-bottom: 30px;
    padding: 0 0 0 20px;
    text-decoration: none;
    color: #fff;
    transition: color 0.3s ease;
}

.timeline-item-link:hover {
    color: #22cc33;
    cursor: pointer;
}

.timeline-item-link::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 5px;
    width: 8px;
    height: 8px;
    background: #b3ff00;
    border-radius: 50%;
    z-index: 1;
}

.timeline-date {
    color: #ccc;
}

/* POPUP GALLERY */
#columnPopup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 10;
  cursor: pointer;
}

#columnPopup img {
  max-width: 99%;
  max-height: 99%;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  object-fit: contain;
  opacity: 0.94; /* preserve original opacity */
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.gallery-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 2em;
  cursor: pointer;
  padding: 20px;
  user-select: none;
  z-index: 10000;
}

#prevBtn { left: 30px; }
#nextBtn { right: 30px; }

.gallery-btn:hover {
  color: #b3ff00;
}

/* --- 1. Corrected Grid Container (using CSS Grid) --- */
.grid-container {
    /* Layout: CSS Grid is the proper tool for a strict 9x9 layout */
    display: grid;
    /* This creates exactly 9 columns, each taking up an equal fraction (1fr) of the space */
    grid-template-columns: repeat(3, 1fr); 
    
    /* Spacing: Creates a consistent gap between grid items */
    gap: 10px; 

    /* Alignment & Sizing */
    margin: 0 0 0 auto; /* Aligns the entire container to the right */
    width: 90vw;
    max-width: 800px; 
}

/* --- 2. Image Styling --- */
.grid-container img {
    /* In CSS Grid, the image width is handled automatically by the '1fr' columns. 
       We only need to ensure the image fills its grid cell and has square dimensions. */
    width: 100%; 
    /* Important: This ensures the image fills the 1fr height */
    /* height: 100%; */ 
    /* Optional: Forces cells to be square for a classic grid look */
    /* aspect-ratio: 1 / 1; */ 
    
    cursor: pointer;
    display: block;
    object-fit: cover; /* Ensures the image covers the area of the cell */
}

/* --- 3. Lightbox Styling (Improvements) --- */
.lightbox {
    /* Use 'fixed' to cover the whole viewport, regardless of scrolling */
    position: fixed; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; 
    
    /* Display: Use flex to center the content */
    display: none; 
    justify-content: center; 
    align-items: center; 
    
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.9);
}

.lightbox-content {
    display: block;
    max-width: 50%; 
    /* Ensures the image respects the height of the viewport */
    /*max-height: 90vh;*/
    object-fit: contain; /* Prevents the image from being cropped */
}
/* -------------------------------------- */
/* MOBILE RESPONSIVE */
@media (max-width: 800px) {
    .main-container {
        width: 84%;
        flex-direction: column;
        margin: 0px 4px;
    }

    .left-column {
        position: static;
        width: 100%;
        padding-right: 0;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .left-content {
        width: 100%;
        text-align: left;
        margin-top: 0;
        padding-top: 0;
    }

    .left-content nav a {
        display: inline-block;
        margin: 0;
    }

    .right-column-wrapper {
        flex-basis: 100%;
        padding-left: 0;
        padding-top: 0;
    }
}

.gallery-btn {
    font-size: 2.5em;
    padding: 10px;
  }
}

.grid-container {
        /* Change to a single column */
        grid-template-columns: 1fr; 
        gap: 10px; 
        margin: 0;
    }
    
    /* Optional: If you want to center the container when it's narrow */
    .grid-container {
        max-width: 99%; /* Give it 5% margin space on small screens */
    }
    
</style>
