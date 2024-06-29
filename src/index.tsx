import { Button, Frog } from 'frog';


// Correctly initialize the Frog application
export const app = new Frog({
  title: 'Kiss, Marry, Fade Frame', // Required title property

  imageAspectRatio: "1:1"
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
        console.error('Unexpected JSON structure:', data);
        return 'girl.JPG'; // Default image URL
      }
    } else {
      console.error('Failed to fetch image:', response.status);
      return 'girl.JPG'; // Default image URL
    }
  } catch (error) {
    console.error('Error fetching image from the API:', error);
    return 'girl.JPG'; // Default image URL
  }
}

// Frame route to display the image and handle refresh
app.frame('/', async (c) => {
  // Fetch the initial image or on refresh
  let selectedImageUrl = await fetchRandomImageUrl();

  // Check if a button was clicked
  if (c.req.param('buttonValue') === 'refresh') {
    selectedImageUrl = await fetchRandomImageUrl();
  } else if (c.req.param('buttonValue') === 'kiss') {
    // Handle kiss button logic
    // You can add any additional logic here if needed
  } else if (c.req.param('buttonValue') === 'marry') {
    // Handle marry button logic
    // You can add any additional logic here if needed
  } else if (c.req.param('buttonValue') === 'fade') {
    // Handle fade button logic
    // You can add any additional logic here if needed
  }

  return c.res({
    image: selectedImageUrl, // Use the selected image URL
  
    intents: [
 // A button to refresh the image, posting to the same frame
      <Button value="kiss">Kiss</Button>, // A button to kiss the image, posting to the same frame
      <Button value="marry">Marry</Button>, 
      <Button value="fade">Fade</Button>,// A button to marry the image, posting to the same frame
      <Button.Redirect location="https://www.k-marry-f.com/kmf">PLAY</Button.Redirect>,
    ]
  });
});


