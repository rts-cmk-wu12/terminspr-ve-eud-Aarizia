import SearchForm from "@/components/ui/forms/search-form";

export const metadata = {
  title: 'Søg'
}

export default function soegPage() {

    return (
        <main className="search">
            <SearchForm />
        </main>
    )
}