# IBM Strategic Dashboard | Client

This is the client side of a full stack application made in collaboration with IBM to improve the data analytics when it comes to their employee's certifications, courses, badges, and overall the offer of IBM's educational content to their human resource.

## Next JS
It uses NextJS and server-side rendering to display the same dashboard to exclusively IBM employees with an executive or related roles capable of making decisions with this information.

## Pre-requisites
For the Web App to work as expected it is crucial to have running the following services:
- [The API](https://github.com/Bugs-io/ibm-dashboard-api)
- [The data analysis tool](https://github.com/Bugs-io/ibm-dashboard-data-analysis)

Of course, it is also needed to have the LTS version of NPM.

## Installation
1. Download the repository.
2. Run the external services mentioned above.
3. run `npm install` to install all the dependencies like NextJS itself, Carbon Design, Carbon Charts, and more.
4. Set up environmental variables by creating a file called `.env.local` in the root of the project and create a variable called `NEXT_PUBLIC_API_URL` and set it to the URL of where the API instance mentioned above is running. There is a simple `.env.local.example` file to ilustrate this.
5. Once every dependency is install run `npm run dev`.

This is going to start a server on `localhost:3000`. When accesed to this address from a broswer, the web app is going to be compiled by the server and then sent to the browser.
