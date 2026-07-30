diff between client side and server side and explain Use "use client" only when a component needs client-side features.

---

This is one of the most important concepts in modern Next.js. Understanding **Server Components vs Client Components** will make the rest of Next.js much easier.

---

# What is Server Side vs Client Side?

Think of a website as a restaurant.

* **Server** = The kitchen 🍳
* **Client** = The customer sitting at the table 🍽️

The kitchen prepares the food before sending it out.

The customer receives the food and can interact with it.

The same idea applies to Next.js.

---

## Server Side

Code runs on the **server** (the computer hosting your website).

```
Browser
    │
    │ Request page
    ▼
Next.js Server
    │
    │ Runs your code
    │ Fetches database/API
    │ Creates HTML
    ▼
Browser receives finished page
```

Example:

```tsx
export default async function Home() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await users.json();

  return (
    <ul>
      {data.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

What happens?

1. Browser requests `/`
2. Server fetches users.
3. Server builds HTML.
4. HTML is sent to the browser.
5. User immediately sees the list.

The browser **never performs the fetch**.

---

## Client Side

The browser downloads JavaScript and runs it.

```
Browser
    │
Downloads JS
    │
Runs React
    │
User clicks button
    │
State updates
```

Example:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

Here:

* JavaScript runs in the browser.
* Clicking the button updates the UI instantly.
* No server is needed for each click.

---

# Why does Next.js prefer Server Components?

Imagine you have a blog with 10,000 visitors.

### Traditional React

Every visitor downloads:

* React
* Your page JavaScript
* Fetch code
* Rendering code

Every browser repeats the same work.

---

### Next.js Server Component

The server does the work once for each request:

* Fetch data
* Build HTML
* Send finished HTML

The browser downloads much less JavaScript.

Advantages:

* Faster page loads
* Better SEO
* Smaller JavaScript bundles
* Improved performance

That's why **Server Components are the default in the App Router**.

---

# What can't a Server Component do?

Since it runs on the server, it **doesn't have access to the browser**.

It cannot use:

```tsx
useState()
```

```tsx
useEffect()
```

```tsx
window
```

```tsx
document
```

```tsx
localStorage
```

```tsx
onClick
```

Why?

Because those things only exist **inside the user's browser**.

---

# Why `"use client"` exists

Normally, Next.js assumes every component is a **Server Component**.

When you write:

```tsx
export default function Button() {
  return <button>Click</button>;
}
```

Next.js thinks:

> "I'll execute this on the server."

But if you need browser features, you must tell Next.js:

```tsx
"use client";
```

This changes the component into a **Client Component**.

---

# Example without `"use client"`

```tsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button>{count}</button>;
}
```

This produces an error because `useState` only works in Client Components.

---

# Example with `"use client"`

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

Now the component is sent to the browser, and React can manage the state there.

---

# When should you use `"use client"`?

Only when you need browser-only features.

### 1. React Hooks

```tsx
"use client";

const [name, setName] = useState("");
```

---

### 2. Event handlers

```tsx
"use client";

<button onClick={save}>Save</button>
```

---

### 3. Browser APIs

```tsx
"use client";

localStorage.setItem("theme", "dark");
```

or

```tsx
window.location.href = "/login";
```

---

### 4. Forms

```tsx
"use client";

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

---

### 5. Animations

Libraries such as Framer Motion need `"use client"` because they run in the browser.

---

# When you DON'T need `"use client"`

Displaying static content:

```tsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We build software.</p>
    </div>
  );
}
```

Fetching data:

```tsx
export default async function Products() {
  const products = await getProducts();

  return <ProductsList products={products} />;
}
```

Rendering lists:

```tsx
<ul>
  {users.map(user => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>
```

These work perfectly as Server Components.

---

# A practical example

Suppose you're building a product page.

**Server Component (`app/products/page.tsx`)**

```tsx
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage() {
  const product = await getProduct();

  return (
    <>
      <h1>{product.name}</h1>
      <p>£{product.price}</p>

      <AddToCartButton />
    </>
  );
}
```

The server fetches the product data and renders the page.

**Client Component (`components/AddToCartButton.tsx`)**

```tsx
"use client";

import { useState } from "react";

export default function AddToCartButton() {
  const [added, setAdded] = useState(false);

  return (
    <button onClick={() => setAdded(true)}>
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
```

Only the button needs browser interactivity, so only that component is marked with `"use client"`.

---

# Summary

| Server Component (default)                            | Client Component (`"use client"`)            |
| ----------------------------------------------------- | -------------------------------------------- |
| Runs on the server                                    | Runs in the browser                          |
| Faster initial load                                   | Supports interactivity                       |
| Can fetch data directly                               | Can use `useState` and `useEffect`           |
| Smaller JavaScript bundle                             | Sends more JavaScript to the browser         |
| Great for SEO                                         | Required for browser APIs and event handlers |
| Cannot access `window`, `document`, or `localStorage` | Can access browser APIs                      |

**A good rule of thumb:** Start with a **Server Component**. If you later need state, effects, event handlers, or browser APIs, move just that component to the client by adding `"use client"` at the top. This keeps your application fast while still providing rich interactivity where it's needed.
