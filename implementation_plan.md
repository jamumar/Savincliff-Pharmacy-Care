# Implementation Plan — Serverless Firebase CMS

We will set up a serverless headless CMS for the pharma platform using **Firebase (Firestore, Storage, and Auth)**. This allows the client to dynamically update text contents, fonts, sizes, weights, background/text colors, and upload media (images, videos) directly from a secure admin panel hosted on the Vercel app, without altering code or hosting any Python/Node servers.

> [!NOTE]
> For a detailed, page-by-page list of all visual styling properties, copy texts, block sections, and media assets that will be controllable from this CMS, refer to the [cms_capabilities.md](file:///Users/umarkhalid/.gemini/antigravity-ide/brain/694d1bdd-1240-430f-a54f-4e8ac967b412/cms_capabilities.md) document.

---

## User Review Required

> [!IMPORTANT]
> **Firebase Project Setup & Credentials**
> Because we do not have direct access to your Firebase Account Console, you will need to:
> 1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
> 2. Enable **Firestore Database** in test mode or production mode.
> 3. Enable **Firebase Auth** with Email/Password sign-in provider.
> 4. Enable **Firebase Storage** (to host video and image uploads).
> 5. Create a Web App configuration, copy the config object keys, and place them in a frontend `.env` file.

---

## Open Questions

> [!WARNING]
> 1. **Do you have an existing Firebase Project ID** we should link to, or would you like to create one now and supply the environment configuration?
> 2. **Authentication Access**: Do you have a preferred email address you'd like to configure as the default Admin login, or would you prefer to add administrators manually inside the Firebase Auth Console?

---

## Proposed Changes

We will install `firebase` package in the `frontend` directory, configure environment variables, design the data structure, build the dynamic renderer for `Home.jsx` and `About.jsx`, and construct the Admin panel.

### 1. Core Integration & Dependencies

#### [MODIFY] [package.json](file:///Users/umarkhalid/Desktop/pharma/frontend/package.json)
*   Add `firebase` to the list of dependencies.

#### [NEW] [.env.local](file:///Users/umarkhalid/Desktop/pharma/frontend/.env.local) & [.env](file:///Users/umarkhalid/Desktop/pharma/frontend/.env)
*   Store Firebase configurations securely (API Key, Auth Domain, Project ID, Storage Bucket, Messaging Sender ID, App ID).

#### [NEW] [firebase.js](file:///Users/umarkhalid/Desktop/pharma/frontend/src/lib/firebase.js)
*   Initialize the Firebase app.
*   Export `auth`, `db` (Firestore), and `storage` (Cloud Storage) instances.

---

### 2. Layout Schema in Firestore

We will structure the Firestore database with a `pages` collection.
*   **Document `home`**:
    ```json
    {
      "manifesto": {
        "text": "We are a clinical pharmacy where science meets precision...",
        "styles": {
          "fontSizeMobile": "text-2xl",
          "fontSizeDesktop": "md:text-5xl",
          "fontWeight": "font-bold",
          "textTransform": "uppercase",
          "lineHeight": "leading-[1.1]",
          "letterSpacing": "tracking-tight"
        }
      },
      "cta": {
        "title": "LET’S DELIVER",
        "highlightWord": "something",
        "endWord": "VITAL",
        "styles": {
          "fontSize": "text-[7vw] md:text-[6vw]"
        }
      }
    }
    ```
*   **Document `about`**:
    ```json
    {
      "narrative": {
        "words": [
          { "text": "We" }, { "text": "are" }, ...
        ],
        "styles": {
          "fontSizeMobile": "text-2xl",
          "fontSizeDesktop": "md:text-5xl",
          "fontWeight": "font-bold",
          "textTransform": "uppercase",
          "lineHeight": "leading-[1.1]",
          "letterSpacing": "tracking-tight"
        }
      },
      "videoUrl": "/animations/whatsapp_2.mp4",
      "heroWords": ["PRECISION", "WELLNESS", "HUMANITY", "FUTURE"]
    }
    ```

---

### 3. Dynamic Page Upgrades

#### [MODIFY] [Home.jsx](file:///Users/umarkhalid/Desktop/pharma/frontend/src/pages/Home.jsx)
*   Fetch `home` configuration document from Firestore on load.
*   Fall back to local static constants if loading or if Firestore is empty.
*   Bind the elements (Manifesto text, classNames, final CTA text sizes) to the loaded state.

#### [MODIFY] [About.jsx](file:///Users/umarkhalid/Desktop/pharma/frontend/src/pages/About.jsx)
*   Fetch `about` configuration document from Firestore on load.
*   Bind the narrative paragraph text, classNames, hero words, and video source URL to the loaded state.

---

### 4. Admin CMS Interface

#### [NEW] [AdminRoute.jsx](file:///Users/umarkhalid/Desktop/pharma/frontend/src/components/shared/AdminRoute.jsx)
*   A wrapper route that checks Firebase `auth.currentUser`. Redirects to `/admin/login` if not authenticated.

#### [NEW] [Login.jsx](file:///Users/umarkhalid/Desktop/pharma/frontend/src/pages/admin/Login.jsx)
*   A clean, minimal, premium dark-mode form utilizing `auth.signInWithEmailAndPassword` for authentication.

#### [NEW] [Dashboard.jsx](file:///Users/umarkhalid/Desktop/pharma/frontend/src/pages/admin/Dashboard.jsx)
*   A fully styled editor interface (matching our premium design theme) consisting of:
    *   **Page Tabs**: Home Page Editor, About Page Editor.
    *   **Text inputs / Textareas**: For modifying paragraph text and words.
    *   **Style Dropdowns**: Selectors for font weight (`font-medium`, `font-bold`), size (`text-xl`, `text-2xl`, etc.), and capitalization options.
    *   **Media Upload Zone**: Handles file input, uploads files directly to Firebase Storage, displays progress bars, and sets the returned video/image URLs on the page configurations.
    *   **Save Changes**: Writes updates directly back to Firestore.

#### [MODIFY] [App.jsx](file:///Users/umarkhalid/Desktop/pharma/frontend/src/App.jsx)
*   Register `/admin` and `/admin/login` routes.

---

## Verification Plan

### Automated Verification
*   Compile and build the Vite project locally: `npm run build`.
*   Run the dev server: `npm run dev` to verify routes and check console errors.

### Manual Verification
1.  **Authentication**: Attempt accessing `/admin` (should redirect to `/admin/login`).
2.  **CMS Content Edits**: Log in, edit the text of the main manifesto paragraph on the Home tab, and click Save. Refresh the website to verify changes are immediately fetched.
3.  **Aesthetic / Style Changes**: Select a different font size/weight from the dashboard, save, and verify visual change.
4.  **Media Uploads**: Upload a new mp4 video file on the About page tab. Verify it uploads to Cloud Storage and renders as the active background video correctly.
