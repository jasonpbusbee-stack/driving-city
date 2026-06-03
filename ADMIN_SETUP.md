# City Drive Admin Setup

City Drive is currently a static browser game. Static JavaScript cannot securely prove an account identity because players can inspect and change client-side code.

The included admin panel is hidden by default and is restricted to local development hosts (`localhost`, `127.0.0.1`, or `::1`). For local testing, the game creates a local-only session for:

```js
localStorage.setItem("cityDriveAdminSession", JSON.stringify({
  accountId: "jasonpbusbee-stack",
  verified: true
}));
```

If an older browser already has the previous local test account id (`hunter`), it still works for compatibility.

For real secure admin access:

1. Add backend authentication.
2. Verify the signed-in account server-side.
3. Only issue an admin session for `jasonpbusbee-stack`.
4. Store announcements and grants on the server.
5. Do not trust localStorage or client-side checks for production admin permissions.

Current local admin tools:

- Grant all cars in this browser.
- Give points to this browser's local wallet.
- Save an announcement in this browser.
- Toggle invincibility for local testing.
- Toggle infinite points for local testing.

Public deployment behavior:

- The local admin panel does not appear on public domains.
- Client-side admin code is not production-grade authorization.
- Real public admin tools must be implemented server-side.

Current local report storage:

- Bug reports are saved in `localStorage` under `cityDriveBugReports`.
- Wire report submission to a backend endpoint to collect reports from all players.
