import { useTheme } from '@emotion/react';
import React, { useEffect } from 'react';

// This component is used to update the theme color in the manifest.json file
const ThemeChecker = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    const updateManifestThemeColor = () => {
      // Find the existing manifest link
      const manifestLink = document.querySelector('link[rel="manifest"]');
      const manifestHref = manifestLink.getAttribute('href');

      // Fetch the current manifest
      fetch(manifestHref)
        .then((response) => response.json())
        .then((manifest) => {
          // Update the theme_color and background_color
          manifest.theme_color = isDarkMode ? '#000000' : '#213966';
          manifest.background_color = isDarkMode ? '#000000' : '#ffffff';

          // Create a blob from the updated manifest and update the href
          const updatedManifestBlob = new Blob([JSON.stringify(manifest)], {
            type: 'application/json',
          });
          const updatedManifestURL = URL.createObjectURL(updatedManifestBlob);
          manifestLink.setAttribute('href', updatedManifestURL);
        });
    };

    updateManifestThemeColor();
  }, [isDarkMode]);
  return <></>;
};

export default ThemeChecker;
