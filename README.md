# Campaign Project - Client
![Image](https://github.com/oluwatoyinca/realign-client/blob/main/public/views/Screenshot%202023-12-11%20at%207.38.19%E2%80%AFPM.png?raw=true)
This application advertises 2 upcoming Career Test products on the `/coming-soon` page and allows users to fill and submit a form detailing which of the products they are interested in and want to be notified about on it's launch.

Assuming all links/redirects to the `/coming-soon` page from any ad contains a `utm_campaign` query that starts with `real_camp_123` (e.g: `real_camp_123_passion_ad`), this app also allows admins to keep track of all ads-related visits (i.e: initial page views via links containing the matching `utm_campaign` query) on the `/admin/ads-related-visits` page and all successful ads-related Campain Conversions on Goggle Tag Manager. 
A successful ads-related Campaign Conversion is triggered when all the following requirements are met:
- A user has accessed the `/coming-soon` page via an ad from the ongoing campaign, so the url contain the matching `utm_campaign` query
- The user has sucessfuly submited the form on the `/coming-soon` page

Lastly, admins can also keep track of all succesful submissions (ad-related or not) on the `/admin/campaign-conversions` page.

This application is built on React (Next) and uses Google Tag Manager

This is the client for this application. Please set up the server via [this](https://github.com/oluwatoyinca/realign-server) repository.

## Setting Up Google Tag Manager and Google Tags
Prior to setting up this application, you will need to create and set up a Google Tag Manager Account, Container and Workspace for this application:
- Visit [Add a New Account Page](https://tagmanager.google.com/?hl=en#/admin/accounts/create) on your Google-Signed-In device, provide the neccesary details, click 'Create' and agree to the 'Terms of Service Agreement'
  ![Image](https://github.com/oluwatoyinca/realign-client/blob/main/public/gtm-config-steps/Create%20GTM%20Account%20and%20Container.png?raw=true)

You also need to create an Ads conversion tag that will be trigerred each time all the previously mentioned 'succesful ads-related Campain Conversion' requirements are met:
- Create a new `JavaScript Variable` User-Defined Variable set to `window.location.search`. This variable can be named `Search Query`
  ![Image](https://github.com/oluwatoyinca/realign-client/blob/main/public/gtm-config-steps/Create%20Custom%20JavaScript%20Variable.png?raw=true)
- Create a new `Form Submission` Trigger that fires when:
    - the Built-In `Page Path` variable `contains` `/coming-soon`
    - your User-Defined `Search Query` variable `contains` `utm_campaign=real_camp_123`
  ![Image](https://github.com/oluwatoyinca/realign-client/blob/main/public/gtm-config-steps/Create%20Form%20Submission%20Trigger.png?raw=true)
- Create a new `Conversion Linker` Tag to be fired by the `Form Submission` trigger
  ![Image](https://github.com/oluwatoyinca/realign-client/blob/main/public/gtm-config-steps/Create%20Conversion%20Linker%20Tag.png?raw=true)
- Create a new `Google Ads Conversion Tracking` Tag:
    - Provide your Conersion ID and Conversion Label or random values if you have none
    - Set this tag to be fired by the `Form Submission` trigger
  ![Image](https://github.com/oluwatoyinca/realign-client/blob/main/public/gtm-config-steps/Create%20Google%20Ads%20Conversion%20Tracking%20Tag.png?raw=true)
- Submit and Publish your changes
  ![Image](https://github.com/oluwatoyinca/realign-client/blob/main/public/gtm-config-steps/Sample%20DataLayer%20on%20Successful%20trigger.png?raw=true)
  ![Image](https://github.com/oluwatoyinca/realign-client/blob/main/public/gtm-config-steps/Sample%20result%20on%20GTM%20Preview%20on%20Successful%20trigger.png?raw=true)

## Setting Up Next App
- Install dependencies `npm i`
- Add local server url as NEXT_PUBLIC_SERVER_URL to local .env file (e.g: `NEXT_PUBLIC_SERVER_URL="http://localhost:8000"`)
- Add the Google Tag Manager ID associated with your GTM account as NEXT_PUBLIC_GTM_ID to local .env file (e.g: `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXX`)
- Run `npm run start` and you should be up and running on [http://localhost:3000/](http://localhost:3000/)
