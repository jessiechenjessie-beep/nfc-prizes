# NFC Writer Prize Website

A one-page, mobile-friendly prize website for NFC cards. It uses plain HTML,
CSS, and JavaScript—no app, login, database, tracking, or paid service.

## 1. How the website works

Each NFC card stores the same website address with a different `card` number:

```text
https://example.com/?card=7
```

When the page opens, `script.js` reads `card`, checks that it is a whole number
from 1 to 20, looks up the text in `PRIZE_MESSAGES`, and displays the prize. An
invalid value shows the teacher-help message and a **Test Prize #1** button.

## 2. Test all 20 card URLs locally

Opening `index.html` directly usually works, but a local server is more accurate.

### Visual Studio Code

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`, then choose **Open with Live Server**.
4. If the address is `http://127.0.0.1:5500/`, test
   `http://127.0.0.1:5500/?card=1`.
5. Change the final number to test cards 2 through 20.
6. Test the address without `?card=` and with `?card=21` for the error screen.

### Python

In a terminal opened inside this folder, run:

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000/?card=1`, change the number through 20, and press
`Ctrl+C` when finished.

## 3. Edit the messages

Open `script.js`. Near the top is the clearly labeled `PRIZE_MESSAGES` object.
Change only the message inside the quotation marks after each number. Keep the
numbers 1 through 20 unchanged. Save the file and refresh the browser.

## 4. Publish free with GitHub Pages

1. Sign in at [github.com](https://github.com/).
2. Click **+ → New repository** and name it (for example, `nfc-prizes`).
3. Choose **Public**, add no template files, and create the repository.
4. Choose **Add file → Upload files**.
5. Upload all five files in this folder. They must be at the top level.
6. Choose **Commit changes**.
7. Open **Settings → Pages**.
8. Under **Build and deployment**, select **Deploy from a branch**.
9. Select `main` and `/ (root)`, then choose **Save**.
10. Wait a few minutes and refresh the Pages settings screen.

## 5. Get the final public URL

GitHub shows the address near the top of **Settings → Pages**. It usually looks
like:

```text
https://YOUR-GITHUB-NAME.github.io/nfc-prizes
```

Copy the exact address GitHub shows and open it on a phone.

## 6. Create the 20 NFC URLs

Open `nfc-urls.txt`. Use **Find and Replace** to replace every occurrence of:

```text
PUBLIC_URL
```

with the exact GitHub Pages address. Do not add a slash at the end. Example:

```text
https://YOUR-GITHUB-NAME.github.io/nfc-prizes/?card=1
```

## 7. Write the URLs with NFC Tools

1. Install **NFC Tools** on the teacher's iPhone or Android phone.
2. Open it and choose **Write → Add a record → Custom URL/URI**.
3. Paste the complete URL for card 1 and choose **OK → Write**.
4. Hold the NFC card near the phone until writing is confirmed.
5. Label the physical card `1`.
6. Repeat with the matching URL for cards 2 through 20.

Use an `https://` URL and test every card. Menu wording may vary slightly by
phone and app version.

## 8. Update later without rewriting cards

Edit `PRIZE_MESSAGES` in `script.js`, upload the changed file to the same GitHub
repository, and commit it. GitHub Pages republishes the same address, so the NFC
cards keep working. Rewrite cards only if the website address or `?card=` number
changes.

## Final phone checklist

### iPhone

- Unlock the phone and hold its top near the card.
- Tap the notification and verify the prize number and exact message.
- Test **Celebrate Again** and **Play Winner Sound**.
- Confirm sound does not play before the button is tapped.
- Test with Safari on Wi-Fi and, if available, mobile data.

### Android

- Turn on NFC in Settings if the phone has an NFC switch.
- Unlock the phone and hold its back near the card.
- Open the link and verify the prize number and exact message.
- Test both buttons and confirm sound does not autoplay.
- Test with Chrome on Wi-Fi and, if available, mobile data.

### Every card

- Test all 20 cards one by one.
- Confirm the physical label matches the on-screen prize number.
- Check readability in portrait orientation.
- Test `?card=21` once to verify the teacher-help screen.
