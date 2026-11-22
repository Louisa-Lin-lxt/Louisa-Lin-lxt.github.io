# Contact form delivery

The website is a static GitHub Pages site. Visitors submit within the existing page; Formspree stores the submission and sends a notification to the owner's verified mailbox. The visitor's `email` field becomes the reply address. The owner replies from their mail client.

## Configuration

- Owner confirmed `xingtonl@andrew.cmu.edu` is correct and receives normal email on November 22, 2026.
- `app/components/contactDelivery.ts` holds the public Formspree endpoint. This is a public form address, not an account API key. Never place account credentials or email passwords in this repository.
- `contactDeliveryVerified` must remain `false` until a real test is received in the intended mailbox. Provider acceptance alone is insufficient.
- Keep the existing Formspree spam protections. The form sends the supported `_gotcha` field, validates input, and prevents simultaneous duplicate submissions. If the dashboard requires CAPTCHA, configure its documented in-page integration rather than disabling it.
- The Formspree project is restricted to `louisa-lin-lxt.github.io`. Requests retain an origin referrer. Localhost submissions after this restriction may be classified as spam; use mocked requests for local checks.

## Verification record — November 22, 2026

- The owner completed Formspree account email verification.
- Created **Portfolio Contact**, public endpoint `https://formspree.io/f/mrpqobgj`, with an Email workflow to `xingtonl@andrew.cmu.edu`.
- Submitted one localhost test, reference `PORTFOLIO-20261122-01`. The page displayed its success state without navigating away and reset the form.
- The Formspree Inbox contains the matching submission with its name, email, category, subject and message; Spam has no matching submission.
- Saved the website domain restriction after the localhost test. Existing Formshield protection remains enabled.
- The owner confirmed the test arrived in the CMU inbox. `contactDeliveryVerified` is now `true`; the form displays the short delivery/privacy note instead of the unverified notice.

## Activation and verification

1. Finish account email verification, create a form, and confirm the Email workflow points to the intended CMU mailbox.
2. Copy its public `https://formspree.io/f/…` endpoint into `contactDelivery.ts`.
3. Submit one identifiable test through the website. Confirm the in-page success response, the corresponding Formspree inbox record, and receipt in the CMU mailbox. If a record exists but mail does not arrive, check notification settings and school quarantine.
4. Confirm Reply-To is the controlled test sender's address. A full reply test requires a controlled sender inbox and the owner sending a reply.
5. Only after receipt, set `contactDeliveryVerified` to `true`, build, publish the tracked root export and verify the live form.

The previous FormSubmit test was blocked by the provider and its activation email was never received. No bypass or retry of that blocked request is part of this migration. Formspree replaces that delivery path.

## Local checks

`npm run test:contact` uses mocked requests only. It checks routing fields, unchanged form data, rejection of invalid/unconfigured requests, provider errors, malformed responses, rate limiting and timeouts without retries. It does not send email.

Formspree's official client recognizes `{ next: string }` as acceptance. The website checks HTTP success and absence of errors, and stays on the page rather than following `next`.

References: [form setup](https://help.formspree.io/articles/building-your-form/building-an-html-form/), [response types](https://github.com/formspree/formspree-js/blob/main/packages/formspree-core/src/submission.ts), [Reply-To](https://help.formspree.io/articles/building-your-form/email-reply-to-address), [domain restriction](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain).
