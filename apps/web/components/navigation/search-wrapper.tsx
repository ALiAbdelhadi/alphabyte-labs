import { getDocsRouting } from "@/settings/docs-routing"
import SearchClient from "./search"

// Server Component that fetches data and passes to client
export default async function SearchWrapper() {
    const docsConfig = await getDocsRouting()

    return <SearchClient docsConfig={docsConfig} />
}