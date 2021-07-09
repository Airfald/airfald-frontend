import { useState } from 'react'

const useModule1 = () => {
  const [module1, setModule1] = useState('module1')

  return {
    module1,
    setModule1
  }
}

export default useModule1
