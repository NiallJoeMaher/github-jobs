import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { Card } from "../components";

export default function Home() {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    // const getData = async function () {
    //   try {
    //     const data = await fetch(
    //       "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"
    //     );
    //     const response = await data.json();
    //     // setListings(response)
    //     console.log({ response });
    //   } catch (error) {
    //     console.log({ error });
    //   }
    // };
    // getData();
    fetch(
      `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`
    )
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  const searchWithFilter = () => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${search}&location=${location.replace(
        /[^A-Z0-9]/gi,
        "+"
      )}&full_time=${fulltime}`
    )
      .then((res) => res.json())
      .then((data) => setListings(data));
  };

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [fulltime, setFulltime] = useState(false);

  console.log({ listings, search, location, fulltime });
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.search}>
          <div className={styles.mainInput}>
            <svg
              className={styles.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.024 15.0588H17.1123L23.9435 21.9037L21.9037 23.9435L15.0588 17.1123V16.0308L14.6824 15.6544C13.1286 16.9891 11.1093 17.7968 8.89842 17.7968C3.98374 17.7968 0 13.8131 0 8.89842C0 3.98374 3.98381 0 8.89842 0C13.813 0 17.7968 3.98374 17.7968 8.89842C17.7968 11.1093 16.9891 13.1286 15.6475 14.6824L16.024 15.0588ZM2.73799 8.89842C2.73799 12.3003 5.49651 15.0588 8.89842 15.0588C12.3003 15.0588 15.0588 12.3003 15.0588 8.89842C15.0588 5.49651 12.3003 2.73799 8.89842 2.73799C5.49651 2.73799 2.73799 5.49651 2.73799 8.89842Z"
                fill="#5964E0"
              />
            </svg>

            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Filter by title, companies, expertise…"
            />
            <div className={styles.divider} />
          </div>

          <div className={styles.input}>
            <svg
              className={styles.icon}
              width="17"
              height="24"
              viewBox="0 0 17 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.4477 0C10.6804 0 12.7796 0.870546 14.3585 2.45105C17.2803 5.37556 17.6434 10.8781 15.1348 14.2255L8.4477 23.894L1.75057 14.2119C-0.747997 10.8781 -0.384894 5.37556 2.53693 2.45105C4.11575 0.870546 6.21459 0 8.4477 0ZM5.47357 8.29091C5.47357 9.97484 6.84272 11.3455 8.52485 11.3455C10.207 11.3455 11.5761 9.97484 11.5761 8.29091C11.5761 6.60698 10.207 5.23636 8.52485 5.23636C6.84272 5.23636 5.47357 6.60698 5.47357 8.29091Z"
                fill="#5964E0"
              />
            </svg>

            <input
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Filter by location…"
            />
            <div className={styles.divider} />
          </div>

          <div className={styles.input}>
            <div
              className={styles.checkboxGroup}
              onClick={() => setFulltime((fulltime) => !fulltime)}
            >
              <input
                className={styles.screenReader}
                type="checkbox"
                checked={fulltime}
              />
              <div className={styles.checkbox}>
                {fulltime ? (
                  <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                    <path
                      d="M1 6.56948L4.57248 10.142L13.7144 1"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                ) : null}
              </div>
              <p>Full-time</p>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={searchWithFilter}>Search</button>
            </div>
          </div>
        </div>
        <div className={styles.cardContainer}>
          {listings.map((listing) => {
            return (
              <Card
                companyLogo={listing.company_logo}
                location={listing.location}
                title={listing.title}
                logo={listing.company_logo}
                createdAt={listing.created_at}
                type={listing.type}
                company={listing.company}
              />
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
