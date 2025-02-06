import html2canvas from 'html2canvas';

interface ExportImageOptions {
  quality?: number;
  imageType?: 'image/png' | 'image/jpeg';
  backgroundColor?: string;
  scale?: number;
}

interface StyleBackup {
  element: HTMLElement;
  property: string;
  value: string;
}

/**
 * Converts OKLCH colors to RGB for elements within the target
 * @param element - Root element to process
 * @returns Array of original styles to restore
 */
const preprocessColors = (element: HTMLElement): StyleBackup[] => {
  const backups: StyleBackup[] = [];
  // const oklchRegex = /oklch\([^)]+\)/g;

  // Fallback color when conversion fails
  const fallbackColor = '#FF4500';  // Your brand color

  // Process all elements within the target
  const elements = element.getElementsByTagName('*');
  Array.from(elements).concat([element]).forEach((el) => {
    const styles = window.getComputedStyle(el);
    const colorProps = ['color', 'background-color', 'border-color'];

    colorProps.forEach(prop => {
      const value = styles.getPropertyValue(prop);
      if (value.includes('oklch')) {
        backups.push({
          element: el as HTMLElement,
          property: prop,
          value: value
        });
        (el as HTMLElement).style.setProperty(prop, fallbackColor);
      }
    });
  });

  return backups;
};

/**
 * Restores original styles from backup
 * @param backups - Array of style backups to restore
 */
const restoreStyles = (backups: StyleBackup[]) => {
  backups.forEach(({element, property, value}) => {
    element.style.setProperty(property, value);
  });
};

/**
 * Exports a DOM element as an image
 * @param element - The DOM element to export as image
 * @param imageFileName - The name of the output image file
 * @param options - Optional configuration for image export
 */
const exportAsImage = async (
  element: HTMLElement,
  imageFileName: string,
  options: ExportImageOptions = {}
): Promise<void> => {
  const {
    quality = 1.0,
    imageType = 'image/png',
    backgroundColor = null,
    scale = window.devicePixelRatio
  } = options;

  // Store original dimensions
  const html = document.documentElement;
  const body = document.body;
  const originalHtmlWidth = html.style.width;
  const originalBodyWidth = body.style.width;

  // Process colors
  const styleBackups = preprocessColors(element);

  try {
    // Calculate new widths if necessary
    const htmlWidth = html.clientWidth;
    const bodyWidth = body.clientWidth;
    const elementScrollWidth = element.scrollWidth;
    const elementClientWidth = element.clientWidth;

    const newWidth = elementScrollWidth - elementClientWidth;
    if (newWidth > elementClientWidth) {
      html.style.width = `${htmlWidth + newWidth}px`;
      body.style.width = `${bodyWidth + newWidth}px`;
    }

    // Create canvas with specified options
    const canvas = await html2canvas(element, {
      scale,
      backgroundColor,
      logging: false,
      useCORS: true,
      allowTaint: true,
      removeContainer: true,
      foreignObjectRendering: false
    });

    // Convert to image and download
    const image = canvas.toDataURL(imageType, quality);
    await downloadImage(image, imageFileName);

  } catch (error) {
    console.error('Error exporting image:', error);
    throw error;
  } finally {
    // Restore all original styles and dimensions
    restoreStyles(styleBackups);
    html.style.width = originalHtmlWidth;
    body.style.width = originalBodyWidth;
  }
};

/**
 * Downloads an image from a data URL
 * @param dataUrl - The data URL of the image
 * @param fileName - The name of the file to download
 */
const downloadImage = (dataUrl: string, fileName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const link = document.createElement('a');
      link.style.display = 'none';
      link.download = fileName;
      link.href = dataUrl;

      document.body.appendChild(link);
      link.click();

      requestAnimationFrame(() => {
        document.body.removeChild(link);
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

export type { ExportImageOptions };
export default exportAsImage;