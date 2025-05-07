// filepath: pages/specialties/general-physician-internal-medicine.jsx
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

export default function GeneralPhysicianPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the dynamic route
    router.replace('/specialties/general-physician-internal-medicine')
  }, [])

  return (
    <Head>
      <title>Loading...</title>
    </Head>
  )
}

// Optional: If you want to handle this at build time
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/specialties/general-physician-internal-medicine',
      permanent: true,
    }
  }
}