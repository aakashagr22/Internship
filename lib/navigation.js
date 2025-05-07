
// filepath: c:\Users\aakas\Downloads\Redux\doc\doc3\onlineconsult\lib\navigation.js
// lib/navigation.js
export const safePush = (router, path, query) => {
    try {
      if (!path) {
        console.warn("Path is undefined, using default path.");
        return; // Or set a default path: path = "/";
      }
      const queryString = query ? new URLSearchParams(query).toString() : ''
      const fullPath = queryString ? `${path}?${queryString}` : path
      router.push(fullPath, { shallow: true })
    } catch (error) {
      console.error('Navigation failed:', error)
    }
  }
