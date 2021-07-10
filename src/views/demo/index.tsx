import React, { useState, useRef, useEffect } from 'react'

const Test: React.FC = () => {
  useEffect(() => {
    console.log(process.env)
  }, [])
  const ref = useRef<any>(null)

  const [content, setContent] = useState('')

  const click = async () => {
    try {
      const val = await ref.current!.validate()
      console.log(val)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ padding: '40px' }}>
      <button onClick={click}>test click</button>
    </div>
  )
}

export default Test
