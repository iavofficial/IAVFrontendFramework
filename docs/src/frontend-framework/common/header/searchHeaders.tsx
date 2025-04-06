import React, {useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import {versionMappings} from "../../versionMappings.ts";
import {Link, MemoryRouter, useParams} from "react-router-dom"; // Link importieren

export interface SearchHeader {
    module: any;
    route: string;
}

const SearchHeaders = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [results, setResults] = useState<any[]>([]);
    const {version} = useParams<{ version: string }>();

    const handleSearch = async () => {
        if (!version) {
            console.error("Version not found in URL");
            return;
        }

        const allResults: any[] = [];

        try {
            const module = await versionMappings[version]();
            const pages = await module.getPages();
            for (const page of pages) {
                const headers = extractHeaders(page);
                if (headers !== undefined) {
                    allResults.push(...headers);
                }
            }

            const filteredResults = allResults.filter(result =>
                result.text.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log(filteredResults);
            setResults(filteredResults);
        } catch (error) {
            console.error(`Error loading version ${version}:`, error);
        }
    };

    const extractHeaders = (page: SearchHeader) => {
        const PageComponent: React.ComponentType<any> = page.module;
        if (PageComponent === undefined) {
            return;
        }
        const htmlString = ReactDOMServer.renderToStaticMarkup(
            <MemoryRouter><PageComponent/></MemoryRouter>
        );
        const headers: any[] = [];

        const h1Headers = htmlString.match(/<h1[^>]*>(.*?)<\/h1>/g) || [];
        const h2Headers = htmlString.match(/<h2[^>]*>(.*?)<\/h2>/g) || [];
        h1Headers.forEach((header) => {
            const text = header.replace(/<[^>]+>/g, "");
            headers.push({type: "h1", text});
        });
        h2Headers.forEach((header) => {
            const text = header.replace(/<[^>]+>/g, "");
            headers.push({type: "h2", text});
        });
        return headers;
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search headers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <div>
                {results.map((result, index) => (
                    <div key={index}>
                        <strong>{result.type}</strong>:
                        <Link
                            to={`/page/${version}/${result.text}`}
                        >
                            {result.text}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchHeaders;
