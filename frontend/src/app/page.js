'use client'

import { useState } from 'react'

export default function Home() {
  const [inputUrl, setInputUrl] = useState('')
  const [qrImageUrl, setQrImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputUrl.trim()) {
      alert("Please enter a valid URL.")
      return
    }

    try {
      setLoading(true)
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const apiUrl = `${baseUrl}/generate_qr?url=${encodeURIComponent(inputUrl)}`
      setQrImageUrl(apiUrl)
    } catch (error) {
      console.error("Error generating QR Code:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Generate QR Code
        </button>
      </form>

      {loading && <p className="mt-4">Generating...</p>}

      {qrImageUrl && !loading && (
        <div className="mt-6">
          <img src={qrImageUrl} alt="QR Code" className="w-64 h-64" />
        </div>
      )}
    </main>
  )
}
