// const useFetch = (url, stopState) => {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(url);
//       const dataArray = await res.json();
//       console.log(dataArray);
//       setData(dataArray[0]);
//     };
//     fetchData();
//   }, []);
//   return data;
// };

// inside a component

// const user = useFetch(
//   `https://jsonplaceholder.typicode.com/posts?id=${1}`,
//   collection
// );
