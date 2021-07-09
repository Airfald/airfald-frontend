import { useState } from 'react'

const useModule1 = () => {
  const [module2, setModule2] = useState('module2')

  return {
    module2,
    setModule2
  }
}

export default useModule1
