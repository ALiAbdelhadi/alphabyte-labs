import fetch, { RequestInit } from "node-fetch"
import { HttpsProxyAgent } from "https-proxy-agent"

export async function fetchWithProxy(url: string, init: RequestInit = {}) {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy
  const noProxy = process.env.NO_PROXY || process.env.no_proxy

  const shouldBypass = noProxy && noProxy.split(',').some(domain => url.includes(domain.trim()))

  const agent = !shouldBypass && proxy ? new HttpsProxyAgent(proxy) : undefined

  const res = await fetch(url, {
    ...init,
    // @ts-ignore node-fetch typing compatibility for agent
    agent,
  })
  return res
}
