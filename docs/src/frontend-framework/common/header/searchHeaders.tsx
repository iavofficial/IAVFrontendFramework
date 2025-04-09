import React, {useEffect, useRef, useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import {versionMappings} from "../../versionMappings.ts";
import {Link, MemoryRouter, useNavigate, useParams} from "react-router-dom"
import makeStyles from "../../../util/makeStyles.tsx";

const useStyles = makeStyles(() => ({
    container: {
        marginLeft: "10px",
        position: "relative"
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: "10px",
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        flexDirection: 'column',
    },
    input: {
        padding: '10px 12px',
        fontSize: '14px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '60%',
        maxWidth: '350px',
        marginRight: '10px',
    },
    button: {
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#0056b3',
        },
    },
    resultContainer: {
        marginTop: "5px",
        borderRadius: "8px",
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        maxHeight: '300px',
        overflowY: 'auto',
        background: 'white',
        zIndex: 10
    },
    result: {
        padding: "10px 12px",
        borderBottom: "1px solid #eee",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        '&:hover': {
            backgroundColor: "#f5f5f5",
        },
        '& strong': {
            marginRight: '6px',
            color: '#333',
            fontWeight: 600,
        },
        '& a': {
            textDecoration: 'none',
            color: '#007bff',
            '&:hover': {
                textDecoration: 'underline',
            },
        }
    }
}));

interface Header {
    type: "h1" | "h2";
    text: string;
    route: string;
}

export interface SearchHeader {
    module: any;
    route: string;
}

const SearchHeaders = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [results, setResults] = useState<Header[]>([]);
    const [showResults, setShowResults] = useState(false);

    const {version} = useParams<{ version: string }>();
    const containerRef = useRef(null);

    const navigate = useNavigate();

    const {classes} = useStyles();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleSearch = async () => {
        if (!version) {
            console.error("Version not found in URL");
            return;
        }

        const allResults: Header[] = [];

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
            setShowResults(true)
            setResults(filteredResults);
        } catch (error) {
            console.error(`Error loading version ${version}:`, error);
        }
    };

    const extractHeaders = (page: SearchHeader): Header[] | undefined => {
        const PageComponent: React.ComponentType<any> = page.module;
        if (PageComponent === undefined) {
            return undefined;
        }
        const htmlString = ReactDOMServer.renderToStaticMarkup(
            <MemoryRouter><PageComponent/></MemoryRouter>
        );
        const headers: Header[] = [];

        const h1Headers = htmlString.match(/<h1[^>]*>(.*?)<\/h1>/g) || [];
        const h2Headers = htmlString.match(/<h2[^>]*>(.*?)<\/h2>/g) || [];
        h1Headers.forEach((header) => {
            const text = header.replace(/<[^>]+>/g, "");
            headers.push({type: "h1", text, route: page.route});
        });
        h2Headers.forEach((header) => {
            const text = header.replace(/<[^>]+>/g, "");
            headers.push({type: "h2", text, route: page.route});
        });
        return headers;
    };

    return (
        <div className={classes.container} ref={containerRef}>
            <input
                onClick={handleSearch}
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch();
                }}
                className={classes.input}
            />
            <button onClick={handleSearch} className={classes.button}>Search</button>
            {showResults && results.length > 0 && (
                <div className={classes.resultContainer}>
                    {results.map((result, index) => (
                        <div className={classes.result} key={index} onClick={() => navigate(result.route)}>
                            <Link to={result.route}>
                                {result.text}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchHeaders;
