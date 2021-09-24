# My Approach 

## Languages/Technologies
- I built the backend of the app using Node.js and Express.js to run the server. I built the frontend with React.js. I chose these technologies. I chose these technologies largely based on my familiarity with them (though React.js was a requirement here), which I thought would give me the best opportunity to efficiently complete the assignment in the timeframe. 
## Backend

### Webscraping 
- To help me with the webscraping, I used Puppeteer--a  headless chrome browser that can be used to programmatically view URL pages and extract their text. With Puppeteer, I was able to extract the text in its entirety as a string.
- With the text extracted, I then used regular expression to search the string for the subject search term. The regular expression search returns an array with the instances of the search word. 
- I included all of the above functionality in a modularized function.That function itself is called within the api endpoint for post requests, and ultimately the function does the work of responding to frontend post requests with the length of the array (i.e. the number of instances of the search word).

### API Endpoint
- I ultimately only needed a single API endpoint here, namely a post route to take in post requests coming in from the frontend form (discussed below). I believed that was all we needed here to get the required functionality. 

## Frontend
 - The frontend is essentially a single React component. If this were a larger app, I'd consider further modularization (for example, perhaps modularizing the table itself into its own component). To avoid requiring prop drilling or global states, I've kept it at one component for this exercise. 
 - The component essentially has two main features: a form and a table. I leveraged Reacts useState hook to manage the various states within the component, including states for a loading message and an invalid URL message. 

## Version Control
- I used Git for version control. 

### Room For Improvement 
 - Currently the URL input form only accepts urls with the proper "http..." form. I'd like to add 'cleanup' logic so that the app can 'add' missing pieces of the a URL like "http" if the user omits them. 
 - With more time, I would have liked to refine the Puppeteer extraction of the text. As I was testing the app I did catch edge cases where the app seemed to be missing instances of a search word at a url. In particular, I noticed that the app seems to have trouble pulling texts from tables. I'd like to look further into how I can use Puppeteer to do a more comprehensive pull of the text. 
 - Also with more time, I'd add to the UX styling of the app. 

