import axios from "axios"
import { useEffect, useState } from "react"

const baseURL = (import.meta.env.VITE_REACT_API_URI || "").replace(/\/+$/, "");

const useFetch = (endpoint, includeCredentials = false) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const normalizedEndpoint = endpoint ? endpoint.replace(/^\/+/, "") : "";
  const url = normalizedEndpoint ? `${baseURL}/${normalizedEndpoint}` : null;

  useEffect(() => {
    if (!url) {
      setLoading(false)
      setData(null)
      return
    }

    if (!baseURL) {
      setError({ message: "Missing VITE_REACT_API_URI environment variable" })
      return
    }

    let ignore = false
    setLoading(true)
    setError(null)

    const axiosConfig = includeCredentials ? { withCredentials: true } : {};
    axios
      .get(url, axiosConfig)
      .then((response) => {
        if (!ignore) {
          setData(response.data)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.response ? err.response.data : { message: err.message })
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [url, includeCredentials])

  function refetch(){
    if (!url) return

    setLoading(true)
    setError(null)

    const axiosConfig = includeCredentials ? { withCredentials: true } : {};
    axios
      .get(url, axiosConfig)
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => {
        setError(err.response ? err.response.data : { message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  
  return { data, loading, error, refetch }
}

export default useFetch