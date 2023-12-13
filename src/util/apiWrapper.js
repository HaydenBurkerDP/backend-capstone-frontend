import Cookies from "js-cookie";

const host = "localhost";
const port = "8086";
const apiUrl = `http://${host}:${port}`;

const fetchWrapper = (
  apiEndpoint,
  method = "",
  body = null,
  signal = null,
  requireAuthToken = true
) => {
  return new Promise((resolve, reject) => {
    const token = Cookies.get("auth");

    if (requireAuthToken && !token) {
      reject("Auth Token Required");
    }

    fetch(`${apiUrl}${apiEndpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { auth: token }),
      },
      ...(signal && { signal: signal }),
      ...(body && { body: JSON.stringify(body) }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .catch(reject)
      .then(resolve);
  });
};

export default fetchWrapper;
