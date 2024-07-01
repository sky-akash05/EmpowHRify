
// 


// Exporting a function that configures Babel, the JavaScript compiler
module.exports = function(api) {
  // Caching the configuration to improve performance
  api.cache(true);
  
  // Returning the Babel configuration object
  return {
    // Specifying the presets to be used by Babel
    presets: ['babel-preset-expo'],
    // Specifying the plugins to be used by Babel
    plugins: ['expo-router/babel'],
  };
};


//This `babel.config.js` file configures Babel for your React Native project. It uses the `babel-preset-expo` preset, which is tailored for Expo projects, and includes a plugin for `expo-router` to support routing in the application. The `api.cache(true)` line ensures that the Babel configuration is cached for better performance.