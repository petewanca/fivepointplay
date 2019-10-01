import React from 'react';

// React Components
import TeamsButton from "../components/TeamsButton";
import SearchField from "../components/SearchField";

export default function Home() {
    return (
        <div>
            <TeamsButton href="/profile" />
            <SearchField />
        </div>
    )
}
