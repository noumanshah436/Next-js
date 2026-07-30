how to create components in nextjs

-----------------------------------------------


In Next.js, components are just reusable React functions. You create them in separate files and then import them wherever you need them.

## 1. Create a `components` folder

A common project structure looks like this:

```text
my-next-app/
│── app/
│── components/
│   ├── Button.tsx
│   ├── Navbar.tsx
│   └── Card.tsx
│── public/
│── package.json
```

> The `components` folder can be placed anywhere, but keeping it in the project root is the most common approach.

---

## 2. Create your first component

### `components/Button.tsx`

```tsx
type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded">
      {text}
    </button>
  );
}
```

---

## 3. Use the component

In `app/page.tsx`:

```tsx
import Button from "@/components/Button";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js</h1>

      <Button text="Click Me" />
    </main>
  );
}
```

Output:

```
Welcome to Next.js

[ Click Me ]
```

---

# Component with children

Sometimes you want to wrap other content.

```tsx
type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="border rounded-lg p-4 shadow">
      {children}
    </div>
  );
}
```

Usage:

```tsx
import Card from "@/components/Card";

export default function Home() {
  return (
    <Card>
      <h2>Product</h2>
      <p>Price: $50</p>
    </Card>
  );
}
```

---

# Client Components

By default, components inside the **App Router** are **Server Components**.

If your component uses:

* `useState`
* `useEffect`
* event handlers (`onClick`)
* browser APIs (`window`, `localStorage`)

add this at the top:

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

Without `"use client"`, Next.js will show an error because hooks and browser interactions are only available in Client Components.

---

# Passing multiple props

```tsx
type UserCardProps = {
  name: string;
  age: number;
};

export default function UserCard({ name, age }: UserCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age} years old</p>
    </div>
  );
}
```

Usage:

```tsx
<UserCard
  name="Nouman"
  age={24}
/>
```

---

# Component composition

Instead of creating large components, build small reusable ones.

```tsx
// Navbar.tsx
export default function Navbar() {
  return <nav>Navbar</nav>;
}
```

```tsx
// Footer.tsx
export default function Footer() {
  return <footer>Footer</footer>;
}
```

```tsx
// app/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <h1>Home Page</h1>
      </main>

      <Footer />
    </>
  );
}
```

---

# Organising larger components

For more complex components, keep related files together:

```text
components/
└── Navbar/
    ├── Navbar.tsx
    ├── NavItem.tsx
    ├── Logo.tsx
    ├── styles.module.css
    └── index.ts
```

`index.ts`

```ts
export { default } from "./Navbar";
```

Then you can import it cleanly:

```tsx
import Navbar from "@/components/Navbar";
```

---

## Best practices

* Keep each component focused on a single responsibility.
* Use **TypeScript** interfaces or types for props.
* Place reusable UI in the `components` folder.
* Use `"use client"` only when a component needs client-side features.
* Break large components into smaller, reusable pieces.

If you're using **Next.js 15 with the App Router**, this is the recommended approach and aligns with current best practices.

