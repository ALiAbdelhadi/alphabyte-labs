"use client"
import PersonalCard1 from "./components/personal-card";

export default function page() {
    const handleGetInTouch = () => {
        console.log("Get in touch clicked")
    }

    const handleBookmark = () => {
        console.log("Bookmark clicked")
    }

    return (
        <div className="min-h-screen p-8 flex items-center justify-center">
            <PersonalCard1 onGetInTouch={handleGetInTouch} onBookmark={handleBookmark} />
        </div>
    )
}
