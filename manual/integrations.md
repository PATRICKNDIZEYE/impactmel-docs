# Integrations

<p class="lead">ImpactMEL brings figures in from KoboToolbox, DHIS2 and spreadsheets, and sends approved figures back to DHIS2. Everything imported arrives as a draft for review; nothing goes straight into reports.</p>

**Who can do this:** Organisation admins and M&E officers by default. Open **Integrations** in the sidebar, or **Import from Kobo or DHIS2** on the Forms page.

![The Integrations page.](/images/integrations.webp)

## Add a connector

Choose **Add connector**, then **DHIS2** or **KoboToolbox**.

![Adding a connector.](/images/integrations-add.webp)

Enter a name, the project its figures go to, and the server address (https only).

- **DHIS2:** a DHIS2 username and password. The password is stored encrypted.
- **KoboToolbox:** your API token (in KoboToolbox, Account settings, then Security, then API key) and the server: Global, EU, or another server.

On the connector page, choose **Test connection**. Under **Runs**, choose whether it runs only when someone runs it, every day or every week. Scheduled runs only import. The **Run log** keeps every run.

## KoboToolbox

Set up the connector in four steps:

1. Choose the Kobo form.
2. Map questions to indicators, and choose how each is counted: add up the answers, count submissions that answered, or count submissions that chose an option.
3. Map answers to breakdowns.
4. Choose the reporting period.

Choose **Import submissions**. Kobo submissions become draft figures in Review, under **Not sent**. Submissions marked Not approved in Kobo are skipped by default. **Copy as an ImpactMEL form** creates a draft form from the Kobo form and lists any questions it could not copy.

## DHIS2

Set up the connector in three steps:

1. Choose the data set and organisation unit.
2. Map data elements to indicators. ImpactMEL warns when units do not match, for example a count against a percentage.
3. Map category option combinations to breakdowns.

- **Import:** tick the DHIS2 periods to bring in. Monthly DHIS2 data goes into the matching ImpactMEL period, such as a quarter. Figures already imported are not added twice.
- **Export:** sends approved or locked figures only. **Check only** runs a test without sending.

## Excel and CSV

Choose **Import a spreadsheet** on the Integrations page, or **Import figures** on the Indicators page.

![Importing figures from Excel.](/images/indicator-import.webp)

1. Choose the project and reporting period, or let the sheet say.
2. **Download a template** listing the project's indicators, ready to fill.
3. Upload the sheet (.xlsx, .xls or .csv).
4. Check the preview. Each row is marked New, Update, Unchanged, Skipped or Error.
5. Confirm.

**Send the imported figures for review** is ticked by default, so the figures go to the review queue. Untick it to keep them as drafts. Either way, they count only once approved. Past imports are listed under **Spreadsheet imports**.

Participants and spending have their own imports. See [Participants](/manual/participants#import-participants) and [Budgets](/manual/budgets#record-spending).
