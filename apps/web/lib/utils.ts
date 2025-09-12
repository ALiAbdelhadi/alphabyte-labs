import searchData from "@/public/search-data/documents.json"
import { clsx, type ClassValue } from "clsx"
import sanitizeHtml from "sanitize-html"
import { twMerge } from "tailwind-merge"

import { Paths } from "@/lib/pageRoutes"
import { createBilingualSearchTerms } from "@/lib/arabic-search-mapping"

export type search = {
  title: string
  href: string
  snippet?: string
  description?: string
  relevance?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      const cachedResult = cache.get(key)
      if (cachedResult !== undefined) {
        return cachedResult
      }
    }

    const result = fn(...args)

    if (result !== "" && result != null) {
      cache.set(key, result)
    }

    return result
  }) as T
}

const memoizedSearchMatch = memoize(searchMatch)
const memoizedCleanMdxContent = memoize(cleanMdxContent)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function isRoute(
  node: Paths
): node is Extract<Paths, { href: string; title: string }> {
  return "href" in node && "title" in node
}

export function helperSearch(
  query: string,
  node: Paths,
  prefix: string,
  currentLevel: number,
  maxLevel?: number
) {
  const res: Paths[] = []
  let parentHas = false
  const lowerQuery = query.toLowerCase()

  if (isRoute(node)) {
    const route = node as unknown as {
      href: string
      title: string
      items?: Paths[]
      id?: string
      noLink?: boolean
    }
    const nextLink = `${prefix}${route.href}`

    // إنشاء مصطلحات البحث باللغتين
    const bilingualSearchTerms = createBilingualSearchTerms(query)
    const searchTerms = bilingualSearchTerms.map(term => term.toLowerCase())

    // البحث في العنوان باستخدام المصطلحات متعددة اللغات
    const titleMatch = searchTerms.some(term =>
      route.title.toLowerCase().includes(term)
    )
    
    const titleDistance = Math.min(
      ...searchTerms.map(term =>
        memoizedSearchMatch(term, route.title.toLowerCase())
      )
    )

    if (titleMatch || titleDistance <= 2) {
      const pushed: Paths = { title: route.title, href: nextLink } as unknown as Paths
      res.push(pushed)
      parentHas = true
    }

    const goNext = maxLevel ? currentLevel < maxLevel : true

    if (goNext && route.items) {
      route.items.forEach((item: Paths) => {
        const innerRes = helperSearch(
          query,
          item,
          nextLink,
          currentLevel + 1,
          maxLevel
        )
        if (innerRes.length && !parentHas && !route.noLink) {
          const pushed: Paths = { title: route.title, href: nextLink } as unknown as Paths
          res.push(pushed)
          parentHas = true
        }
        res.push(...innerRes)
      })
    }
  }

  return res
}

function searchMatch(a: string, b: string): number {
  if (typeof a !== "string" || typeof b !== "string") return 0

  const aLen = a.length
  const bLen = b.length

  if (aLen === 0) return bLen
  if (bLen === 0) return aLen

  if (aLen > bLen) [a, b] = [b, a]

  const maxDistance = Math.min(Math.max(Math.floor(aLen / 2), 2), 5)

  let prevRow = Array(aLen + 1).fill(0)
  let currRow = Array(aLen + 1).fill(0)

  for (let i = 0; i <= aLen; i++) prevRow[i] = i

  for (let j = 1; j <= bLen; j++) {
    currRow[0] = j
    for (let i = 1; i <= aLen; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      currRow[i] = Math.min(
        prevRow[i] + 1,
        currRow[i - 1] + 1,
        prevRow[i - 1] + cost
      )

      if (currRow[i] > maxDistance) {
        return maxDistance
      }
    }
    ;[prevRow, currRow] = [currRow, prevRow]
  }

  return Math.min(prevRow[aLen], maxDistance)
}

function calculateRelevance(
  query: string,
  title: string,
  content: string
): number {
  const lowerQuery = query.toLowerCase().trim()
  const lowerTitle = title.toLowerCase()
  const lowerContent = memoizedCleanMdxContent(content)
  const queryWords = lowerQuery.split(/\s+/)

  let score = 0

  if (lowerTitle === lowerQuery) {
    score += 200
  } else if (lowerTitle.includes(lowerQuery)) {
    score += 100
  } else {
    queryWords.forEach((word) => {
      if (lowerTitle.includes(word)) {
        score += 50
      }
    })
  }

  const titleDistances = queryWords.map((word) =>
    memoizedSearchMatch(word, lowerTitle)
  )
  for (const distance of titleDistances) {
    if (distance <= 2) {
      score += 20
    }
  }

  const exactMatches = lowerContent.match(
    new RegExp(`\\b${lowerQuery}\\b`, "gi")
  )
  if (exactMatches) {
    score += exactMatches.length * 20
  }

  queryWords.forEach((word) => {
    if (lowerContent.includes(word)) {
      score += 5
    }
  })

  const proximityScore = calculateProximityScore(lowerQuery, lowerContent)
  score += proximityScore * 2

  const lengthNormalizationFactor = Math.log(content.length + 1)
  return score / lengthNormalizationFactor
}

function calculateProximityScore(query: string, content: string): number {
  if (typeof query !== "string" || typeof content !== "string") return 0

  const words = content.split(/\s+/)
  const queryWords = query.split(/\s+/)

  let proximityScore = 0
  let firstIndex = -1

  queryWords.forEach((queryWord, queryIndex) => {
    const wordIndex = words.indexOf(queryWord, firstIndex + 1)

    if (wordIndex !== -1) {
      if (queryIndex === 0) {
        proximityScore += 30
      } else if (wordIndex - firstIndex <= 3) {
        proximityScore += 20 - (wordIndex - firstIndex)
      }

      firstIndex = wordIndex
    } else {
      firstIndex = -1
    }
  })

  return proximityScore
}

function cleanMdxContent(content: string): string {
  let sanitizedContent = sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: (text) => text.replace(/\s+/g, " ").trim(),
  })

  sanitizedContent = sanitizedContent.replace(
    /&(#(?:\d+)|(?:[a-z]+));/gi,
    (_, entity) => {
      if (entity.startsWith("#")) {
        const code = parseInt(entity.substring(1), 10)
        return String.fromCharCode(code)
      }
      const entities: { [key: string]: string } = {
        amp: "&",
        lt: "<",
        gt: ">",
        nbsp: " ",
        quot: '"',
        apos: "'",
      }
      return entities[entity.toLowerCase()] || ""
    }
  )

  return sanitizedContent
}

function safeURI(str: string): string {
  try {
    return decodeURIComponent(str)
  } catch {
    return str
  }
}

function extractSnippet(content: string, query: string): string {
  const lowerContent = content.toLowerCase()
  const queryWords = query.toLowerCase().split(/\s+/)

  const indices: number[] = []
  queryWords.forEach((word) => {
    const index = lowerContent.indexOf(word)
    if (index !== -1) {
      indices.push(index)
    }
  })

  if (indices.length === 0) {
    return content.slice(0, 100)
  }

  const avgIndex = Math.floor(indices.reduce((a, b) => a + b) / indices.length)
  const snippetLength = 150
  const contextLength = Math.floor(snippetLength / 2)
  const start = Math.max(0, avgIndex - contextLength)
  const end = Math.min(avgIndex + contextLength, content.length)

  let snippet = content.slice(start, end).replace(/\n/g, " ").trim()
  snippet = safeURI(snippet)
  if (start > 0) snippet = `...${snippet}`
  if (end < content.length) snippet += "..."

  return snippet
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function advanceSearch(query: string, locale?: string) {
  const lowerQuery = query.toLowerCase().trim()
  const queryWords = (locale === "ar"
    ? createBilingualSearchTerms(query)
    : lowerQuery.split(/\s+/)
  ).filter((word) => word.toLowerCase().trim().length >= 2)

  if (queryWords.length === 0) return []

  const chunks = chunkArray(searchData, 100)

  const results = chunks.flatMap((chunk) =>
    chunk
      // فلترة النتائج حسب اللغة الحالية
      .filter((doc) => {
        const isArabicDoc = Boolean((doc as any).isArabic)
        if (locale === "ar") return isArabicDoc
        return !isArabicDoc
      })
      .map((doc) => {
        const title = doc.title || ""
        const content = doc.content || ""
        const cleanedContent = memoizedCleanMdxContent(content)
        let relevanceScore = 0
        for (const searchTerm of queryWords) {
          const termRelevance = calculateRelevance(
            searchTerm,
            title,
            cleanedContent
          )
          const proximityScore = calculateProximityScore(
            searchTerm,
            cleanedContent
          )
          relevanceScore += termRelevance + proximityScore
        }

        const snippet = extractSnippet(cleanedContent, lowerQuery)
        const highlightedSnippet = highlight(snippet, queryWords.join(" "))

        return {
          title: doc.title || "Untitled",
          href: `${doc.slug}`,
          snippet: highlightedSnippet,
          description: doc.description || "",
          relevance: relevanceScore,
        }
      })
      .filter((doc) => {
        const searchText = `${doc.title} ${doc.description || ""} ${doc.snippet || ""}`.toLowerCase()
        
        return (
          doc.relevance > 0 &&
          queryWords.some((word) => searchText.includes(word.toLowerCase()))
        )
      })
      .sort((a, b) => b.relevance - a.relevance)
  )

  return results
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

export function highlight(snippet: string, searchTerms: string): string {
  if (!snippet || !searchTerms) return snippet

  const terms = searchTerms
    .split(/\s+/)
    .filter((term) => term.trim().length > 0)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))

  if (terms.length === 0) return snippet

  const regex = new RegExp(`(${terms.join("|")})(?![^<>]*>)`, "gi")

  return snippet.replace(
    /(<[^>]+>)|([^<]+)/g,
    (match, htmlTag, textContent) => {
      if (htmlTag) return htmlTag
      return textContent.replace(regex, "<span class='highlight'>$1</span>")
    }
  )
}
export function formatStepIndex(n: number, dir: "ltr" | "rtl"): string {
  if (dir === "rtl") {
    const arabicDigits = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"]
    return String(n).replace(/\d/g, d => arabicDigits[Number(d)])
  }
  return String(n)
}
export function convertToArabicNumerals(num: number): string {
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٤", "٥", "٢", "٩"]

  let result = num.toString()
  for (let i = 0; i < englishNumbers.length; i++) {
    result = result.replace(new RegExp(englishNumbers[i], "g"), arabicNumbers[i])
  }
  return result
}


export function formatDate(dateStr: string): string {
  return formatDateHelper(dateStr, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatDate2(dateStr: string): string {
  return formatDateHelper(dateStr, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatDateHelper(
  dateStr: string,
  options: Intl.DateTimeFormatOptions
): string {
  const [day, month, year] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("en-US", options)
}

export function stringToDate(date: string) {
  const [day, month, year] = date.split("-").map(Number)
  return new Date(year, month - 1, day)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let rafId: number | null = null
  let lastCallTime: number | null = null

  const later = (time: number) => {
    const remaining = wait - (time - (lastCallTime || 0))
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      func(...(lastArgs as Parameters<T>))
      lastArgs = null
      lastCallTime = null
    } else {
      rafId = requestAnimationFrame(later)
    }
  }

  return (...args: Parameters<T>) => {
    lastArgs = args
    lastCallTime = performance.now()
    const callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      rafId = requestAnimationFrame(later)
    }, wait)
    if (callNow) func(...args)
  }
}
