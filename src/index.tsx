import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev'; // Import the devtools
import { serveStatic } from 'frog/serve-static';
import { handle } from 'frog/vercel'

// Correctly initialize the Frog application
export const app = new Frog({
  title: 'Frame', // Required title property
  imageAspectRatio: "1:1",
  imageOptions: { width: 600, height: 600 },
  basePath: '/api',
});

// Function to fetch a single random image URL from the API
async function fetchRandomImageUrl() {
  try {
    const response = await fetch('https://www.k-marry-f.com/api/getPics');
    const text = await response.text(); // Read response as text
    console.log('Raw response text:', text); // Log the raw response text

    if (response.ok) {
      const data = JSON.parse(text); // Attempt to parse JSON
      if (data && data.url) {
        return data.url; // Return the single image URL
      } else {
        throw new Error('Unexpected JSON structure');
      }
    } else {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching image from the API:', error);
    throw error; // Re-throw the error after logging it
  }
}

// Frame route to display the image and handle refresh
app.frame('/', async (c) => {
  // Fetch the initial image or on refresh
  let selectedImageUrl;
  try {
    selectedImageUrl = await fetchRandomImageUrl();
  } catch (error) {
    selectedImageUrl = '/girl.JPG'; // Use a placeholder image on error
  }

  return c.res({
    image: selectedImageUrl, // Use the selected image URL
    intents: [
      <Button value="kiss">Kiss</Button>, // A button to kiss the image, posting to the same frame
      <Button value="marry">Marry</Button>, // A button to marry the image, posting to the same frame
      <Button value="fade">Fade</Button>, // A button to fade the image, posting to the same frame
      <Button.Redirect location="https://www.k-marry-f.com/kmf">PLAY</Button.Redirect>, // Redirect button
    ],
  });
});

// Attach the devtools for enhanced debugging
devtools(app, { serveStatic });

// Export Vercel handlers

export const GET = handle(app)
export const POST = handle(app)