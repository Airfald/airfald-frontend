import React, { useState, useRef, useEffect } from 'react'
import { GlobalContainer } from 'store'

const Test: React.FC = () => {
  useEffect(() => {
    console.log(process.env)
  }, [])
  const ref = useRef<any>(null)

  const { module1, setModule1, module2 } = GlobalContainer.useContainer()
  console.log(module1, module2)

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
