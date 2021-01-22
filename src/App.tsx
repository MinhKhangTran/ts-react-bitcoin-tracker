import { Box, Grid, Select, Text } from "@chakra-ui/react";
import * as React from "react";

const API_ENDPOINT: string = "https://blockchain.info/ticker";

interface Bitcoin {
  "15m": number;
  last: number;
  buy: number;
  sell: number;
  symbol: string;
}

// interface Currencies {
//   [key: string]: Bitcoin;
// }

// interface FetchState {
//   loading: boolean;
//   error: boolean;
//   data: Bitcoin[]|null
// }

// type FetchAction =
//   | { type: "ERROR"; loading: boolean; error: boolean }
//   | { type: "SUCCESS"; loading: boolean; error: boolean; payload: Bitcoin[] }
//   | { type: "LOADING"; loading: boolean; error: boolean };

// const reducer = (state: FetchState, action: FetchAction):FetchState => {
//   if (action.type === "ERROR") {
//     return { ...state, error: true };
//   }
//   if (action.type === "LOADING") {
//     return { ...state, loading: true };
//   }
//   if (action.type === "SUCCESS") {
//     return { ...state, data: action.payload };
//   }
// };

// const initState = {
//   loading: false,
//   error: false,
// };

export default function App() {
  // const [state, dispatch] = React.useReducer(reducer, initState);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [currency, setCurrency] = React.useState<Bitcoin>();
  const [type, setType] = React.useState<string[]>([]);
  const [value, setValue] = React.useState("USD");

  // fetching
  const fetching = async () => {
    setLoading(true);
    try {
      const data = await (await fetch(API_ENDPOINT)).json();
      console.log(data);
      if (data) {
        // console.log(data[type]);
        const newType = Object.keys(data).map((key) => key);
        console.log(newType);
        setType(newType);
        setCurrency(data[value]);
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }

    // console.log(data["USD"].last);
  };
  React.useEffect(() => {
    fetching();
  }, [value]);

  console.log(currency);
  // console.log(objCur);

  return (
    <Grid
      placeItems="center"
      bgGradient="linear(to-tl,purple.100,red.300)"
      h="100vh"
    >
      <Box bg="white">
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error:/</h1>}
        <Select
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          placeholder="Select Currency"
        >
          {type.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </Select>
        <Text textAlign="center">
          {currency && currency["last"]}{" "}
          <span>{currency && currency["symbol"]}</span>
        </Text>
      </Box>
    </Grid>
  );
}
