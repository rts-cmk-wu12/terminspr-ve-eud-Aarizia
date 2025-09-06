import SearchContent from "@/components/ui/search-content";

export const metadata = {
  title: 'Søg'
}

export default async function soegPage() {

    return (
        <main className="search">
            <SearchContent />
        </main>
    )
}