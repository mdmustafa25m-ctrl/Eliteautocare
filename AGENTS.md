<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Website architecture
- Keep shareable website sections in separate TanStack routes with reusable presentation components; this gives each page working navigation and its own metadata.
- Centralize business contact settings and WhatsApp URL validation in a browser-safe configuration module; unset details must never create fake destinations or submission claims.
- The enquiry form prepares a validated message locally until a real delivery service is connected; never represent preparation as delivery.
