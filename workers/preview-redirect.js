/** Retired preview host — permanently send traffic to production. */
export default {
  fetch(request) {
    const incoming = new URL(request.url)
    const target = new URL(incoming.pathname + incoming.search + incoming.hash, "https://samarthagamanainfra.com")
    return Response.redirect(target.toString(), 301)
  },
}
