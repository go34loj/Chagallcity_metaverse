# Chagall City Metaverse

<div align="center">

*"A bright magic moon circles over the rooftops. All alone I dream in the square."*  
— Marc Chagall

</div>

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Controls](#-controls)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Key Components](#-key-components)
- [Customization](#-customization)
- [Browser Compatibility](#-browser-compatibility)
- [Known Issues](#-known-issues)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Support](#-support)

## 📖 Overview

Chagall City is an immersive 3D web-based metaverse experience inspired by the dreamlike worlds of Marc Chagall. Explore a mystical cityscape rendered in real-time using WebGL, where you can walk freely and discover hidden words scattered throughout the environment.

This interactive experience combines modern web technologies with artistic vision to create a poetic digital space that anyone can explore directly in their web browser.

**Created:** July 2022

## ✨ Features

- **First-Person Exploration**: Navigate a 3D world using intuitive WASD controls
- **Real-time 3D Rendering**: Powered by Three.js and WebGL
- **Atmospheric Effects**: 
  - Dynamic fog system
  - Particle effects with 1500+ animated particles
  - Custom lighting with hemisphere and point lights
- **Physics-Based Movement**: Gravity simulation with jumping mechanics
- **Collision Detection**: Raycasting system for realistic environment interaction
- **Compressed 3D Assets**: Efficient DRACO-compressed GLTF models for fast loading
- **Responsive Design**: Adapts to any screen size
- **Pointer Lock Controls**: Smooth mouse-look camera system

## 🚀 Technologies Used

- **Three.js** (v0.127.0) - 3D graphics library
- **WebGL** - Hardware-accelerated 3D rendering
- **GLTF/GLB** - 3D model format
- **DRACO Loader** - Geometry compression
- **Pointer Lock API** - Mouse capture for first-person controls
- **ES6 Modules** - Modern JavaScript
- **HTML5 Canvas** - Rendering target
- **CSS3** - Styling and glassmorphism effects

## 🎮 Controls

| Input | Action |
|-------|--------|
| **W** or **↑** | Move forward |
| **S** or **↓** | Move backward |
| **A** or **←** | Move left |
| **D** or **→** | Move right |
| **SPACE** | Jump |
| **MOUSE** | Look around |
| **ESC** | Pause/Exit pointer lock |

## 📦 Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (due to CORS restrictions with ES6 modules)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chagallcity_metaverse/app
   ```

2. **Start a local server**

   Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   ```

   Using Node.js:
   ```bash
   # With npx (no installation needed)
   npx http-server -p 8000
   
   # Or install serve globally
   npm install -g serve
   serve -p 8000
   ```

   Using PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Open your browser**
   
   Navigate to `http://localhost:8000`

4. **Start exploring**
   
   Click "CLICK TO START" and begin your journey through Chagall City!

## 📁 Project Structure

```
app/
├── index.html          # Main HTML entry point
├── script.js           # Core Three.js application logic
├── style.css           # Styling and UI components
├── README.md           # Project documentation
├── scripts/            # Additional scripts (if any)
├── styles/             # Additional stylesheets (if any)
└── views/              # View components (if any)
```

## 🎨 Key Components

### Scene Setup
- **Background**: Deep blue (#021153) with exponential fog
- **Camera**: Perspective camera with 75° FOV
- **Lighting**: Hemisphere light + colored point lights

### Movement System
- Smooth acceleration/deceleration
- Gravity simulation (0.0055 units)
- 6-axis raycasting for collision detection
- Jump velocity system

### Particle System
- 1500 particles with wave-like motion
- Additive blending for ethereal effect
- Size attenuation based on distance

## 🔧 Customization

### Change the 3D Model

Edit line 113 in `script.js`:
```javascript
loader.load(
    "YOUR_MODEL_URL_HERE.glb",
    // ... rest of the code
```

### Modify Colors

Scene background (line 29):
```javascript
scene.background = new THREE.Color("#021153");
```

Particle color (line 424):
```javascript
color: "#7f97ff"
```

### Adjust Movement Speed

Edit speed values in the `move()` function (lines 241-270):
```javascript
speed = 0.0025; // Adjust this value
```

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Note**: WebGL 2.0 support required. Mobile devices supported but may have performance limitations.

## 🐛 Known Issues

- Performance may vary based on GPU capabilities
- Mobile touch controls not yet implemented
- Some browsers may require user interaction before enabling pointer lock

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created with ❤️ in July 2022

## 🙏 Acknowledgments

- Inspired by the artwork of **Marc Chagall**
- Built with **Three.js** by Mr.doob and contributors
- 3D assets optimized with **DRACO** compression
- Initial template from **Glitch**

## 📞 Support

If you encounter any issues or have questions:
- Check the [Three.js documentation](https://threejs.org/docs/)
- Review browser console for error messages
- Ensure you're running the app from a local web server

---

<div align="center">

**[⬆ Back to Top](#chagall-city-metaverse)**

*Explore, dream, discover.*

</div>
