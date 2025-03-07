# IAV Frontend Framework Documentation

## React Project

This is the IAV Frontend Framework, built using React.

### Structure

- Every new page should be wrapped in the `<Page>` component.
- You can use helper components like `<Title>`, `<SubTitle>`, and `<Text>` to create your own page structure.

### Adding a New Page

To add a new page:

1. Create a new page component (e.g., `MyPage.tsx`).
2. Wrap the content of the page in the `<Page>` component.
3. Add the page with a URI to the router in `layout.tsx`.

### Build

To build the project, run:

```bash
npm run build
