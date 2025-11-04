const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface SolveResult {
  latex: string
  result: string
  steps: string[]
}

/**
 * Send a cropped equation image to the backend for solving
 * @param base64Image - Base64 encoded JPEG image
 * @returns Solution with LaTeX, steps, and result
 */
export async function solveProblem(base64Image: string): Promise<SolveResult> {
  try {
    const response = await fetch(`${API_URL}/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to solve problem:', error)
    throw error
  }
}

/**
 * Mock solve for development/testing
 */
export async function mockSolve(_base64: string): Promise<SolveResult> {
  await new Promise((r) => setTimeout(r, 700))
  return {
    latex: '3(x+6)=24',
    result: 'x = 2',
    steps: [
      'Divide both sides by 3: (3(x+6))/3 = 24/3',
      'Simplify: x + 6 = 8',
      'Subtract 6 from both sides: x = 2',
    ],
  }
}
