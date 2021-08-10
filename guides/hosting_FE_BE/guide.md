# Overview and Guide on Hosting The Portal and Backend API:

**Remember to pay any hosting bill that we have, or else our settings might get wiped and then it will be a real pain to set everything up again!**

## Hosting and Domain Name Platforms:
- For the production and development portals, we use `Netlify` to host, build and deploy it. We also use Netlify to set up and run tests on our Pull Requests (PRs) whenever one or more new commits are made to an existing PR.
- For the production and development backend API, we use `Heroku` to host, build and deploy it.
- For our domain `hknucsd.com`, we are using `Namecheap` to manage it.
- For managing DNS records and TLS/SSL, we are using `Cloudflare` to do so.

## How To Work With These Platforms:
- `Namecheap` is where we manage our domain. Currently, we do not use Namecheap's DNS nameserver. Instead, we offload that work to `Cloudflare`, from whom we get several nameservers for free. Unless we use something else in the future, the nameservers for our domain on `Namecheap` should always be those of `Cloudflare`.
- In the case one forgets to renew our domain after it expires, contact `Namecheap` support in order to get it back (this has happened already, try not to let it happen again). In this case, `Cloudflare` will remove all settings and setup that you have for our domain. To add everything back:
    - Go to `Cloudflare`, click "Add a site", then enter `hknucsd.com`. 
    - Go through some of the things `Cloudflare` needs to set up the domain with it. 
    - After that, go to the "DNS" portion of your site (`hknucsd.com`) and then to the "DNS Management for hknucsd.com" portion.
    - Add CNAME records for both production and development backend API (`api` and `dev-api`) using `Heroku`, which contains DNS targets needed for the CNAME records.
    - Add CNAME records for both production and development portal (`portal` and `dev-portal`), as well as `storybook`, using `Netlify`, which contains DNS targets needed for the CNAME records. To find the DNS target for each site on `Netlify`, go to their domain settings and go to the "Custom Domains" part of that settings page.
- Production portal and backend API all have TLS/SSL to encrypt their traffic, the portal using `Cloudflare` and the backend API using `Heroku`. `Netlify` is not used for TLS/SSL at all. Therefore, make sure production portal and backend API have TLS/SSL enabled by checking `Cloudflare` and `Heroku`. If our domain expires, `Heroku` SSL for our production API will not work.