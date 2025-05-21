# Debugging Errors

If you see "An error occurred, please try again" when submitting a question,
open the browser developer tools and check the Network and Console tabs. The
request to `/api/chat` should display the status code and any error message from
the server.

You can also run the application with additional logging by enabling the
Next.js development mode:

```bash
pnpm dev
```

When an error occurs the console will output more details.
