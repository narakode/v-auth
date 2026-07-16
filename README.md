# V-Auth

A package that provides a ready-to-use authentication system for API-based applications.

> This package works seamlessly with [**Laravel FineAuth**](https://github.com/narakode/fineauth).

## Features

### Logged-in State

The logged-in state is stored in **Local Storage** to determine whether the user is authenticated.

### Current User Data

The current user is retrieved:

- After a successful login.
- On every page refresh (if the user is logged in) by calling the **Get Current User** endpoint.

The user data is stored in **memory**.

### Access Token

The access token is obtained:

- After a successful login.
- After a token refresh.

The token is stored in **memory** and is automatically attached to the request headers for every API request.

Since the access token is stored only in memory, a token refresh is always performed whenever the page is refreshed.

### Refresh Token

The refresh token is stored in an **HTTP-only cookie**.

Whenever the page is refreshed and the user is logged in, the refresh token is used to obtain a new access token before calling the **Get Current User** endpoint.

### Route Guards

Built-in route guards are provided to protect routes that require authentication or should only be accessible to guests.

Configure them using the route `meta` fields.

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

First, register the route guards with your router instance.

```js
import { createRouter } from 'vue-router';
import { registerGuards } from 'v-auth';

const router = createRouter();

registerGuards(router);
```

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
import { isLoggedIn } from 'v-auth';

isLoggedIn(); // true | false
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
