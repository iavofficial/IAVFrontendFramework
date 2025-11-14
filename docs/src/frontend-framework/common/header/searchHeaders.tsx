import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { versionMappings } from "../../versionMappings.ts";
import { Link, MemoryRouter, useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "../../../util/makeStyles.tsx";
import { BLUE2, BLUE3, GREY1, WHITE } from "../../utils/constants.ts";
import { toRgba } from "../../../util/toRgba.ts";
import { BLACK } from "../../../constants.ts";

const useStyles = makeStyles(() => ({
  container: {
    marginLeft: "10px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 10px",
    width: "100%",
    maxWidth: "600px",
    borderRadius: "999px",
    background: toRgba(WHITE, 0.06),
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: `0 4px 16px ${toRgba(BLACK, 0.08)}`,
  },
  input: {
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "999px",
    border: `1px solid ${toRgba(BLACK, 0.08)}`,
    width: "220px",
    maxWidth: "350px",
    outline: "none",
    background: toRgba(WHITE, 0.85),
    transition: "all 0.25s ease",
    "&:focus": {
      borderColor: BLUE3,
      boxShadow: `0 0 0 2px ${toRgba(BLUE3, 0.25)}`,
      background: WHITE,
    },
  },
  button: {
    padding: "8px 16px",
    background: `linear-gradient(135deg, ${BLUE3}, ${BLUE2})`,
    color: WHITE,
    border: "none",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.25s ease",
    boxShadow: `0 4px 12px ${toRgba(BLACK, 0.18)}`,
    "&:hover": {
      filter: "brightness(1.05)",
    },
  },
  resultContainer: {
    marginTop: "6px",
    borderRadius: "12px",
    position: "absolute",
    top: "110%",
    left: 0,
    right: 0,
    maxHeight: "320px",
    overflowY: "auto",
    background: toRgba(WHITE, 0.96),
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: `0 10px 30px ${toRgba(BLACK, 0.18)}`,
    zIndex: 10,
  },
  result: {
    padding: "10px 14px",
    borderBottom: `1px solid ${GREY1}`,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    "&:last-child": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: toRgba(BLUE3, 0.1),
    },
    "& a": {
      textDecoration: "none",
      color: BLUE3,
      fontSize: "14px",
    },
  },
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

  const { version } = useParams<{ version: string }>();
  const containerRef = useRef(null);

  const navigate = useNavigate();

  const { classes } = useStyles();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
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

      const filteredResults = allResults.filter((result) =>
        result.text.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setShowResults(true);
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
      <MemoryRouter>
        <PageComponent />
      </MemoryRouter>,
    );
    const headers: Header[] = [];

    const h1Headers = htmlString.match(/<h1[^>]*>(.*?)<\/h1>/g) || [];
    const h2Headers = htmlString.match(/<h2[^>]*>(.*?)<\/h2>/g) || [];
    h1Headers.forEach((header) => {
      const text = header.replace(/<[^>]+>/g, "");
      headers.push({ type: "h1", text, route: page.route });
    });
    h2Headers.forEach((header) => {
      const text = header.replace(/<[^>]+>/g, "");
      headers.push({ type: "h2", text, route: page.route });
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
      <button onClick={handleSearch} className={classes.button}>
        Search
      </button>
      {showResults && results.length > 0 && (
        <div className={classes.resultContainer}>
          {results.map((result, index) => (
            <div
              className={classes.result}
              key={index}
              onClick={() => navigate(result.route)}
            >
              <Link to={result.route}>{result.text}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHeaders;
