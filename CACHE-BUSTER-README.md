# Cache Buster Utility

A reusable JavaScript module for forcing browsers to fetch fresh assets during development. Perfect for static sites and React projects where you want to see changes immediately.

## How It Works

The cache buster appends version query parameters (like `?v=1698765432`) to CSS and JS file URLs, forcing browsers to treat them as new resources and fetch fresh copies.

## Usage Examples

### Vanilla JavaScript (Current Project)
```javascript
import { bustCache } from "./cache-buster.js";

// Basic usage - busts CSS files automatically
bustCache();

// With options
bustCache({
  verbose: true,        // Log actions to console
  updateCSS: true,      // Update CSS files (default: true)
  updateJS: true,       // Update JS files with data-bust attribute
  forceReload: false    // Force page reload after cache bust
});
```

### React Projects
```javascript
import { bustCache } from "./utils/cache-buster.js";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Run cache bust on component mount (development only)
    if (process.env.NODE_ENV === 'development') {
      bustCache({ verbose: true });
    }
  }, []);

  return <div>Your app</div>;
}
```

### React Hook Version
```javascript
import { useCacheBuster } from "./utils/cache-buster.js";

function App() {
  // Automatically bust cache on mount
  useCacheBuster({ verbose: true });
  
  return <div>Your app</div>;
}
```

### Advanced: Nuclear Option
For persistent caching issues (service workers, aggressive CDN caching):
```javascript
import { nukeCacheAndReload } from "./cache-buster.js";

// This will unregister service workers, clear caches, and force reload
nukeCacheAndReload();
```

## Setup for React Projects

1. Copy `cache-buster.js` to your `src/utils/` folder
2. Import and use in your main App component
3. Consider wrapping in a development-only check:

```javascript
if (process.env.NODE_ENV === 'development') {
  bustCache({ verbose: true });
}
```

## Setup for Static HTML Sites

1. Add `data-bust` attribute to script tags you want refreshed:
   ```html
   <script src="./js/main.js" data-bust></script>
   ```
2. CSS files are automatically refreshed (no marking needed)
3. Import and call `bustCache()` in your main JavaScript file

## Options

- `useTimestamp: boolean` - Use timestamp for versioning (default: true)
- `customVersion: string` - Custom version string instead of timestamp
- `updateCSS: boolean` - Update CSS link tags (default: true)  
- `updateJS: boolean` - Update JS script tags with data-bust (default: true)
- `forceReload: boolean` - Force page reload after cache busting (default: false)
- `verbose: boolean` - Log actions to console (default: false)

## Browser Support

Works in all modern browsers. Uses standard DOM APIs and ES6 modules.