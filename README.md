# V-Auth

A package that provides a ready-to-use authentication system for API-based applications.

> This package works seamlessly with [**Laravel FineAuth**](https://github.com/narakode/fineauth).

## Instalation

```bash
npm install v-auth
```

Install to vue instance.

```js
import createApp from 'vue';
import vAuth from 'v-auth';

const app = createApp();

app.use(vAuth);
```

Register the route guards with your router instance.

```js
import { createRouter } from 'vue-router';
import { registerGuards } from 'v-auth';

const router = createRouter();

registerGuards(router);
```

## Guide

### Login

You must implement your own API login flow.

After a successful login, your API should return the **token**, **user**, and **meta** objects (optional). Then, call the `login` helper with those values.

```js
import { login } from 'v-auth';

login(token, user, meta);
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

### Check the Login State

```js
import { loggedIn } from 'v-auth';

loggedIn.value; // true | false
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
