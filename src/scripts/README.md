To whoever is reading this - sorry :)

I'm too lazy to write everything out, so tl;dr:

1. Grab the check in csv (export gsheets as csv) and run the python script - it'll generate a json
2. The `restore_points.ts` script does a bunch of stuff
   - Restores points for people who were checked off but did not get points
   - Fix up a couple events (13/33) that couldn't be checked off
   - Adds in people from the event check in Google Sheets

Run the script like this `npm run build; NODE_ENV=development node -r dotenv/config -r module-alias/register dist/scripts/restore_points.js`

The script will run against whatever db is specified in your `.env` file.
