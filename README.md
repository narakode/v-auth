# V-Auth

A package that provides a ready-to-use authentication system for API-based applications.

> This package works seamlessly with [**Laravel FineAuth**](https://github.com/narakode/fineauth).

## Installation

Install the package.

```bash
npm install v-auth
```

Install it into your Vue application.

```js
import { createApp } from 'vue';
import vAuth from 'v-auth';

const app = createApp();

app.use(vAuth);
```

Register the route guards with your router instance.

- `redirectOnUnauthenticated` specifies the path to redirect unauthenticated users to.
- `redirectOnAuthenticated` specifies the path to redirect authenticated users to.

```js
import { createRouter } from 'vue-router';
import { registerGuards } from 'v-auth';

const router = createRouter();

registerGuards(router, {
  redirectOnUnauthenticated: '/login',
  redirectOnAuthenticated: '/',
});
```

## Guide

### Login

You must implement your own API login flow.

After a successful login, your API should return the following values, then call the `login` helper.

- `token` — a string.
- `user` — an object.
- `expires_at` _(optional)_ — a `Date`, date string, or timestamp.
- `meta` _(optional)_ — an object.

```js
import { login } from 'v-auth';

login(token, user, expires_at, meta);
```

> After logging in, you must manually redirect the user to the home or dashboard page.

### Protect Routes for Guests and Authenticated Users

Add `auth: true` to routes that require authentication.

```js
const router = createRouter([
  {
    path: '/',
    name: 'dashboard',
    meta: {
      auth: true,
    },
  },
]);
```

Add `guest: true` to routes that should only be accessible to guests.

```js
const router = createRouter([
  {
    path: '/login',
    name: 'login',
    meta: {
      guest: true,
    },
  },
]);
```

### Load Current User

The current user and meta are stored in memory, so they are cleared when the page is refreshed.

You need to call your API's **Get Current User** endpoint when the application loads.

```vue
<script setup>
async function loadCurrentUser() {
  // ...
}

loadCurrentUser();
</script>
```

### Refresh Token

The access token is stored in memory, so it is cleared when the page is refreshed.

You need to call your API's **Refresh Token** endpoint whenever the application loads.

```vue
<script setup>
async function refreshToken() {
  // ...
}

refreshToken();
</script>
```

### Check the Login State

```js
import { loggedIn } from 'v-auth';

loggedIn.value; // true | false
```

### Check Whether the Access Token Has Expired

```js
import { isExpired } from 'v-auth';

isExpired(); // true | false
```

### Access Token

```js
import { accessToken } from 'v-auth';

accessToken.value; // 'jdaosjdosa' | null
```

### Current User and Meta

Access the current user through the read-only `user` computed value.

Access the meta object through the read-only `meta` computed value.

```js
import { user, meta } from 'v-auth';

console.log(user.value);
console.log(meta.value);
```

### Logout

```js
import { logout } from 'v-auth';

logout();
```

> After logging out, you must manually redirect the user to `/login`.
